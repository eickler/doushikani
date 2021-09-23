import { Typography } from "@material-ui/core";
import Splash from "./Splash";

const Goodbye = () => {
  return (
    <Splash onFinish={() => {}}>
      <Typography variant="h1">Goodbye!</Typography>
    </Splash>
  );
};

export default Goodbye;
