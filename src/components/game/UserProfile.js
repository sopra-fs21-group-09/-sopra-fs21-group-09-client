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

const ProfileBox = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ProfileBoxContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

    edit(){
        this.props.history.push(`${this.props.base}/edit`);
    }

    async componentDidMount() {
        try {
            const response = await api.get(`/users/${this.props.location.state.user.id}`);
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
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
                <h2>Profile</h2>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <div>
                        <ProfileBox>
                            <Profile user = {this.state.user}/>
                        </ProfileBox>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.toDashboard();
                            }}
                        >
                            Logout
                        </Button>
                        <p></p>
                        {this.state.token === localStorage.getItem("token") ? (
                            <Button
                                width="100%"
                                onClick={() => {
                                    this.edit();
                                }}
                            >
                                Edit
                            </Button>
                            ):(
                            <p></p>
                        )}
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserProfile);
