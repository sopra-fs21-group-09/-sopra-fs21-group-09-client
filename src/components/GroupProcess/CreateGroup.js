import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {CircleButton, RectButtonBig, RectButtonSmall} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {NavBar} from "../navigation/navBar";
import User from "../profile/User";
import {Group} from "../group/Group";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 550px;
  padding-left: 15px;
  border: none;
  margin-bottom: 20px;
`;

const FirstLine = styled.div`
  margin-bottom: 2%;
  height: 20%;
  display: flex;
  align-items: center;
`;

const NextLine = styled.div`
  margin-bottom: 2%;
  height: 30%;
`;

const InLine = styled.div`
  height: 15%;
  display: flex;
  margin-bottom: 1px;
  align-items: center;
`;

const Label = styled.label`
  text-transform: uppercase;
  color: ${Colors.COLOR14};
  font-size: 28px;
  margin-bottom: 2%;
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  &::placeholder {
    color: #4F4F4F;
  }
  height: 35px;
  width: 30%;
  padding-left: 15px;
  margin-top: -2%;
  margin-left: 7%;
  margin-right: 7%;
  border: none;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const InputFieldRadio = styled.input`
  &::placeholder {
    color: #4F4F4F;
  }
  height: 35px;
  width: 30%;
  padding-left: 15px;
  margin-left: 7%;
  margin-right: 7%;
  border: none;
  background: white;
  border-radius: 20px;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -5%;
  margin-top: 2%;
  width: 100%;
`;

class CreateGroup extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async createGroup() {
        try {
            const requestBody = JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                open: this.state.open,
                memberLimit: this.state.memberLimit
            });
            const response = await api.post('/groups', requestBody);
            // Get the returned user and update a new object.
            const group = new Group(response.data);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/moduleDetail`);
        } catch (error) {
            alert(`Something went wrong during group creation: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    setPrivacy(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>Create a new group</PageTitle>
                <BigContainer>
                    <FirstLine>
                        <Label>Name:</Label>
                        <InputField
                            placeholder="Enter group name..."
                            onChange={e => {
                                this.handleInputChange('name', e.target.value);
                            }}
                        />
                    </FirstLine>
                    <NextLine>
                        <Label>Settings</Label>
                        <div onChange={this.setPrivacy.bind(this)} style={{fontSize:25}}>
                            <InLine>
                                <input type="radio" value="True" name="privacy" id="private" style={{height: 25, width: 25}} /> Private:
                                <InputFieldRadio
                                    type="password"
                                    style={{fontSize: 17}}
                                    placeholder="Enter password..."
                                    disabled
                                    id="privacy"
                                    onChange={e => {
                                        this.handleInputChange('password', e.target.value);
                                    }}
                                />
                            </InLine>
                            <InLine>
                                <input type="radio" value="False" name="privacy" style={{height: 25, width: 25}}/> Public
                            </InLine>
                        </div>
                    </NextLine>
                    <NextLine>
                        <Label>Limitations</Label>
                        <div onChange={this.setPrivacy.bind(this)} style={{fontSize:25}}>
                            <InLine>
                                <input type="radio" value="Zero" name="limitation" style={{height: 25, width: 25}} /> Limited Group Size:
                                <InputFieldRadio
                                    type="password"
                                    style={{fontSize: 17, width: 120}}
                                    placeholder="Enter Size..."
                                    disabled
                                    onChange={e => {
                                        this.handleInputChange('memberLimit', e.target.value);
                                    }}
                                />
                            </InLine>
                            <InLine>
                                <input type="radio" value="False" name="limitation" style={{height: 25, width: 25}}/> Unlimited
                            </InLine>
                        </div>
                    </NextLine>
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {
                                this.createGroup();
                            }}
                        >
                            Create
                        </RectButtonBig>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {
                                this.props.history.push('/joinModuleGroup');
                            }}
                        >
                            Back
                        </RectButtonBig>
                    </ButtonContainer>
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(CreateGroup);