import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import {withRouter} from "react-router-dom";
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {PageTitle} from "../../views/Labels";
import {RectButtonBig} from "../../views/Button";

//Constants we need for this page
const Label = styled.label`
  text-transform: uppercase;
  margin-left: 2%;
  color: orange;
  font-size: 25px;
`;

const LabelTwo = styled.label`
  text-transform: uppercase;
  margin-left: 2%;
  color: orange;
  font-size: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
  width: 100%;
`;

class GroupDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            groups: null,
        };
    }

    async componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>Group Details</PageTitle>
                <Label>Whoopsie, This feature does not exist</Label><br />
                <LabelTwo>Pls don't tell Roy</LabelTwo>
                <ButtonContainer>
                    <RectButtonBig
                        width="100%"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        Now go back!
                    </RectButtonBig>
                </ButtonContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(GroupDetail);