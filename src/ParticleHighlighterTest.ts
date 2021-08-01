import { split } from "./ParticleHighlighter";

describe("Test particle highlighting", () => {
  it("Should show simple text", () => {
    const text = "今晩は";

    const result = split(text, [], []);

    expect(result.length).toBe(1);

  });
});
