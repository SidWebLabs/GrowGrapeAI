import { useState } from "react";
import { categories, type Category, type CategoryChild } from "@/data/categories";
import { Bug, ShieldAlert, Sprout, ChevronDown, ChevronRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Bug: <Bug className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
  Sprout: <Sprout className="h-5 w-5" />,
};

const ChildNode = ({ child }: { child: CategoryChild }) => {
  const [open, setOpen] = useState(false);
  const hasContent =
    (child.actions && child.actions.length > 0) ||
    (child.info && child.info.length > 0);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => hasContent && setOpen(!open)}
        className={`
          relative px-3 py-2 rounded-lg border text-xs font-medium transition-all w-[160px] sm:w-[175px] text-center leading-snug
          ${open
            ? "bg-primary text-primary-foreground border-primary shadow-md"
            : "bg-card text-foreground border-border hover:border-primary/60 hover:shadow-sm"
          }
          ${hasContent ? "cursor-pointer" : "cursor-default"}
        `}
      >
        {child.name}
        {hasContent && (
          <span className="ml-1 inline-block align-middle">
            {open ? (
              <ChevronDown className="h-3 w-3 inline" />
            ) : (
              <ChevronRight className="h-3 w-3 inline" />
            )}
          </span>
        )}
      </button>

      {open && hasContent && (
        <>
          <div className="w-px h-3 bg-primary/40" />
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-2.5 w-[160px] sm:w-[175px] space-y-1.5">
            {child.actions?.map((action) => (
              <div
                key={action}
                className="px-2 py-1 bg-secondary/20 rounded text-[11px] font-semibold text-primary text-center"
              >
                {action}
              </div>
            ))}
            {child.info?.map((item) => (
              <div key={item.label} className="text-[11px] text-center">
                <span className="font-semibold text-primary">{item.label}:</span>{" "}
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* Children of an expanded parent node */
const ChildrenSection = ({ category }: { category: Category }) => {
  const childCount = category.children.length;

  return (
    <div className="flex flex-col items-center w-full animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
      {/* Stem down from parent */}
      <div className="w-px h-5 bg-primary/30" />

      {childCount === 1 ? (
        <ChildNode child={category.children[0]} />
      ) : (
        <>
          {/* Horizontal connector bar */}
          <div
            className="h-px bg-primary/25"
            style={{ width: `min(${childCount * 19}px, 80vw)` }}
          />
          {/* Children row */}
          <div className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-5">
            {category.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-4 bg-primary/30" />
                <ChildNode child={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ── Shared parent button ── */
const ParentButton = ({
  category,
  expanded,
  onClick,
}: {
  category: Category;
  expanded: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap
      ${expanded
        ? "bg-primary text-primary-foreground border-primary shadow-lg"
        : "bg-card text-foreground border-primary/30 hover:border-primary hover:shadow-md"
      }
    `}
  >
    <span className={expanded ? "text-primary-foreground/80" : "text-primary"}>
      {iconMap[category.icon]}
    </span>
    {category.name}
    {expanded ? (
      <ChevronDown className="h-4 w-4 flex-shrink-0" />
    ) : (
      <ChevronRight className="h-4 w-4 flex-shrink-0" />
    )}
  </button>
);

/* ── Desktop: side-by-side with shared top connector ── */
const DesktopTree = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="hidden sm:flex flex-col items-center w-full">
      {/* Root vertical stem */}
      <div className="w-px h-6 bg-primary/40" />
      {/* Root horizontal bar */}
      <div className="h-px bg-primary/35" style={{ width: "min(752px, 80vw)" }} />
      {/* 3 columns */}
      <div className="flex items-start justify-center w-full gap-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex-1 flex flex-col items-center min-w-0">
            <div className="w-px h-8 bg-primary/40" />
            <ParentButton
              category={cat}
              expanded={expandedId === cat.id}
              onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
            />
            {expandedId === cat.id && <ChildrenSection category={cat} />}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Mobile: clean stacked accordion, no tree lines ── */
const MobileTree = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex sm:hidden flex-col w-full gap-3 mt-4">
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col items-center w-full">
          <ParentButton
            category={cat}
            expanded={expandedId === cat.id}
            onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
          />
          {expandedId === cat.id && <ChildrenSection category={cat} />}
        </div>
      ))}
    </div>
  );
};

/* ── Root ── */
const FamilyTree = () => (
  <section id="categories" className="py-12 bg-background">
    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <span className="section-badge mb-4 inline-block">EXPLORE</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Grape Care Solutions
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Click a category to expand its tree
        </p>
      </div>

      <DesktopTree />
      <MobileTree />
    </div>
  </section>
);

export default FamilyTree;