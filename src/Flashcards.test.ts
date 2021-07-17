import { Flashcards } from './Flashcards';

const DAY = 86400000;

const setNow = (d: number) => {
  jest.spyOn(global.Date, 'now').mockImplementation(() => d);
}

describe("Test flashcards", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setNow(0);
  });

  it("Should be initially empty", () => {
    const flashcards = new Flashcards(window.localStorage);
    expect(flashcards.available('verb')).toBeTruthy();
    expect(flashcards.dueCards.length).toBe(0);
  });

  it("Should present a newly added card", () => {
    const flashcards = new Flashcards(window.localStorage);
    flashcards.add('verb');

    expect(flashcards.available('verb')).toBeFalsy();
    const dueCards = flashcards.dueCards();
    expect(Object.keys(dueCards).length).toBe(1);
    expect(dueCards['verb']).toBeTruthy();
  });

  it("Should update failed tests", () => {
    const flashcards = new Flashcards(window.localStorage);
    flashcards.add('verb');
    const dueCards = flashcards.dueCards();

    flashcards.update('verb', dueCards['verb'], false);

    const newDue = flashcards._getAll()['verb'].dueDate;
    expect(newDue).toEqual(DAY);

    setNow(DAY);
    flashcards.update('verb', flashcards._getAll()['verb'], false);
    const newDue2 = flashcards._getAll()['verb'].dueDate;
    expect(newDue2).toEqual(2*DAY);
  });

  it("Should update passed tests", () => {
    const flashcards = new Flashcards(window.localStorage);
    flashcards.add('verb');
    const dueCards = flashcards.dueCards();

    flashcards.update('verb', dueCards['verb'], true);

    const newDue = flashcards._getAll()['verb'].dueDate;
    expect(newDue).toEqual(DAY);

    setNow(DAY);
    flashcards.update('verb', flashcards._getAll()['verb'], true);
    const newDue2 = flashcards._getAll()['verb'].dueDate;
    expect(newDue2).toEqual(7*DAY);
  });
});
