import { Flashcard } from './Flashcard';

const MARKER = '動詞 ';
const SKIP_INTRO_KEY = '動詞Intro';

export class PersistentStorage {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(verb: string, card: Flashcard) {
    this.storage.setItem(MARKER + verb, JSON.stringify(card));
  }
  
  get = (verb: string) : Flashcard => {
    const value = this.storage.getItem(MARKER + verb);
    return value ? JSON.parse(value) : null;
  }
  
  getAll = () : Record<string,Flashcard> => {
    const cards : Record<string,Flashcard> = {};
    for (const [key, value] of Object.entries(this.storage)) {
      if (key.indexOf(MARKER) === 0) {
        cards[key.substring(MARKER.length)] = JSON.parse(value);
      }
    }
    return cards;
  }

  skipIntroNextTime() {
    this.storage.setItem(SKIP_INTRO_KEY, 'True');
  }

  shouldSkipIntro() : boolean {
    return this.storage.getItem(SKIP_INTRO_KEY) != null;
  }
}