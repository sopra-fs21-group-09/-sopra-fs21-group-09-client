import styled from "styled-components";
import {DARK_GREY, COLOR3} from "./design/colors";

export const DESKTOP_WIDTH = 1160;
export const SMALL_LAPTOPS_WIDTH = 970;
export const TABLETS_WIDTH = 750;
export const SMALL_WIDTH = 768;

export const HomeContainer = styled.div`
  max-width: ${DESKTOP_WIDTH}px;
  max-height: 100%; 
  display: flex; 
  margin: 0;
`;

export const SideBar = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 22%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  padding-top: 100px;
  background-color: ${COLOR3} /* does not work*/
  overflow-x: hidden; /* Disable horizontal scroll */
`;

export const BaseContainer = styled.div`
  padding-left: 100px;
  padding-right: 15px;
  padding-top: 75px;
  max-width: ${DESKTOP_WIDTH}px;
`;

export const Label = styled.label`
  font-size: 20px;
  display: flex;
  color: white;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;     
`;

export const DateLabel = styled.label`
  margin-top: 10px;
  font-size: 12px;
  color: white;  
`;