import React, { Component } from "react";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { styled } from "@mui/material/styles";
import { keyframes } from '@mui/system';
const spin = keyframes`
from {
  transform : scale(1);
  opacity   : 0.10;
}
50% {
  transform : scale(0.75);
  opacity   : 0.25;
}
to {
  transform : scale(1);
  opacity   : 1;
}
`;

const MoveBox = styled('div')({
  animation: `${spin} 5s infinite ease`,
});

export default function Header() {
  return (
    <header className="App-header">
      <MoveBox><TimeToLeaveIcon sx={{ fontSize: 30 }}/> <TimeToLeaveIcon  sx={{ fontSize: 35 }} /> <TimeToLeaveIcon sx={{ fontSize: 40 }} /> </MoveBox> 
    </header>
  );
}
