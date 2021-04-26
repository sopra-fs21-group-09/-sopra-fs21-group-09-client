import styled from "styled-components";
import React, {Component} from "react";

export const GroupContainer = styled.div`
  border-radius: 6px;
  align-items: center;
  border: 1px solid #018692;
  background-color: #018692;
  width: 15%;
  height: 0;
  padding-top: 15%;
  position:relative;
  z-index: -1;
`;

export const GroupName = styled.label`
  color: white;
  text-transform: uppercase;    
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 50px 50px;
  margin: auto;
  width: 50%;
`;

export const Group = props => {
        return (<GroupContainer>
                <GroupName>GROUP NAME</GroupName>
            </GroupContainer>
        )
}