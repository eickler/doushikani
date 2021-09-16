import { Typography } from "@material-ui/core";

interface Props {
  verbsResult: boolean[];
  particlesResult: boolean[];
  onFinish: (repeat: boolean) => void;
}

const Summary = (props: Props) => {
  return <Typography variant="h2">Good job!</Typography>;
};

export default Summary;
