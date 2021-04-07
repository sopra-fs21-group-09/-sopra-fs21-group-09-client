import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {RectButton, CircleButton} from "../../views/Button";
import {GroupContainer, TaskContainer} from "../../views/Container";

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <BaseContainer>
                <RectButton>RectButton</RectButton>
                <CircleButton>CircleButton</CircleButton>
                <Label>Welcome to your Home Screen</Label>
                <GroupContainer>
                <Label>Home Group</Label>
                </GroupContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Home);