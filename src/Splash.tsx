import { Grow, Box, SvgIcon } from "@material-ui/core";
import { ReactComponent as Logo } from "./assets/doushikani_nofonts.svg";

interface Props {
  onFinish: () => void;
}

const Splash = (props: Props) => {
  //setTimeout(props.onFinish, 3000);

  return (
    <Grow>
      <Box height="100vh" display="flex" flexDirection="column">
        <SvgIcon>
          <Logo/>
        </SvgIcon>
      </Box>
    </Grow>    
  );
}

export default Splash;
