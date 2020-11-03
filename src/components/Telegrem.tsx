import React from "react";
import styled from "styled-components/macro";
import Chatting from "./Chatting";
import Sidebar from "./Sidebar";

function Telegrem() {
  return (
    <ContainerDiv>
      <Sidebar />
      <Chatting />
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
`;

export default Telegrem;
