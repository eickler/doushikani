import React from "react";
import { Container, Button } from "@material-ui/core";
import Body from "./Body";
import Header from "./Header";
import Choice from "./Choice";

function App() {
  return (
    <>
      <Header/>
      <Container>
        <Body/>
      </Container>
      <Container>
        <Choice/>
      </Container>
    </>
  );
}

export default App;
