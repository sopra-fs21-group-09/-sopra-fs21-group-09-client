import styled from "styled-components";
import React, {useState} from "react";

export const GroupContainer = styled.div`
  display: flex;
  justify-content: center;
  place-self: center;
  font-size: 30px;
  background: red;
  width: 100px;
  height: 100px;
  border-radius: 20%;
`;

export const GroupName = styled.label`
  color: white;
  text-transform: uppercase;    
  z-index: 1;
  margin: auto;
  width: 50%;
`;



export const Group = props => {

    /*const [color, setColor] = useState('red')

    let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
        '#99CC00', '#d3c331', '#67d363', '#3b96d3'];


    function getNewRandomColor(){
        let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
            '#99CC00', '#d3c331', '#67d363', '#3b96d3'];

        setColor('red')//colors[Math.floor(Math.random() * colors.length)]);
    }

    //getNewRandomColor()
     */

    return (<GroupContainer className={"Box"}>
            <GroupName>{props.name}</GroupName>
        </GroupContainer>
    )
}