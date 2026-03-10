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
  const hasContent = (child.actions && child.actions.length > 0) || (child.info && child.info.length > 0);

  return (
    <div className="relative flex flex-col items-center">
      {/* Connector line from parent */}
      <div className="w-px h-6 bg-primary/30" />

      <button
        onClick={() => hasContent && setOpen(!open)}
        className={`
          relative px-4 py-2.5 rounded-lg border text-sm font-medium transition-all max-w-[280px] text-center
          ${open
            ? "bg-primary text-primary-foreground border-primary shadow-md"
            : "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-sm"
          }
          ${hasContent ? "cursor-pointer" : "cursor-default"}
        `}
      >
        {child.name}
        {hasContent && (
          <span className="ml-1.5 inline-block align-middle">
            {open ? <ChevronDown className="h-3.5 w-3.5 inline" /> : <ChevronRight className="h-3.5 w-3.5 inline" />}
          </span>
        )}
      </button>

      {open && hasContent && (
        <>
          <div className="w-px h-4 bg-secondary/50" />
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 max-w-[260px] space-y-1.5">
            {child.actions?.map((action) => (
              <div key={action} className="px-3 py-1.5 bg-secondary/20 rounded text-xs font-semibold text-primary text-center">
                {action}
              </div>
            ))}
            {child.info?.map((item) => (
              <div key={item.label} className="text-xs text-center">
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

const ParentBranch = ({ category }: { category: Category }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center w-[280px] md:w-[320px]">
      {/* Connector from root */}
      <div className="w-px h-10 bg-primary/40" />

      {/* Parent node */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          flex items-center gap-2.5 px-6 py-3.5 rounded-xl border-2 font-display text-lg font-semibold transition-all cursor-pointer
          ${expanded
            ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
            : "bg-card text-foreground border-primary/30 hover:border-primary hover:shadow-md"
          }
        `}
      >
        <span className={expanded ? "text-secondary" : "text-primary"}>{iconMap[category.icon]}</span>
        {category.name}
        {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Children tree */}
      <div className={expanded ? "flex flex-col items-center animate-fade-in-up" : "hidden"} style={{ animationDuration: "0.35s" }}>
        {/* Vertical connector */}
        <div className="w-px h-6 bg-primary/30" />

        {/* Children */}
        <div className="relative">
          {category.children.length > 1 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-primary/30" style={{
              width: `${Math.min(category.children.length * 180, 900)}px`
            }} />
          )}

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
            {category.children.map((child) => (
              <ChildNode key={child.id} child={child} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FamilyTree = () => {
  return (
    <section id="categories" className="py-10 -mt-8 bg-background overflow-x-auto">
      <div className="min-w-fit px-4 flex flex-col items-center">
        {/* Root node */}
        <div className="text-center mb-2">
          <span className="section-badge mb-4 inline-block">EXPLORE</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Grape Care Solutions
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">Click a category to expand its tree</p>
        </div>

        {/* Root connector splits into 3 */}
        <div className="w-px h-6 bg-primary/40" />

        {/* Horizontal line connecting 3 parents */}
        <div className="relative flex items-start justify-center">
          <div className="absolute top-0 h-px bg-primary/40" style={{ width: "500px", left: "50%", transform: "translateX(-50%)" }} />
          
          <div className="flex items-start gap-0">
            {categories.map((cat) => (
              <ParentBranch key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyTree;
