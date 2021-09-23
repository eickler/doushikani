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

export interface VerbCard {
  verb: VerbDefinition;
  card: Flashcard;
}

export class Control {
  flashcards: Flashcards;
  cards: Record<string, VerbCard> = {};

  constructor(flashcards: Flashcards, level: number, amount: number) {
    this.flashcards = flashcards;
    const freshCardsToCreate = this.cardsToRepeat(amount);
    this.freshCards(level, freshCardsToCreate);
  }

  private cardsToRepeat(amount: number): number {
    const dueCards = this.flashcards.dueCards();
    // Probably there should be some form of ordering by due dates here? Or randomization?
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
      if (verb.level <= level && !this.flashcards.cardStoredFor(verb.verb)) {
        if (amount-- === 0) {
          break;
        }
        const card = this.flashcards.add(verb.verb);
        this.cards[verb.verb] = { verb: verb, card: card };
      }
    }
  }

  getCards(): VerbCard[] {
    return Object.values(this.cards);
  }

  result(verb: string, passed: boolean): void {
    this.flashcards.update(verb, this.cards[verb].card, passed);
  }
}
