import { useState } from "react";
import ParticleRound from "./ParticleRound";
import { VerbCard } from "./Control";
import { Example } from "./Verbs";

interface Props {
  verbs: VerbCard[];
  onFinish: (result: boolean[]) => void;
}

interface State {
  example: Example;
  round: number;
  result: boolean[];
}

const ParticleRounds = ({ verbs, onFinish }: Props) => {
  const pick = (round: number): Example => {
    const verb = verbs[round].verb;
    return verb.examples[Math.floor(Math.random() * verb.examples.length)];
  };

  const initState = (): State => {
    return { example: pick(0), round: 0, result: [] };
  };

  const [state, setState] = useState(initState);

  const nextRound = (result: boolean[]) => {
    const round = state.round + 1;
    setState({ example: pick(round), round: round, result: result });
  };

  const resetAndNotify = (result: boolean[]) => {
    setState(initState);
    onFinish(result);
  };

  const proceed = (pass: boolean) => {
    const result = [...state.result, pass];

    if (state.round < verbs.length - 1) {
      nextRound(result);
    } else {
      resetAndNotify(result);
    }
  };

  return <ParticleRound example={state.example} onFinish={proceed} />;
};

export default ParticleRounds;
