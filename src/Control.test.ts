import { Control } from './Control';
import { Flashcards } from './Flashcards';

describe("Test flashcards", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Should initially pull only new verbs", () => {
    const flashcards = new Flashcards(window.localStorage);
    expect(Object.keys(flashcards._getAll()).length).toBe(0);

    const nbrToLearn = 2;
    const control = new Control(flashcards, 60, nbrToLearn);
    expect(Object.keys(control.cards).length).toBe(nbrToLearn);
    
    expect(control.cards['入る'].card.item.repetition).toBe(0);
    expect(control.cards['入れる'].card.item.repetition).toBe(0);
  });

  it("Should pull new cards if there are not enough due cards", () => {
    const flashcards = new Flashcards(window.localStorage);
    const card = flashcards.add('入る');
    flashcards.update('入る', card, true);

    const nbrToLearn = 2;
    const control = new Control(flashcards, 60, nbrToLearn);
    expect(Object.keys(control.cards).length).toBe(nbrToLearn);

    expect(control.cards['入れる'].card.item.repetition).toBe(0);
    expect(control.cards['上げる'].card.item.repetition).toBe(0);
  });

  it("Shoudl pull due cards if there are due cards", () => {
    const flashcards = new Flashcards(window.localStorage);
    const card = flashcards.add('入る');

    const nbrToLearn = 1;
    const control = new Control(flashcards, 60, 1);
    expect(Object.keys(control.cards).length).toBe(1);

    expect(control.cards['入る'].card.item.repetition).toBe(0);
  });
});
