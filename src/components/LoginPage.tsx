import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { authService, googleProvider } from "DB/firestore";
import teleImg from "../img/pngwing.com.png";

function LoginPage() {
  const signIn = () => {
    authService.signInWithPopup(googleProvider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <ContainerDiv>
      <LoginDiv>
        <img src={teleImg} alt="" />
        <h1>Telegram</h1>
      </LoginDiv>
      <Button onClick={signIn}>Log in</Button>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: white;

  & button {
    width: 300px;
    color: white;
    background-color: rgb(2, 150, 199);

    &:hover {
      color: rgb(2, 150, 199);
      background-color: white;
    }
  }
`;

const LoginDiv = styled.div`
  & img {
    object-fit: contain;
    height: 150px;
  }
`;

export default LoginPage;
