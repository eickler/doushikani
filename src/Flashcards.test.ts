import { Flashcards } from "./Flashcards";
import { PersistentStorage } from "./PersistentStorage";

const DAY = 86400000;

const setNow = (d: number) => {
  jest.spyOn(global.Date, 'now').mockImplementation(() => d);
}

describe("Test flashcards", () => {
  const storage = new PersistentStorage();
  const flashcards = new Flashcards(storage);

  beforeEach(() => {
    window.localStorage.clear();
    setNow(0);
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

    const newDue = storage.getAll()['verb'].dueDate;
    expect(newDue).toEqual(DAY);

    setNow(DAY);
    flashcards.update('verb', storage.getAll()['verb'], false);
    const newDue2 = storage.getAll()['verb'].dueDate;
    expect(newDue2).toEqual(2*DAY);
  });

  it("Should update passed tests", () => {
    flashcards.add('verb');
    const dueCards = flashcards.dueCards();

    flashcards.update('verb', dueCards['verb'], true);

    const newDue = storage.getAll()['verb'].dueDate;
    expect(newDue).toEqual(DAY);

    setNow(DAY);
    flashcards.update('verb', storage.getAll()['verb'], true);
    const newDue2 = storage.getAll()['verb'].dueDate;
    expect(newDue2).toEqual(7*DAY);
  });
});
