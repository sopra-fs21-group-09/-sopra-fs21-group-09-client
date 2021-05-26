import styled from "styled-components";
import {Colors} from "./design/Colors";

export const DESKTOP_WIDTH = 1160;
export const SMALL_LAPTOPS_WIDTH = 970;
export const TABLETS_WIDTH = 750;
export const SMALL_WIDTH = 768;

export const HomeContainer = styled.div`
  max-width: ${DESKTOP_WIDTH}px;
  display: flex; 
`;

export const SideBar = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 22%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  padding: 20px;
  justify-content: center;
  background-color: ${Colors.DARK_GREY}; 
  overflow: hidden; /* Disablex horizontal scroll */
`;

export const BaseContainer = styled.div`
  padding-left: 100px;
  padding-right: 15px;
  padding-top: 75px;
  max-width: ${DESKTOP_WIDTH}px;
`;

export const BigContainer = styled.div`
  width: 100%;
  min-height: 500px;
  border: none;
  margin-bottom: 20px;
  display grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
`;

