import styled from "styled-components";
import React, {useState} from "react";
import {RectButton, RectButtonSmall} from "../../views/Button";
import {api, handleError} from "../../helpers/api";
import { useHistory } from "react-router";
import {InputField, Label} from "../../views/Labels";
import Rodal from "rodal";


const random = () => Math.floor(Math.random() * 255);

export const GroupContainer = styled.div`
  &:hover {
        transform: translateY(-2px);
        cursor: pointer; 
      }  
  display: flex;
  justify-content: center;
  place-self: center;
  font-size: 30px;
  background: rgb(${random()}, ${random()}, ${random()});
  width: 125px;
  height: 125px;
  border-radius: 20%;
  padding: 20px; 
`;

export const GroupName = styled.label`
  color: white;
  text-transform: uppercase;    
  z-index: 1;
  margin: auto;
  width: 50%;
`;

//This is the div that will be generated with each new group (of course with other divs inside)
export const ModuleBox = styled.div`
  height: 60px;
  width: 99%;
  display grid;
  grid-template-columns: 25% 30% 15% 10% 15%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
`;

export const InboxLabel = styled.div`
  place-self: center;
  color: black;
  font-size: 30px;
`;

export const InboxLabelName = styled.div`
  place-self: center;
  color: black;
  font-size: 20px;
`;

export const InboxButtonContainer = styled.div`
  place-self: center;
  width: 80%;
`;

function groupPrivacy(privacy) {
    if (privacy === true){
        return "Public";
    } else {
        return "Privat";
    }
}

/**
 * HTTP GET request is sent to the backend.
 * If the request is successful, the groups are shown
 */

/**
 * @FunctionalComponent
 */
const Group = ({ group }) => {
    const history = useHistory();

    function joinAppGroup(id, privacy) {
        try {
            if (privacy === true) {
                api.post(`/users/${localStorage.getItem('id')}/groups/${id}`);
                history.push('/myGroups');
            } else if (privacy === false){
                history.push('/groupLogin');
            }
        } catch (error) {
            alert(`Something went wrong while joining the group: \n${handleError(error)}`);
        }
    }

    // Define display of settings of Groups
    let settings;
    if (group.memberLimit === 0){
         settings = "unlimited";
    } else {
        settings = group.memberCount + "/" + group.memberLimit;
    }

    return (
        <ModuleBox>
            <InboxLabel>{group.name}</InboxLabel>
            <InboxLabelName>{group.creator.username}</InboxLabelName>
            <InboxLabel>{groupPrivacy(group.open)}</InboxLabel>
            <InboxLabel>{settings}</InboxLabel>
            <InboxButtonContainer>
                <RectButtonSmall
                    width="100%"
                    onClick={() => {
                        joinAppGroup(group.id, group.open);
                    }}
                >
                    Join
                </RectButtonSmall>
            </InboxButtonContainer>
        </ModuleBox>
    );
};

export default Group;


export const Groups = props => {

    const [color, setColor] = useState('red')

    let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
        '#99CC00', '#d3c331', '#67d363', '#3b96d3'];


    function getNewRandomColor(){
        let colors = ['#D3212D', '#0048BA', '#4CE600', '#FF8C19', '#2ac2d3', '#841ed3', '#F19CBB',
            '#99CC00', '#d3c331', '#67d363', '#3b96d3'];

        setColor('red')//colors[Math.floor(Math.random() * colors.length)]);
    }

    //getNewRandomColor()


    return (<GroupContainer>
            <GroupName>{props.name}</GroupName>
        </GroupContainer>
    )
}
