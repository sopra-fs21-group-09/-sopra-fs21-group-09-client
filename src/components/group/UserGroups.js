import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";

//Constants we need for this page
const GroupContainer = styled.button`
  &:hover {
        transform: translateY(-2px);
        cursor: pointer; 
      }  
  display: flex;
  justify-content: center;
  place-self: center;
  width: 125px;
  height: 125px;
  border-radius: 20%;
`;

const GroupName = styled.label`
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
 * This displays all the groups the user is currently a part of in the MyGroup page
 */
const UserGroups = ({ userGroup }) => {
    const history = useHistory();

    return (
        <GroupContainer
            className={"Box"}
            onClick={() => {
                history.push({
                    pathname: '/groupDetail',
                    detail: userGroup
                });
            }}
        >
            <GroupName>{userGroup.name}</GroupName>
        </GroupContainer>

    )
};

export default UserGroups;