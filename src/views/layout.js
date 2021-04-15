import styled from "styled-components";
import { COLORS } from "./design/colors";

export const DESKTOP_WIDTH = 1160;
export const SMALL_LAPTOPS_WIDTH = 970;
export const TABLETS_WIDTH = 750;
export const SMALL_WIDTH = 768;

export const HomeContainer = styled.div`
  max-width: ${DESKTOP_WIDTH}px;
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
  padding: 20px;
  justify-content: center;
  background-color: ${COLORS.DARK_GREY}; 
  overflow: hidden; /* Disablex horizontal scroll */
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
  margin-bottom: 10px;
  padding: 0px;     
`;

export const DateLabel = styled.label`
  margin-top: 10px;
  font-size: 12px;
  color: white;  
`;