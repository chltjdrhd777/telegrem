import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings,
} from "@material-ui/icons";
import { authService } from "DB/firestore";

function SideBottom() {
  return (
    <>
      <Avatar
        className="AVATAR"
        onClick={() => {
          authService.signOut();
        }}
      />

      <IconButton>
        <PhoneOutlined />
      </IconButton>

      <IconButton>
        <QuestionAnswerOutlined />
      </IconButton>

      <IconButton>
        <Settings />
      </IconButton>
    </>
  );
}

export default SideBottom;
