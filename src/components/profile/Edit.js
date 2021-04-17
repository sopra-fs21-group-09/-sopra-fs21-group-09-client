import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { RectButton } from '../../views/Button';
import { withRouter } from 'react-router-dom';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 450px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Titel = styled.label`
  color: white;
  margin-bottom: 30px;
  text-transform: uppercase;
  text-align: center;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true
        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async edit() {
        try {

        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async componentDidMount() {
        try {

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
            return (
                <FormContainer>
                    <Form>
                        <Titel>Hey there! Here you can edit your profile:</Titel>
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here..."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Label>Birthday</Label>
                        <InputField
                            placeholder="Enter here..."
                            onChange={e => {
                                this.handleInputChange('birthDate', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <RectButton
                                width="100%"
                                onClick={() => {
                                    this.edit();
                                }}
                            >
                                Edit
                            </RectButton>
                        </ButtonContainer>
                        <ButtonContainer>
                            <RectButton
                                width="100%"
                                onClick={() => {
                                    this.props.history.push('/profile');
                                }}
                            >
                                Back to Profile
                            </RectButton>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            );
        }

}

export default withRouter(Edit);