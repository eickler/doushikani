import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Example } from "./Verbs";
import ParticleRound from "./ParticleRound";

Enzyme.configure({ adapter: new Adapter() });

describe("Test particle selection", () => {
  it("Should finish simple particle", () => {
    const example: Example = {
      en: "I like Typescript.",
      ja: "Typescriptが好きです。",
      indexes: [10],
    };
    const onFinish = jest.fn();

    const wrapper = shallow(
      <ParticleRound example={example} onFinish={onFinish} />
    );

    console.log(wrapper.find("ParticleHighlighter").debug());
    //const onSelect = wrapper.find("ParticleHighlighter").prop("onSelect");
    // This does not work because the method expects an event:
    //onSelect("が").then(() => {
    // expect()
    //});
  });

  // Single click
  // Cursor move, correct highlights in the state
  // Several clicks with right result.
  // Notification
});
