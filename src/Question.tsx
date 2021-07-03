import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Choice, Selection } from './Choice';
import { VerbDefinition } from './Verbs';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(3) },
}));

interface Props {
  verb: VerbDefinition;
  onSelect: (selection: Selection) => void;
}

const Question = (props: Props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="h2">
            {props.verb.verb}
          </Typography>
          <Typography variant="h4" color="textSecondary">
            {props.verb.readings[0].reading}
          </Typography>
        </CardContent>
      </Card>
      <Choice onSelect={props.onSelect}/>
    </Container>
  );
};

export { Question, Selection };
