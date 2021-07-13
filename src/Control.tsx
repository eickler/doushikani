import { Flashcard, flashcards } from "./Flashcards";
import { VerbDefinition } from "./Verbs";
import _verbs from "./verbs.json";

const verbs = (() => {
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

export class Control {
  cards: Record<string, VerbCard> = {};

  constructor(level: number, amount: number) {
    this.freshCards(level, amount);
    this.cardsToRepeat();
  }

  private cardsToRepeat(): void {
    const dueCards = flashcards.dueCards();
    for (const [verb, dueCard] of Object.entries(dueCards)) {
      this.cards[verb] = { verb: verbs[verb], card: dueCard };
    }
  }

  private freshCards(level: number, amount: number): void {
    let currentAmount = 0;
    for (const verb of Object.values(verbs)) {
      if (verb.level <= level && !flashcards.available(verb.verb)) {
        flashcards.add([verb.verb]);
        currentAmount++;
        if (currentAmount >= amount) {
          break;
        }
      }
    }
  }

  pick(): VerbDefinition {
    const keys = Object.keys(this.cards);
    const rnd = Math.floor(Math.random() * keys.length);
    return this.cards[keys[rnd]].verb;
  }

  result(verb: string, transitive: boolean): void {
    flashcards.update(
      verb,
      this.cards[verb].card,
      transitive === verbs[verb].transitive
    );
  }
}
