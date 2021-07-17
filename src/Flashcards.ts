import { supermemo, SuperMemoItem } from "supermemo";

const MARKER = '動詞 ';
const DAY = 24*60*60*1000;

export interface Flashcard {
  item: SuperMemoItem;
  dueDate: number;
}

const defaultItem : SuperMemoItem = {
  interval: 0,
  repetition: 0,
  efactor: 2.5,
};

const nextDate = (interval: number) : number => {
  return Date.now() + interval * DAY;
}

export class Flashcards {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  _set(verb: string, card: Flashcard) {
    this.storage.setItem(MARKER + verb, JSON.stringify(card));
  }
  
  _get = (verb: string) : Flashcard => {
    const value = this.storage.getItem(MARKER + verb);
    return value ? JSON.parse(value) : null;
  }
  
  _getAll = () : Record<string,Flashcard> => {
    const cards : Record<string,Flashcard> = {};
    for (const [key, value] of Object.entries(this.storage)) {
      if (key.indexOf(MARKER) === 0) {
        cards[key.substring(MARKER.length)] = JSON.parse(value);
      }
    }
    return cards;
  }  

  available(verb: string) : boolean {
    return this._get(verb) === null;
  }

  dueCards() : Record<string,Flashcard> {
    const cards : Record<string,Flashcard> = {};
    for (const [key, card] of Object.entries(this._getAll())) {
      if (card.dueDate <= Date.now()) {
        cards[key] = card;
      }
    }
    return cards;
  }

  add(verb: string) : Flashcard {
    const card = { item: defaultItem, dueDate: Date.now() };
    this._set(verb, card);
    return card;
  }

  update(verb: string, card: Flashcard, result: boolean) : void {
    const updatedItem = supermemo(card.item, result ? 5 : 0);
    const updatedCard = {
      item: updatedItem,
      dueDate: nextDate(updatedItem.interval),
    };
    this._set(verb, updatedCard);
  }
}
