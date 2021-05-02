import {useHistory} from "react-router";
import React from "react";
import styled from "styled-components";

const random = () => Math.floor(Math.random() * 255);

export const GroupContainer = styled.div`
  &:hover {
        transform: translateY(-2px);
        cursor: pointer; 
      }  
  display: flex;
  justify-content: center;
  place-self: center;
  background: rgb(${random()}, ${random()}, ${random()});
  width: 125px;
  height: 125px;
  border-radius: 20%;
`;

export const GroupName = styled.label`
  color: white;
  width: 80%;
  height: 80%;
  text-transform: uppercase;  
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  place-self: center;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 1vw;
  z-index: 1;
`;

/**
 * @FunctionalComponent
 */
const UserGroups = ({ userGroup }) => {
    const history = useHistory();

    return (
        <GroupContainer>
            <GroupName>{userGroup.name}</GroupName>
        </GroupContainer>
    )
};

export default UserGroups;

let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
    '#99CC00', '#d3c331', '#67d363', '#3b96d3'];

function getNewRandomColor(){
    let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
        '#99CC00', '#d3c331', '#67d363', '#3b96d3'];
}