import React from "react";
import styled from "styled-components/macro";
import { Avatar } from "@material-ui/core";

interface PropTypes {
  key?: string;
  id?: string;
  threadName: string;
}

function Thread({ threadName }: PropTypes) {
  return (
    <ContainderDiv>
      <Avatar className="AVATAR" />
      <DetailDiv>
        <h3>{threadName}</h3>
        <p>This is the info</p>
        <small>timestamp</small>
      </DetailDiv>
    </ContainderDiv>
  );
}

const ContainderDiv = styled.div`
  display: flex;
  align-items: ceneter;
  padding: 20px;
  border-bottom: 1px solid rgba(190, 190, 190, 10%);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(2, 150, 199);
  }
`;

const DetailDiv = styled.div`
  margin-left: 10px;
  position: relative;
  width: 100%;

  & small {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 17px;
  }
`;

export default Thread;
