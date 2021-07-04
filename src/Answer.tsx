import { Card, CardContent, Container, Typography } from "@material-ui/core";
import { VerbDefinition } from "./Verbs";

interface Props {
  verb: VerbDefinition;
}

export const Answer = (props: Props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3">
            {props.verb.transitive ? "Transitive" : "Intransitive"}
          </Typography>
        </CardContent>
        <CardContent>
          {props.verb.meanings.map((meaning) => (
            <Typography variant="h4" color={ meaning.primary ? "textPrimary" : "textSecondary"}>
              {meaning.meaning}
            </Typography>
          ))}
        </CardContent>
        {props.verb.examples.map((example) => (
          <CardContent>
            <Typography variant="h5" color="textSecondary">
              {example.ja}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {example.en}
            </Typography>
          </CardContent>
        ))}
      </Card>
    </Container>
  );
};
