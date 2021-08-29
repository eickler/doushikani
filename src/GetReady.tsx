import { Typography } from "@material-ui/core";
import Splash from "./Splash";

interface Props {
  what: string;
  onFinish: () => void;
}

const GetReadyFor = (props: Props) => {
  setTimeout(props.onFinish, 3000);

  return (
    <Splash onFinish={props.onFinish}>
      <Typography variant="h2">Get ready for {props.what}!</Typography>
      <audio autoPlay src={process.env.PUBLIC_URL + "/assets/chime.mp3"}/>
    </Splash>
  );
};

export default GetReadyFor;
