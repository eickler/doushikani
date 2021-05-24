import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Body() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          上げる
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>Transcription</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.pos} color="textSecondary">
              あげる          
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>Translation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" component="p">
              To raise<br/>
              To raise something<br/>
              To lift<br/>
            </Typography>
          </AccordionDetails>
        </Accordion>
     </CardContent>
    </Card>
  );
}