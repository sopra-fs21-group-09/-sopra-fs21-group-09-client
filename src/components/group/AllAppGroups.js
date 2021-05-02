import styled from "styled-components";
import React, {useState} from "react";
import {RectButtonPopUp, RectButtonSmall} from "../../views/Button";
import {api, handleError} from "../../helpers/api";
import {InputFieldPopUp} from "../../views/Labels";
import { useHistory } from "react-router";
import Rodal from "rodal";

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
 * @FunctionalComponent
 */
const AllAppGroups = ({ group }) => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState(null);

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the groups are shown
     */
    function JoinPublicGroup(id) {
        try {
            api.post(`/users/${localStorage.getItem('id')}/groups/${id}`);
            history.push('/myGroups');
        } catch (error) {
            alert(`Something went wrong while joining the group: \n${handleError(error)}`);
        }
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, user joins private group
     */
    function JoinPrivateGroup() {
        try {
            const requestBody = JSON.stringify({
                password: password,
            });

            api.post(`/users/${localStorage.getItem('id')}/groups/${group.id}/private`, requestBody);
            history.push(`/myGroups`);

        } catch (error) {
            alert(`Something went wrong during group creation: \n${handleError(error)}`);
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
                        if (group.open === true){
                            JoinPublicGroup(group.id);
                        } else if (group.open === false){
                            setVisible(true);
                        }
                    }}
                >
                    Join
                </RectButtonSmall>
                {/*Overlay for password */}
                <Rodal height='200' customStyles={{borderRadius: '20px'}} visible={visible} closeOnEsc='true' onClose={() => setVisible(false)}>
                    <div><InputFieldPopUp
                        placeholder="Enter group password here..."
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    /></div>
                    <div><RectButtonPopUp
                        onClick={() => {
                            JoinPrivateGroup();
                        }}
                    >Join Group</RectButtonPopUp></div>
                </Rodal>
            </InboxButtonContainer>
        </ModuleBox>
    );
};

export default AllAppGroups;
