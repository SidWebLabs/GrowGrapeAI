export interface CategoryChild {
  id: string;
  name: string;
  actions?: string[];
  info?: { label: string; value: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  children: CategoryChild[];
}

export const categories: Category[] = [
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "Bug",
    description: "Identify and manage common grape pests with preventive and curative solutions.",
    children: [
      { id: "grape-phylloxera", name: "Grape Phylloxera (Daktulosphaira vitifoliae)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "grape-berry-moth", name: "Grape Berry Moth (Paralobesia viteana)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "japanese-beetle", name: "Japanese Beetle (Popillia japonica)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "leafhopper", name: "Leafhopper (Empoasca vitis)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "spider-mites", name: "Spider Mites (Tetranychus urticae)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "grape-cane-gall-mite", name: "Grape Cane Gall Mite (Eriophyes vitis)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "cutworms", name: "Cutworms (Agrotis ipsilon)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "weevils", name: "Weevils (Otiorhynchus sulcatus and others)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "mealybugs", name: "Mealybugs (Pseudococcidae)", actions: ["Preventive Methods", "Curative Solutions"] },
      { id: "thrips", name: "Thrips (Various species)", actions: ["Preventive Methods", "Curative Solutions"] },
    ],
  },
  {
    id: "disease-control",
    name: "Disease Control",
    icon: "ShieldAlert",
    description: "Prevent and treat common grape diseases with expert strategies.",
    children: [
      { id: "powdery-mildew", name: "Powdery Mildew (Erysiphe necator)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "downy-mildew", name: "Downy Mildew (Plasmopara viticola)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "botrytis-bunch-rot", name: "Botrytis Bunch Rot / Gray Mold (Botrytis cinerea)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "black-rot", name: "Black Rot (Guignardia bidwellii)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "anthracnose", name: "Anthracnose (Elsinoe ampelina)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "phomopsis", name: "Phomopsis Cane and Leaf Spot (Phomopsis viticola)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "pierce-disease", name: "Pierce's Disease (Xylella fastidiosa)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "crown-gall", name: "Crown Gall (Agrobacterium tumefaciens)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "eutypa-dieback", name: "Eutypa Dieback (Eutypa lata)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "esca", name: "Esca / Black Measles (Various fungal pathogens)", actions: ["Prevention Strategies", "Treatment Options"] },
      { id: "verticillium-wilt", name: "Verticillium Wilt (Verticillium dahliae)", actions: ["Prevention Strategies", "Treatment Options"] },
    ],
  },
  {
    id: "nutrition-management",
    name: "Nutrition Management",
    icon: "Sprout",
    description: "Manage the complete grape growth cycle from pruning to harvest.",
    children: [
      { id: "pruning", name: "Pruning (October – November)", info: [{ label: "Timing", value: "October-November preparation" }, { label: "Purpose", value: "Remove old wood, shape structure" }, { label: "Methods", value: "Cane/spur pruning techniques" }] },
      { id: "bud-break", name: "Bud Break & Shoot Growth (November – December)", info: [{ label: "Timing", value: "November-December growth period" }, { label: "Development", value: "New shoot emergence" }, { label: "Care", value: "Irrigation and pest monitoring" }] },
      { id: "flowering", name: "Flowering (December – January)", info: [{ label: "Timing", value: "December-January" }, { label: "Development", value: "Flowering begins" }, { label: "Care", value: "Ensure optimal vine health for pollination" }] },
      { id: "fruit-set", name: "Fruit Set & Berry Development (Dec – Feb)", info: [{ label: "Timing", value: "Fruit set after flowering, berry growth Dec to Feb" }, { label: "Development", value: "Pollinated flowers develop into berries" }, { label: "Care", value: "Manage irrigation and fertilizers, monitor diseases" }] },
      { id: "ripening", name: "Ripening (January – March)", info: [{ label: "Timing", value: "January-March" }, { label: "Development", value: "Berries reach full color, sweetness, and flavor" }, { label: "Care", value: "Control irrigation, monitor pests and diseases" }] },
      { id: "harvesting", name: "Harvesting (February – April)", info: [{ label: "Timing", value: "February-April, depending on variety" }, { label: "Method", value: "Hand-picking to minimize damage" }, { label: "Post-Harvest", value: "Cool grapes, sort, and pack" }] },
      { id: "kharad-chaatani", name: "Kharad Chaatani (April)", info: [{ label: "Timing", value: "April" }, { label: "Purpose", value: "Rejuvenate vines, prepare for next season" }, { label: "Method", value: "Pruning, applying organic matter" }] },
      { id: "shoot-leaf", name: "Shoot & Leaf Development (May – July)", info: [{ label: "Timing", value: "May-July" }, { label: "Development", value: "Shoot elongation and leaf expansion" }, { label: "Care", value: "Maximize photosynthesis, support future fruiting" }] },
      { id: "bud-differentiation", name: "Bud Differentiation (July – August)", info: [{ label: "Timing", value: "July-August" }, { label: "Development", value: "Fruit bud differentiation" }, { label: "Purpose", value: "Critical for next year's fruit quality" }] },
      { id: "carbohydrate-storage", name: "Carbohydrate Storage (Aug – Sep)", info: [{ label: "Timing", value: "August-September" }, { label: "Development", value: "Storage of carbohydrates in roots and trunk" }, { label: "Purpose", value: "Energy reserves for future growth" }] },
      { id: "dormancy-prep", name: "Preparation for Dormancy (October)", info: [{ label: "Timing", value: "October" }, { label: "Development", value: "Vine preparation for dormancy" }, { label: "Purpose", value: "Ensure survival through colder months" }] },
    ],
  },
];
