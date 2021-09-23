import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { VerbDefinition } from "./Verbs";

export interface Props {
  verb: VerbDefinition;
}

export const Question = (props: Props) => {
  return (
    <>
      <Grid item>
        <a
          href={"https://www.wanikani.com/vocabulary/" + props.verb.verb}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="h2">{props.verb.verb}</Typography>
        </a>
      </Grid>
      <Grid item>
        <Typography variant="h4" color="textSecondary">
          {props.verb.readings[0].reading}
        </Typography>
      </Grid>
    </>
  );
};
