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
  Lightbulb,
  Quote,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Bug: <Bug className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
  Sprout: <Sprout className="h-5 w-5" />,
};

/* ── Info Panel Data ── */
const ABOUT_INNOVATION_CONTENT = {
  title: "About the Innovation",
  designer: "Shivam Satyawan Madrewar",
  college: "RCSM Government College of Agriculture, Kolhapur",
  company: "Taginus Innovations (OPC) Pvt. Ltd.",
  aiDeveloper: "Siddhesh Kulkarni",
  aiContext:
    "a close associate of the founder and member of the scientific community since their academic years at SMV, Akluj, Solapur",
  vision:
    "To revolutionize viticulture through intelligent and sustainable solutions.",
  mentors: [
    { name: "Dr. D. P. Deshmukh", role: "Plant Pathologist" },
    { name: "Dr. S. S. Dhumal", role: "Horticulturist" },
    { name: "Dr. R. D. Pawar", role: "Horticulturist" },
    { name: "Dr. R. A. Karande", role: "Plant Pathologist" },
    { name: "Dr. R. H. Shinde", role: "Agronomist" },
    { name: "Dr. J. B. Patil", role: "Agronomist" },
    { name: "Dr. V. S. Nale", role: "Soil Scientist" },
    { name: "Dr. Potdar", role: "Soil Scientist" },
    { name: "Dr. D. D. Patange", role: "Dairy Scientist" },
  ],
};

const FOUNDERS_NOTE_CONTENT = {
  quote:
    "When science, technology, and human relationships come together, agriculture can truly evolve.",
  author: "– Shivam Satyawan Madrewar",
  authorTitle: "Founder, Taginus Innovations (OPC) Pvt. Ltd.",
  paragraphs: [
    "Agriculture has never been just a profession for me it has always been a purpose. Growing up with a deep connection to farming and later strengthening that foundation through my education at RCSM Government College of Agriculture, Kolhapur, I realized one crucial truth: farmers don't lack effort they often lack access to precise, timely, and reliable guidance.",
    "This realization became the seed for what is today GrowGrape AI. My vision was simple yet ambitious to bridge the gap between traditional agricultural wisdom and modern technological advancement. GrowGrape AI is not just a platform; it is an intelligent companion designed to support farmers at every stage, from pest and disease management to nutrition and crop lifecycle decisions.",
    "This journey has never been mine alone. I have been fortunate to learn under the guidance of exceptional mentors and to collaborate with passionate individuals who believe in transforming agriculture. Their support, knowledge, and encouragement have been the backbone of this innovation.",
    "This is just the beginning. Our mission is to empower every grape grower with the confidence to make better decisions, achieve higher productivity, and move towards a more sustainable future. Let us grow not just crops, but possibilities.",
  ],
};

/* ── About Innovation Panel ── */
const AboutInnovationPanel = () => (
  <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/8 overflow-hidden text-left">
    <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
    <div className="p-5 md:p-7 space-y-4 text-sm text-muted-foreground leading-relaxed">
      <p>
        This concept has been designed by{" "}
        <span className="font-semibold text-foreground">
          Shivam Satyawan Madrewar
        </span>
        , an emerging agricultural entrepreneur and graduate of{" "}
        <span className="font-semibold text-foreground">
          RCSM Government College of Agriculture, Kolhapur
        </span>
        . The innovation is commercially owned and developed under{" "}
        <span className="font-semibold text-foreground">
          Taginus Innovations (OPC) Pvt. Ltd.
        </span>
        , with a vision to revolutionize viticulture through intelligent and
        sustainable solutions.
      </p>

      <p>
        This journey has been strongly supported and guided by esteemed mentors:{" "}
        {ABOUT_INNOVATION_CONTENT.mentors.map((m, i) => (
          <span key={m.name}>
            <span className="font-semibold text-foreground">{m.name}</span> (
            {m.role})
            {i < ABOUT_INNOVATION_CONTENT.mentors.length - 1 ? ", " : " "}
          </span>
        ))}
        whose invaluable knowledge and continuous encouragement shaped this
        innovation from its early academic stages to its present form.
      </p>

      <p>
        The AI model powering this platform has been developed by{" "}
        <span className="font-semibold text-foreground">Siddhesh Kulkarni</span>
        , a close associate of the founder and a member of the scientific
        community since their academic years at{" "}
        <span className="font-semibold text-foreground">
          SMV, Akluj, Solapur
        </span>
        .
      </p>
    </div>
  </div>
);

