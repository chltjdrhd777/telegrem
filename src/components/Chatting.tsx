import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Avatar, IconButton } from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import {
  MicNoneOutlined,
  SendRounded,
  TimerOutlined,
} from "@material-ui/icons";
import { db } from "DB/firestore";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectThread, selectUser } from "../redux/homeReducer";
import Messages from "./Messages";

function Chatting() {
  const [input, setInput] = useState("");
  const [message, setMessages] = useState([] as any[]);
  const threadCheck = useSelector(selectThread);
  const user = useSelector(selectUser).userInfo;

  useEffect(() => {
    if (threadCheck.threadId) {
      db.collection("threads")
        .doc(threadCheck.threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) =>
          setMessages(
            snap.docs.map((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          )
        );
    }
  }, [threadCheck.threadId]);

  const onChangeFunc = (e: any) => {
    setInput(e.target.value);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    db.collection("threads")
      .doc(threadCheck.threadId!)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user?.uid,
        photo: user?.photo,
        email: user?.email,
        displayName: user?.displayName,
      });

    setInput("");
  };

  return (
    <ContainerDiv>
      <HeaderDiv>
        <HedaerContentsDiv>
          <Avatar className="AVATAR" />
          <InfoDiv>
            <h4>ThreadName</h4>
            <h5>LastName</h5>
          </InfoDiv>
        </HedaerContentsDiv>

        <IconButton>
          <MoreHoriz className="MoreHoriz" />
        </IconButton>
      </HeaderDiv>

      <MessageDiv>
        <InputDiv>
          <form>
            <input
              type="text"
              placeholder="Write a message..."
              value={input}
              onChange={onChangeFunc}
              onKeyPress={sendMessage}
            />
            <IconButton>
              <TimerOutlined />
            </IconButton>

            <IconButton onClick={sendMessage}>
              <SendRounded />
            </IconButton>

            <IconButton>
              <MicNoneOutlined />
            </IconButton>
          </form>
        </InputDiv>
      </MessageDiv>

      <MessageListDiv></MessageListDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 100vh;

  & .MoreHoriz {
    color: white;

    &:hover {
      color: rgba(1, 150, 199);
    }
  }
`;
const HeaderDiv = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(190, 190, 190, 10%);
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

const HedaerContentsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
`;
const InfoDiv = styled.div`
  & h5 {
    font-weight: 500;
    color: gray;
  }
`;

const MessageDiv = styled.div`
  flex: 1;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  border-top: 1px solid rgb(190, 190, 190, 10%);

  & > form > input {
    width: 98%;
    outline-width: 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    padding: 5px;
    color: white;
  }

  & > form > button {
    color: white;

    & :hover {
      color: rgb(2, 150, 199);
    }
  }
`;

const MessageListDiv = styled.div``;

export default Chatting;
