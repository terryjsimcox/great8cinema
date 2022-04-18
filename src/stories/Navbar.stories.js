import { useState } from "react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";

export default {
  title: "Navbar/Navbar",
  component: Navbar,
  parameters: {
    backgrounds: {
      default: "default",
      values: [{ name: "default", value: "#272822" }],
    },
  },
};

const Container = styled.div`
  position: relative;
  height: 1000px;
`;

export const Default = ({ init, ...args }) => {
  const [state, setState] = useState(init);
  return (
    <Container>
      <MemoryRouter>
        <Navbar state={state} updateState={setState} />
      </MemoryRouter>
    </Container>
  );
};
Default.args = {
  init: {
    current_page: "Now Showing",
    films: [],
  },
};
