import { Highlight, split } from "./ParticleHighlighter";

describe("Test particle highlighting", () => {
  it("Should show simple text", () => {
    const text = "すごい";

    const result = split(text, [], []);

    expect(result.length).toBe(1);
    expect(result[0].props.children).toEqual(text);
  });

  it("Should hide a particle", () => {
    const text = "Typescriptが好きです。";

    const result = split(text, [10], [Highlight.Hide]);

    expect(result.length).toBe(3);
    expect(result[0].props.children).toEqual("Typescript");
    expect(result[1].props.children).toEqual("_");
    expect(result[2].props.children).toEqual("好きです。");
  });

  it("Should highlight a particle", () => {
    const text = "Typescriptが好きです。";

    const result = split(text, [10], [Highlight.Correct]);

    expect(result.length).toBe(3);
    expect(result[0].props.children).toEqual("Typescript");
    expect(result[1].props.children).toEqual("が");
    expect(result[2].props.children).toEqual("好きです。");

    expect(result[1].props.style).toEqual({ color: "green" });
  });

  it("Should highlight another particle", () => {
    // Since we do verb tests, we don't usually have a particle at the end of the sentence.
    // It still works, but you get an empty span.
    const text = "今晩は";

    const result = split(text, [2], [Highlight.Wrong]);

    expect(result.length).toBe(3);
    expect(result[0].props.children).toEqual("今晩");
    expect(result[1].props.children).toEqual("は");

    expect(result[1].props.style).toEqual({ color: "red" });
  });
});
