interface Props {
  onFinish: (repeat: boolean) => void;
}

const Summary = (props: Props) => {
  setTimeout(() => props.onFinish(true), 3000);

  return (
    <></>
  );
}

export default Summary;
