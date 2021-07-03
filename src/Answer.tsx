import { Button, Card, CardContent, Container, Typography } from '@material-ui/core';
import { VerbDefinition } from './Verbs';

interface Props {
  verb: VerbDefinition;
  onContinue: () => void;
}

export const Answer = (props: Props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h2">
            {props.verb.transitive ? "Transitive" : "Intransitive"}
          </Typography>
          <Typography variant="h4" color="textSecondary">
            {props.verb.examples[0].ja}
          </Typography>
          <Typography variant="h4" color="textSecondary">
            {props.verb.examples[0].en}
          </Typography>
        </CardContent>
      </Card>
      <Button variant="contained" onClick={props.onContinue}>Continue</Button>
    </Container>
  );
}