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

//define display of Settings of each group
function groupPrivacy(privacy) {
    if (privacy === true){
        return "Public";
    } else {
        return "Privat";
    }
}

/**
 * @FunctionalComponent
 * This displays all AppGroups that the user is currently not a part of
 */
const AllAppGroups = ({ group }) => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    let disable = false;
    const [password, setPassword] = useState(null);

    // Define Enroll for each Group
    let settings;
    if (group.memberLimit === 0){
        settings = "unlimited";
    } else {
        settings = group.memberCount + "/" + group.memberLimit;
    }

    // Disable button for groups that are full
    if (group.memberCount >= group.memberLimit && settings !== "unlimited"){
        disable = true;
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the user joins a public group
     */
    async function JoinPublicGroup() {
        try {
            await api.post(`/users/${sessionStorage.getItem('id')}/groups/${group.id}`);
            history.push('/myGroups');
        } catch (error) {
            alert(`Something went wrong while joining the group: \n${handleError(error)}`);
        }
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, the user joins private group
     */
    async function JoinPrivateGroup() {
        try {
            const requestBody = JSON.stringify({
                password: password,
            });

            await api.post(`/users/${sessionStorage.getItem('id')}/groups/${group.id}/private`, requestBody);
            history.push(`/myGroups`);

        } catch (error) {
            alert(`Something went wrong during group creation: \n${handleError(error)}`);
        }
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
                    disabled={disable}
                    onClick={() => {
                        if (group.open === true){
                            JoinPublicGroup();
                        } else if (group.open === false){
                            setVisible(true);
                        }
                    }}
                >
                    Join
                </RectButtonSmall>
                {/*Overlay for password */}
                <Rodal height={200} customStyles={{borderRadius: '20px'}} visible={visible} closeOnEsc={true} onClose={() => setVisible(false)}>
                    <div><InputFieldPopUp
                        placeholder="Enter group password here..."
                        type="password"
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
