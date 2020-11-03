import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../redux/homeReducer";

interface Prop {
  data: {
    timestamp?: any;
    email?: string;
    message?: string;
    photo?: string;
  };
}

function Messages({ data: { timestamp, email, message, photo } }: Prop) {
  const user = useSelector(selectUser).userInfo;
  return (
    <div className={`message ${user?.email === email && "message_sender"}`}>
      <Avatar src={photo} className="message_photo" />
      <ContentDiv>
        <p>{message}</p>
        <small>{new Date(timestamp!.toDate())}</small>
      </ContentDiv>
    </div>
  );
}

const ContentDiv = styled.div``;

export default Messages;
