import { Typography } from "@material-ui/core";
import { ReactComponent as Crab } from "./assets/doushikani.svg";
import Splash from "./Splash";

interface Props {
  onFinish: () => void;
}

const Logo = (props: Props) => {
  setTimeout(props.onFinish, 3000);

  return (
    <Splash onFinish={props.onFinish}>
      <Crab />
      <Typography variant="h2">doushikani</Typography>
    </Splash>
  );
};

export default Logo;
