import { useState } from "react";
import { VerbCard } from "./Control";
import VerbRound from "./VerbRound";

interface Props {
  verbs: VerbCard[];
  onFinish: (result: boolean[]) => void;
}

interface State {
  round: number;
  result: boolean[];
}
const initState : State = { round: 0, result: [] };

const VerbRounds = (props: Props) => {
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

  return <VerbRound verb={props.verbs[state.round]} onFinish={nextRound} />;
};

export default VerbRounds;
