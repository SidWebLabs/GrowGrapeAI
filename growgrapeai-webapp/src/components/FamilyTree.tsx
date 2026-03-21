import { useState } from "react";
import {
  categories,
  type Category,
  type CategoryChild,
} from "@/data/categories";
import {
  Bug,
  ShieldAlert,
  Sprout,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

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
          relative px-3 py-2 rounded-lg border text-xs font-medium transition-all w-[160px] sm:w-[180px] text-center leading-snug
          ${
            open
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
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-2.5 w-[160px] sm:w-[180px] space-y-1.5">
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
                <span className="font-semibold text-primary">
                  {item.label}:
                </span>{" "}
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ParentBranch = ({ category }: { category: Category }) => {
  const [expanded, setExpanded] = useState(false);
  const childCount = category.children.length;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-px h-8 bg-primary/40" />

      {/* Parent node */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap
          ${
            expanded
              ? "bg-primary text-primary-foreground border-primary shadow-lg"
              : "bg-card text-foreground border-primary/30 hover:border-primary hover:shadow-md"
          }
        `}
      >
        <span
          className={expanded ? "text-primary-foreground/80" : "text-primary"}
        >
          {iconMap[category.icon]}
        </span>
        {category.name}
        {expanded ? (
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div
          className="flex flex-col items-center w-full animate-fade-in-up"
          style={{ animationDuration: "0.3s" }}
        >
          <div className="w-px h-6 bg-primary/30" />

          {childCount === 1 ? (
            <ChildNode child={category.children[0]} />
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full">
                <ChildrenConnector count={childCount} />
                <div
                  className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-6"
                  style={{ rowGap: "24px" }}
                >
                  {category.children.map((child) => (
                    <div key={child.id} className="flex flex-col items-center">
                      <div className="w-px h-5 bg-primary/30" />
                      <ChildNode child={child} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ChildrenConnector = ({ count }: { count: number }) => {
  if (count <= 1) return null;
  return (
    <div className="flex justify-center mb-0">
      <div
        className="h-px bg-primary/25"
        style={{
          width: `min(${count * 196}px, 90vw)`,
        }}
      />
    </div>
  );
};

const FamilyTree = () => {
  return (
    <section id="categories" className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-2">
          <span className="section-badge mb-4 inline-block">EXPLORE</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Grape Care Solutions
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Click a category to expand its tree
          </p>
        </div>

        <div className="w-px h-6 bg-primary/40 mt-4" />

        <RootConnector />

        <div className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-2 w-full">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex-1 min-w-0 flex flex-col items-center"
            >
              <ParentBranch category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RootConnector = () => (
  <div className="flex justify-center w-full">
    <div className="h-px bg-primary/35" style={{ width: "min(700px, 85vw)" }} />
  </div>
);

export default FamilyTree;
