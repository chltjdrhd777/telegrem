import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import SearchIcon from "@material-ui/icons/Search";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { IconButton } from "@material-ui/core";
import Thread from "./Thread";
import SideBottom from "./SideBottom";
import { db } from "DB/firestore";

function Sidebar() {
  interface ThreadDataForm {
    id: string;
    data: { threadName: string };
  }
  const [thread, setThread] = useState([] as ThreadDataForm[]);

  //snapshot listener
  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) => {
      const threadData = snapshot.docs.map((e) => ({
        id: e.id,
        data: e.data() as { threadName: string },
      }));

      setThread(threadData);
    });
  }, []);

  const addThread = () => {
    const threadName = prompt("enter a thread name");
    if (threadName) {
      db.collection("threads").add(
        //data: e.data() <---
        {
          threadName,
        }
      );
    }
  };

  return (
    <ContainerDiv>
      <HeaderDiv>
        <SearchDiv>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </SearchDiv>

        <IconButton id="IconAnimation" onClick={addThread}>
          <BorderColorIcon />
        </IconButton>
      </HeaderDiv>

      <ThreadDiv>
        {thread.map((e) => (
          <Thread key={e.id} id={e.id} threadName={e.data.threadName} />
        ))}
      </ThreadDiv>

      <BottomDiv>
        <SideBottom />
      </BottomDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  flex: 0.25;
  height: 100vh;
  position: relative;

  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(190, 190, 190, 10%);
`;
const HeaderDiv = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;

  & #IconAnimation {
    color: white;
  }
`;
const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #405e90;
  border-radius: 5px;
  padding: 2px;
  width: 100%;

  & svg {
    color: white;
  }

  & input {
    border: none;
    background-color: transparent;
    outline-width: 0;
    color: white;
    margin-left: 5px;

    &::-webkit-input-placeholder {
      color: lightgray;
      padding-left: 6px;
    }

    &:focus {
      outline: none;
      &::placeholder {
        color: transparent;
      }
    }
    width: 100%;
  }
`;
const ThreadDiv = styled.div`
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const BottomDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;

  border-top: 1px solid rgba(190, 190, 190, 10%);
  position: absolute;
  bottom: 0;
  width: 100%;

  & .Bottom__avatar:hover {
    cursor: pointer;
    opacity: 50%;
  }

  & button {
    color: white;

    &:hover {
      color: rgba(2, 150, 199);
    }
  }
`;

export default Sidebar;
