import { Flashcards } from './Flashcards';

describe("Test flashcards", () => {
  const flashcards = new Flashcards(window.localStorage);

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Should be initially empty", () => {
    expect(flashcards.available('verb')).toBeTruthy();
    expect(flashcards.dueCards.length).toBe(0);
  });

  it("Should present a newly added card", () => {
    flashcards.add('verb');

    expect(flashcards.available('verb')).toBeFalsy();
    const dueCards = flashcards.dueCards();
    expect(Object.keys(dueCards).length).toBe(1);
    expect(dueCards['verb']).toBeTruthy();
  });

  it("Should update failed tests", () => {
    flashcards.add('verb');
    const dueCards = flashcards.dueCards();

    flashcards.update('verb', dueCards['verb'], false);

    const newDue = flashcards._getAll()['verb'].dueDate;
    expect(newDue).toBeGreaterThan(Date.now() + 86400000 - 10);
  });

  it("Should update passed tests", () => {
    // Should probably be repeated, so that interval is different.
    flashcards.add('verb');
    const dueCards = flashcards.dueCards();

    flashcards.update('verb', dueCards['verb'], true);

    const newDue = flashcards._getAll()['verb'].dueDate;
    console.log(newDue, Date.now());
    expect(newDue).toBeGreaterThan(Date.now() + 86400000 - 10);
  });
});
