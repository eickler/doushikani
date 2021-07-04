import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { VerbDefinition } from './Verbs';

export interface Props {
  verb: VerbDefinition;
}

export const Question = (props: Props) => {
  return (
    <Container>
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
    </Container>
  );
};
