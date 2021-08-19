interface Props {
  onFinish: () => void;
}

const VerbRound = (props: Props) => {
  setTimeout(props.onFinish, 3000);

  return (
    <></>
  );
}

export default VerbRound;
