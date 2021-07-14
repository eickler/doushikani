interface Example {
  en: string;
  ja: string;
};

interface Meaning {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
};

interface Reading {
  reading: string;
  primary: boolean;
  accepted_answer: boolean;
};

export interface VerbDefinition {
  verb: string;
  url: string;
  level: number;
  transitive: boolean;
  types: [string];
  examples: [Example];
  meanings: [Meaning];
  readings: [Reading];
};
