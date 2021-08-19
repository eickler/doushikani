interface Props {
  onFinish: () => void;
}

const ParticleRound = (props: Props) => {
  setTimeout(props.onFinish, 3000);

  return (
    <></>
  );
}

export default ParticleRound;
