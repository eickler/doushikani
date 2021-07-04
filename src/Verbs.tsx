import _verbs from './verbs.json';

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

// Before implementing a real filter according to the user's need, I add here a crutch to filter my level.
export const verbs = (_verbs as [VerbDefinition]).filter(verb => verb.level < 18);
