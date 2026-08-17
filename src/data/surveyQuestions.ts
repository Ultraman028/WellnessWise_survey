export interface SurveyData {
  // Section 1: About You
  ageGroup: string;
  gender: string;
  livingArea: string;
  cityName?: string;
  occupation: string;
  relationshipStatus: string;
  
  // Section 2: Emotional Experiences
  emotionallyOverwhelmed: number;
  difficultyRelaxing: number;
  suddenIrritation: number;
  actOnImpulse: number;
  emotionsAffectDecisions: number;
  overthinkingSleep: number;
  screenTimeControl: number;
  
  // Section 3: Self-Awareness & Readiness
  handlingEmotions: number;
  willingnessToImprove: string;
  hesitateToSeekSupport: string;
  reasonForDealingAlone: string;
  
  // Section 4: Value & Willingness
  willingnessToPay: string;
  willingnessToPayOpinion?: string;
  mentalWellnessToolsOpinion: string;
}

export const initialSurveyData: SurveyData = {
  ageGroup: "",
  gender: "",
  livingArea: "",
  cityName: "",
  occupation: "",
  relationshipStatus: "",
  emotionallyOverwhelmed: 4,
  difficultyRelaxing: 4,
  suddenIrritation: 4,
  actOnImpulse: 4,
  emotionsAffectDecisions: 4,
  overthinkingSleep: 4,
  screenTimeControl: 4,
  handlingEmotions: 4,
  willingnessToImprove: "",
  hesitateToSeekSupport: "",
  reasonForDealingAlone: "",
  willingnessToPay: "",
  willingnessToPayOpinion: "",
  mentalWellnessToolsOpinion: "",
};

export interface Question {
  id: keyof SurveyData;
  section: number;
  sectionName: string;
  questionNumber: number;
  text: string;
  type: "radio" | "text" | "textarea" | "scale" | "conditional";
  options?: string[];
  conditionalField?: keyof SurveyData;
  conditionalValue?: string;
  scaleLabels?: { low: string; mid: string; high: string };
  labelType?: "standard" | "control" | "difficulty";
}

export const surveyQuestions: Question[] = [
  // Section 1: About You
  {
    id: "ageGroup",
    section: 1,
    sectionName: "About You",
    questionNumber: 1,
    text: "Which age group do you belong to?",
    type: "radio",
    options: ["Below 16", "16–25", "26–35", "36–44", "45+"],
  },
  {
    id: "gender",
    section: 1,
    sectionName: "About You",
    questionNumber: 2,
    text: "How do you identify your gender?",
    type: "radio",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    id: "livingArea",
    section: 1,
    sectionName: "About You",
    questionNumber: 3,
    text: "Where do you currently live?",
    type: "conditional",
    options: ["Rural area", "Urban area", "City/Town"],
    conditionalField: "cityName",
    conditionalValue: "City/Town",
  },
  {
    id: "occupation",
    section: 1,
    sectionName: "About You",
    questionNumber: 4,
    text: "What best describes your current occupation?",
    type: "text",
  },
  {
    id: "relationshipStatus",
    section: 1,
    sectionName: "About You",
    questionNumber: 5,
    text: "What is your current relationship status?",
    type: "radio",
    options: ["Single", "In a committed relationship", "It's complicated", "Prefer not to say"],
  },

  // Section 2: Emotional Experiences
  {
    id: "emotionallyOverwhelmed",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 6,
    text: "How often do you feel emotionally overwhelmed or mentally exhausted?",
    type: "scale",
  },
  {
    id: "difficultyRelaxing",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 7,
    text: "How hard is it for you to switch off mentally or relax?",
    type: "scale",
    labelType: "difficulty",
  },
  {
    id: "suddenIrritation",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 8,
    text: "How often do you feel sudden irritation or anger?",
    type: "scale",
  },
  {
    id: "actOnImpulse",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 9,
    text: "How often do you act on impulse without thinking things through?",
    type: "scale",
  },
  {
    id: "emotionsAffectDecisions",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 10,
    text: "How often do strong emotions make it difficult for you to think clearly or make balanced decisions?",
    type: "scale",
  },
  {
    id: "overthinkingSleep",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 11,
    text: "How often does overthinking or emotional stress disturb your sleep?",
    type: "scale",
  },
  {
    id: "screenTimeControl",
    section: 2,
    sectionName: "Your Emotional Experiences",
    questionNumber: 12,
    text: "How much control do you feel you have over your gaming or screen time?",
    type: "scale",
    scaleLabels: {
      low: "No control",
      mid: "Moderate control",
      high: "Full control",
    },
  },

  // Section 3: Self-Awareness & Readiness
  {
    id: "handlingEmotions",
    section: 3,
    sectionName: "Self-Awareness & Readiness",
    questionNumber: 13,
    text: "How confident are you in handling difficult emotions on your own?",
    type: "scale",
  },
  {
    id: "willingnessToImprove",
    section: 3,
    sectionName: "Self-Awareness & Readiness",
    questionNumber: 14,
    text: "How willing and motivated are you to work on improving your emotional well-being?",
    type: "radio",
    options: ["Not open at all", "Neutral / Unsure", "Open & motivated"],
  },
  {
    id: "hesitateToSeekSupport",
    section: 3,
    sectionName: "Self-Awareness & Readiness",
    questionNumber: 15,
    text: "Do you ever hesitate to seek emotional or psychological support because of social pressure or fear of being judged?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "reasonForDealingAlone",
    section: 3,
    sectionName: "Self-Awareness & Readiness",
    questionNumber: 16,
    text: "What's the reason you often deal with things alone instead of seeking help?",
    type: "textarea",
  },

  // Section 4: Value & Willingness
  {
    id: "willingnessToPay",
    section: 4,
    sectionName: "Value & Willingness",
    questionNumber: 17,
    text: "If a trusted, private service genuinely helped you manage your emotions better, how willing would you be to pay for it per session?",
    type: "conditional",
    options: [
      "Upto 600 Rupees",
      "600 - 1200 Rupees",
      "1200 - 1700 Rupees",
      "1700+",
      "Not at the moment",
      "Specify your opinion",
    ],
    conditionalField: "willingnessToPayOpinion",
    conditionalValue: "Specify your opinion",
  },
  {
    id: "mentalWellnessToolsOpinion",
    section: 4,
    sectionName: "Value & Willingness",
    questionNumber: 18,
    text: "Do you think mental wellness tools actually help, or just feel trendy?",
    type: "radio",
    options: ["Just a trend", "Actually helps"],
  },
];
