import { useState } from "react";
import ParticleRound from "./ParticleRound";
import { VerbCard } from "./Control";

interface Props {
  verbs: VerbCard[];
  onFinish: (result: boolean[]) => void;
}

interface State {
  round: number;
  result: boolean[];
}
const initState : State = { round: 0, result: [] };

const ParticleRounds = (props: Props) => {
  const [state, setState] = useState(initState);

  const nextRound = (pass: boolean) => {
    const newState = {
      round: state.round + 1,
      result: [ ...state.result, pass ]
    };
    if (newState.round < props.verbs.length) {
      setState(newState);
    } else {
      setState(initState);
      props.onFinish(newState.result);
    }
  };

  // There should be a new instance of this every time ... ?
  return <ParticleRound verb={props.verbs[state.round]} onFinish={nextRound} />;
};

export default ParticleRounds;
