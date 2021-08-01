import { Control, verbs } from "./Control";
import { Flashcards } from "./Flashcards";
import { PersistentStorage } from "./PersistentStorage";

describe("Test flashcards", () => {
  const storage = new PersistentStorage();
  const flashcards = new Flashcards(storage);

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Should initially pull only new verbs", () => {
    expect(Object.keys(storage.getAll()).length).toBe(0);

    const nbrToLearn = 2;
    const control = new Control(flashcards, 60, nbrToLearn);
    expect(Object.keys(control.cards).length).toBe(nbrToLearn);

    expect(control.cards["入る"].card.item.repetition).toBe(0);
    expect(control.cards["入れる"].card.item.repetition).toBe(0);
  });

  it("Should pull new cards if there are not enough due cards", () => {
    const card = flashcards.add("入る");
    flashcards.update("入る", card, true);

    const nbrToLearn = 2;
    const control = new Control(flashcards, 60, nbrToLearn);
    expect(Object.keys(control.cards).length).toBe(nbrToLearn);

    expect(control.cards["入れる"].card.item.repetition).toBe(0);
    expect(control.cards["上げる"].card.item.repetition).toBe(0);
  });

  it("Shoudl pull due cards if there are due cards", () => {
    const card = flashcards.add("入る");

    const nbrToLearn = 1;
    const control = new Control(flashcards, 60, 1);
    expect(Object.keys(control.cards).length).toBe(1);

    expect(control.cards["入る"].card.item.repetition).toBe(0);
  });
});

/*
describe("Experimenting with verbs", () => {
  it("All -su verbs should be transitive", () => {
    let suVerbs = [0, 0],
      aruVerbs = [0, 0],
      meruVerbs = [0, 0];
    console.log(Object.keys(verbs).length);
    for (const verb of Object.keys(verbs)) {
      if (verb.endsWith("す")) {
        suVerbs[verbs[verb].transitive ? 0 : 1]++;
      }
      if (
        verb.endsWith("める") ||
        verb.endsWith("べる") ||
        verb.endsWith("せる") ||
        verb.endsWith("てる")
      ) {
        meruVerbs[verbs[verb].transitive ? 0 : 1]++;
        if (!verbs[verb].transitive) {
          console.log(verbs[verb]);
        }
      }
      if (
        verb.endsWith("らる") ||
        verb.endsWith("まる") ||
        verb.endsWith("はる") ||
        verb.endsWith("ばる") ||
        verb.endsWith("なる") ||
        verb.endsWith("たる") ||
        verb.endsWith("だる") ||
        verb.endsWith("さる") ||
        verb.endsWith("ざる") ||
        verb.endsWith("かる") ||
        verb.endsWith("がる") ||
        verb.endsWith("ある")
      ) {
        aruVerbs[verbs[verb].transitive ? 0 : 1]++;
      }
    }
    console.log("-su verbs compliance " + suVerbs); // 115 to 5
    console.log("-aru verbs compliance " + aruVerbs); // 1 to 38
    console.log("-meru verbs compliance " + meruVerbs); // 46 to 1
  });
});
*/