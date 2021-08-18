import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Highlight, ParticleHighlighter } from "./ParticleHighlighter";
import { VerbDefinition } from "./Verbs";

interface Props {
  verb: VerbDefinition;
}

export const Answer = (props: Props) => {
  const highlight = [
    Highlight.Cursor,
    Highlight.Correct,
    Highlight.Wrong,
    Highlight.Hide,
    Highlight.Hide,
    Highlight.Hide,
    Highlight.Hide,
  ];
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
            <Typography
              key={meaning.meaning}
              variant="h4"
              color={meaning.primary ? "textPrimary" : "textSecondary"}
            >
              {meaning.meaning}
            </Typography>
          ))}
        </CardContent>
        {props.verb.examples.map((example) => (
          <CardContent key={example.en}>
            <Typography variant="h5" color="textSecondary">
              <ParticleHighlighter
                text={example.ja}
                particles={example.indexes}
                highlight={highlight}
              />
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
