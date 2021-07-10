import { supermemo, SuperMemoGrade, SuperMemoItem } from "supermemo";

const MARKER = '動詞 ';

export interface Flashcard {
  item: SuperMemoItem;
  dueDate: Date;
}

const defaultItem : SuperMemoItem = {
  interval: 0,
  repetition: 0,
  efactor: 2.5,
};

const set = (verb: string, card: Flashcard) => {
  window.localStorage.setItem(MARKER + verb, JSON.stringify(card));
}

const get = (verb: string) : Flashcard => {
  const value = window.localStorage.getItem(MARKER + verb);
  return value ? JSON.parse(value) : null;
}

const getAll = () : Record<string,Flashcard> => {
  const cards : Record<string,Flashcard> = {};
  for (const [key, value] of Object.entries(window.localStorage)) {
    if (key.indexOf(MARKER) === 0) {
      const card = JSON.parse(value.substring(MARKER.length));
      cards[key] = card;
    }
  }
  return cards;
}

const nextDate = (interval: number) : Date => {
  return new Date(Date.now() + interval*24*60*60*1000);
}

class Flashcards {
  available(verb: string) : boolean {
    return get(verb) !== null;
  }

  dueCards() : Record<string,Flashcard> {
    const now = new Date();
    const cards : Record<string,Flashcard> = {};
    for (const [key, card] of Object.entries(getAll())) {
      if (card.dueDate && card.dueDate <= now) {
        cards[key] = card;
      }
    }
    return cards;
  }

  add(verbs: string[]) : void {
    for (const verb in verbs) {
      set(verb, { item: defaultItem, dueDate: new Date() });
    }
  }

  update(verb: string, card: Flashcard, grade: SuperMemoGrade) : void {
    const updatedItem = supermemo(card.item, grade)
    const updatedCard = {
      item: updatedItem,
      dueDate: nextDate(updatedItem.interval),
    };
    set(verb, updatedCard);
  }
}

export const flashcards = new Flashcards();
