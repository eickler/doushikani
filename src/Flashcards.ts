import { supermemo, SuperMemoItem } from 'supermemo';
import { Flashcard } from './Flashcard'
import { PersistentStorage } from './PersistentStorage';

const DAY = 24*60*60*1000;

const defaultItem : SuperMemoItem = {
  interval: 0,
  repetition: 0,
  efactor: 2.5,
};

const nextDate = (interval: number) : number => {
  return Date.now() + interval * DAY;
}

export class Flashcards {
  storage: PersistentStorage;

  constructor(storage: PersistentStorage) {
    this.storage = storage;
  }

  available(verb: string) : boolean {
    return this.storage.get(verb) === null;
  }

  dueCards() : Record<string,Flashcard> {
    const cards : Record<string,Flashcard> = {};
    for (const [key, card] of Object.entries(this.storage.getAll())) {
      if (card.dueDate <= Date.now()) {
        cards[key] = card;
      }
    }
    return cards;
  }

  add(verb: string) : Flashcard {
    const card = { item: defaultItem, dueDate: Date.now() };
    this.storage.set(verb, card);
    return card;
  }

  update(verb: string, card: Flashcard, result: boolean) : void {
    const updatedItem = supermemo(card.item, result ? 5 : 0);
    const updatedCard = {
      item: updatedItem,
      dueDate: nextDate(updatedItem.interval),
    };
    this.storage.set(verb, updatedCard);
  }
}
