import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import ProfileAttribute from '../../views/ProfileAttribute';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Profile from "../../views/Profile";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

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
  width: 100%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  margin-left:25px;
`;

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            token: null
        };
    }

    toDashboard() {
        this.props.history.push('/game');
    }

    toEdit(){
        this.props.history.push({
            pathname: `${this.props.base}/edit`,
            state: {
                user: this.state.user,
                base: "/game/userProfile"
            }
    })}

    async componentDidMount() {
        try {
            const response = await api.get(`/users/${this.props.location.state.user.id}`);

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ user: response.data });
            this.setState({token: response.data.token});

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <Title>Profile</Title>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <div>
                        <FormContainer>
                            <Form>
                                <Profile user={this.state.user}/>
                                <p></p>
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.toDashboard();
                                    }}
                                >
                                    Go back
                                </Button>
                                <p></p>
                                {this.state.token === localStorage.getItem("token") ? (
                                    <Button
                                        width="100%"
                                        onClick={() => {
                                            this.toEdit();
                                        }}
                                    >
                                        Edit
                                    </Button>
                                ):(
                                    <p></p>
                                )}
                            </Form>
                        </FormContainer>

                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserProfile);
