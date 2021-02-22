import React from "react";
import styled, { css } from "styled-components";

const Switch = styled.div`
  border-radius: 50px;
  width: 60px;
  height: 26px;
  margin: 4px 10px 10px 20px;
  background-color: white;
  display: flex;
  align-items: center;
  transition: background 0.4s ease-out;

  ${(props) =>
    props.dark &&
    css`
      background-color: black;
    `};
`;

const Dot = styled.div`
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin-left: 4px;
  transition: margin-left 0.4s, background 0.4s ease-out;

  ${(props) =>
    props.dark &&
    css`
      background-color: white;
      margin-left: 35px;
    `};
`;

function ToggleSwitch({ dark, onClick }) {
  return (
    <Switch dark={dark} onClick={onClick}>
      <Dot dark={dark} onClick={onClick} />
    </Switch>
  );
}

export default ToggleSwitch;
