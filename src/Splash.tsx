import { Grow, Grid } from "@material-ui/core";
import { ReactChild } from "react";

interface Props {
  children: ReactChild | ReactChild[];
  onFinish: () => void;
}

const Splash = (props: Props) => {
  setTimeout(props.onFinish, 3000);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grow in timeout={1000}>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grow>
    </Grid>
  );
};

export default Splash;
