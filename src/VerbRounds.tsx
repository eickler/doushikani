import { Box, LinearProgress } from "@material-ui/core";
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
const initState: State = { round: 0, result: [] };

// The rounds management could be factored out into a generic rounds handling wrapper component
// --> But how??
const VerbRounds = ({ verbs, onFinish }: Props) => {
  const [state, setState] = useState(initState);

  const nextRound = (result: boolean[]) => {
    setState({ round: state.round + 1, result: result });
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

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box flex={1} overflow="auto" style={{ margin: "20px" }}>
        <VerbRound verb={verbs[state.round]} onFinish={proceed} />
      </Box>
      <Box>
        <LinearProgress
          variant="determinate"
          value={(100 * state.round) / verbs.length}
        />
      </Box>
    </Box>
  );
};

export default VerbRounds;
