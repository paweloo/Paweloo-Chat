import React, { useContext } from "react";
import styled from "styled-components";
import "./ToggleSwitch.js";
import ToggleSwitch from "./ToggleSwitch.js";
import { UserContext } from "../App.js";
import { light, dark } from "../themes/mainTheme.js";

const StyledMenu = styled.div`
  background-color: #ececec;
  position: absolute;
  margin-top: 60px;
  margin-right: 26px;
  right: 0;
  top: 0;
  border-radius: 20px;
  color: white;
  text-align: left;
  font-weight: 200;

  p {
    margin: 0;
  }
`;

function Menu({ name, onClick }) {
  const [theme, setTheme] = useContext(UserContext);
  return (
    <StyledMenu>
      <p className="userName">{name}</p>
      <p className="buttonDescription">App theme</p>
      <ToggleSwitch
        onClick={() => {
          theme === light ? setTheme(dark) : setTheme(light);
        }}
        dark={theme === light ? false : true}
      />
      <button className="signOutButton" onClick={onClick}>
        <p>Sign out</p>
      </button>
    </StyledMenu>
  );
}

export default Menu;
