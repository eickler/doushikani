import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { ParticleHighlighter, Highlight } from "./ParticleHighlighter";

Enzyme.configure({ adapter: new Adapter() });

describe("Test particle highlighting", () => {
  it("Should show simple text", () => {
    const text = "すごい";

    const wrapper = shallow(
      <ParticleHighlighter
        onSelect={() => {}}
        text={text}
        particles={[]}
        highlight={[]}
      />
    );

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.find("[data-id]")).toHaveLength(0);
  });

  it("Should hide a particle", () => {
    const text = "Typescriptが好きです。";

    const wrapper = shallow(
      <ParticleHighlighter
        onSelect={() => {}}
        text={text}
        particles={[10]}
        highlight={[]}
      />
    );

    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.find("[data-id]")).toHaveLength(1);
    expect(wrapper.find('[data-id="hidden"]')).toHaveLength(1);
  });

  it("Should show a cursor", () => {
    const text = "Typescriptが好きです。";

    const wrapper = shallow(
      <ParticleHighlighter
        onSelect={() => {}}
        text={text}
        particles={[10]}
        highlight={[Highlight.Cursor]}
      />
    );

    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.find("[data-id]")).toHaveLength(1);

    const cursor = wrapper.find('[data-id="cursor"]');
    expect(cursor).toHaveLength(1);
    expect(cursor.children()).toHaveLength(4);
  });

  it("Should correctly deal with particles at the end", () => {
    const text = "私は";

    const wrapper = shallow(
      <ParticleHighlighter
        onSelect={() => {}}
        text={text}
        particles={[1]}
        highlight={[Highlight.Cursor]}
      />
    );

    console.log(wrapper.debug());
    expect(wrapper.children()).toHaveLength(3); // Empty span at the end
    expect(wrapper.find("[data-id]")).toHaveLength(1);
  });

  it("Should correctly show a correct and a wrong guess", () => {
    const text = "私はTypescriptを好きです。";

    const wrapper = shallow(
      <ParticleHighlighter
        onSelect={() => {}}
        text={text}
        particles={[1, 12]}
        highlight={[Highlight.Correct, Highlight.Wrong]}
      />
    );

    expect(wrapper.children()).toHaveLength(5);
    expect(wrapper.find("[data-id]")).toHaveLength(2);

    const correct = wrapper.find('[data-id="correct"]');
    expect(correct).toHaveLength(1);
    expect(correct.children().text()).toEqual("は");

    const wrong = wrapper.find('[data-id="wrong"]');
    expect(wrong).toHaveLength(1);
    expect(wrong.children().text()).toEqual("を");
  });
});
