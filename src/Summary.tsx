import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";

interface Props {
  verbsResult: boolean[];
  particlesResult: boolean[];
  onFinish: (repeat: boolean) => void;
}

const Summary = ({ verbsResult, particlesResult, onFinish }: Props) => {
  return (
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="h2">Good job!</Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary">
          <Button onClick={() => onFinish(true)}>
            Let's do another round!
          </Button>
          <Button onClick={() => onFinish(false)}>That's it for today.</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Summary;
