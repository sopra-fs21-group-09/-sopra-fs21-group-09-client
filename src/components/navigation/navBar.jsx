import React from "react";
import styled from "styled-components";
import { HamburgerMenu } from "./index";

const NavbarContainer = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2em;
  z-Index: 1000;
`;

export function NavBar() {
  return (
    <NavbarContainer>
      <HamburgerMenu />
    </NavbarContainer>
  );
}