/* ── Founder's Note Panel ── */
const FoundersNotePanel = () => (
  <div
    style={{
      animation: "slideDown 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    }}
  >
    <style>{`
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>

    <div className="relative rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/60 via-background to-orange-50/30 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 dark:border-amber-800/30 overflow-hidden text-left">
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />

      <div className="p-5 md:p-7 space-y-5">
        {/* Pull quote */}
        <div className="pl-4 border-l-4 border-amber-400">
          <p className="text-sm md:text-base italic font-medium text-foreground/85 leading-relaxed">
            "{FOUNDERS_NOTE_CONTENT.quote}"
          </p>
        </div>

        {/* Paragraphs */}
        <div className="space-y-3">
          {FOUNDERS_NOTE_CONTENT.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-xs md:text-sm text-muted-foreground leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="pt-3 border-t border-amber-200/50 dark:border-amber-800/30 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            SM
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              {FOUNDERS_NOTE_CONTENT.author}
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400">
              {FOUNDERS_NOTE_CONTENT.authorTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

const ChildrenSection = ({ category }: { category: Category }) => {
  const childCount = category.children.length;
  return (
    <div
      className="flex flex-col items-center w-full animate-fade-in-up"
      style={{ animationDuration: "0.3s" }}
    >
      <div className="w-px h-5 bg-primary/30" />
      {childCount === 1 ? (
        <ChildNode child={category.children[0]} />
      ) : (
        <>
          <div
            className="h-px bg-primary/25"
            style={{ width: `min(${childCount * 19}px, 80vw)` }}
          />
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
      ${
        expanded
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

const DesktopTree = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (
    <div className="hidden sm:flex flex-col items-center w-full">
      <div className="w-px h-6 bg-primary/40" />
      <div
        className="h-px bg-primary/35"
        style={{ width: "min(752px, 80vw)" }}
      />
      <div className="flex items-start justify-center w-full gap-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex-1 flex flex-col items-center min-w-0"
          >
            <div className="w-px h-8 bg-primary/40" />
            <ParentButton
              category={cat}
              expanded={expandedId === cat.id}
              onClick={() =>
                setExpandedId(expandedId === cat.id ? null : cat.id)
              }
            />
            {expandedId === cat.id && <ChildrenSection category={cat} />}
          </div>
        ))}
      </div>
    </div>
  );
};

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

/* ── Tab Button ── */
const TabButton = ({
  label,
  icon,
  active,
  onClick,
  variant,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  variant: "primary" | "amber";
}) => {
  const activeStyles =
    variant === "amber"
      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30"
      : "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20";
  const inactiveStyles =
    variant === "amber"
      ? "bg-white/70 text-amber-700 border-amber-300/70 hover:border-amber-400 hover:bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-700/50"
      : "bg-card text-foreground border-primary/30 hover:border-primary hover:bg-primary/5";

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-semibold text-sm transition-all duration-200 cursor-pointer ${active ? activeStyles : inactiveStyles}`}
    >
      <span
        className={
          active
            ? "opacity-90"
            : variant === "amber"
              ? "text-amber-500"
              : "text-primary"
        }
      >
        {icon}
      </span>
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ${active ? "rotate-180" : ""}`}
      />
    </button>
  );
};

/* ── Root ── */
const FamilyTree = () => {
  const [activePanel, setActivePanel] = useState<
    "innovation" | "founder" | null
  >(null);
  const togglePanel = (panel: "innovation" | "founder") =>
    setActivePanel(activePanel === panel ? null : panel);

  return (
    <section id="categories" className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* ── Header + Tab Buttons + Panels ── */}
        <div className="w-full text-center mb-8">
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-2 mb-4">
            <TabButton
              label="About the Innovation"
              icon={<Lightbulb className="h-4 w-4" />}
              active={activePanel === "innovation"}
              onClick={() => togglePanel("innovation")}
              variant="primary"
            />
            <TabButton
              label="Founder's Note"
              icon={<Quote className="h-4 w-4" />}
              active={activePanel === "founder"}
              onClick={() => togglePanel("founder")}
              variant="amber"
            />
          </div>

          {/* Info panels — above the tree */}
          {activePanel === "innovation" && <AboutInnovationPanel />}
          {activePanel === "founder" && <FoundersNotePanel />}
          <h2 className="font-display text-3xl md:text-4xl mt-8 font-bold text-foreground">
            Grape Care Solutions
          </h2>
        </div>

        {/* Instruction text */}
        <p className="text-muted-foreground text-sm -mt-4 mb-4">
          Click a category to expand its tree
        </p>

        <DesktopTree />
        <MobileTree />
      </div>
    </section>
  );
};

export default FamilyTree;
