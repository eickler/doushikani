import { Grow, Grid, Typography } from "@material-ui/core";
import { ReactComponent as Logo } from "./assets/doushikani.svg";

interface Props {
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
          <Logo />
          <Typography variant="h2">doushikani</Typography>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default Splash;
