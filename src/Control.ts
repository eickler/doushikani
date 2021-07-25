import { Flashcard } from "./Flashcard";
import { Flashcards } from "./Flashcards";
import { VerbDefinition } from "./Verbs";
import _verbs from "./verbs.json";

export const verbs = (() => {
  const verbs: Record<string, VerbDefinition> = {};
  for (const verb of _verbs as [VerbDefinition]) {
    verbs[verb.verb] = verb;
  }
  return verbs;
})();

interface VerbCard {
  verb: VerbDefinition;
  card: Flashcard;
}

export const DONE: VerbDefinition = {
  verb: "You are done for the day!",
  url: "https://i.giphy.com/media/RiWZUGcZPEKdQgrQ96/giphy.webp",
  level: 0,
  transitive: false,
  types: [""],
  examples: [{ en: "", ja: "" }],
  meanings: [{ meaning: "", primary: true, accepted_answer: true }],
  readings: [
    { reading: "Come back tomorrow.", primary: true, accepted_answer: true },
  ],
};

export class Control {
  flashcards: Flashcards;
  cards: Record<string, VerbCard> = {};

  constructor(flashcards: Flashcards, level: number, amount: number) {
    this.flashcards = flashcards;
    const freshCardsToGet = this.cardsToRepeat(amount);
    if (flashcards.storage.shouldGetNewCards()) {
      this.freshCards(level, freshCardsToGet);
      flashcards.storage.gotNewCards();
    }
  }

  private cardsToRepeat(amount: number): number {
    const dueCards = this.flashcards.dueCards();
    for (const [verb, dueCard] of Object.entries(dueCards)) {
      if (amount-- === 0) {
        break;
      }
      this.cards[verb] = { verb: verbs[verb], card: dueCard };
    }
    return amount;
  }

  private freshCards(level: number, amount: number): void {
    for (const verb of Object.values(verbs)) {
      if (verb.level <= level && this.flashcards.available(verb.verb)) {
        if (amount-- === 0) {
          break;
        }
        const card = this.flashcards.add(verb.verb);
        this.cards[verb.verb] = { verb: verb, card: card };
      }
    }
  }

  pick(): VerbDefinition {
    const candidateVerbs = Object.keys(this.cards);
    if (candidateVerbs.length) {
      const rnd = Math.floor(Math.random() * candidateVerbs.length);
      const pickedVerb = this.cards[candidateVerbs[rnd]].verb;
      return pickedVerb;
    }
    return DONE;
  }

  result(verb: string, transitive: boolean): void {
    this.flashcards.update(
      verb,
      this.cards[verb].card,
      transitive === verbs[verb].transitive
    );
    delete this.cards[verb];
  }
}
