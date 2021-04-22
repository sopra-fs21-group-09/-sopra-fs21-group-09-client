import React from "react";
import styled from "styled-components";
import { HamburgerMenu } from "../hamburgerMenu";

const NavbarContainer = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2em;
`;

export function Navbar(props) {
  return (
    <NavbarContainer>
      <HamburgerMenu />
    </NavbarContainer>
  );
}
