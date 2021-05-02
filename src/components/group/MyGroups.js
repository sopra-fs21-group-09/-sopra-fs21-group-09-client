import React from "react";
import {RectButtonBig, SmallCircleButton} from "../../views/Button";
import ShadowScrollbars from "../../views/design/Scrollbars";
import styled from "styled-components";
import {Colors} from "../../views/design/Colors";
import {BaseContainer} from "../../views/Layout";
import {NavBar} from "../navigation/navBar";
import {PageTitle} from "../../views/Labels";
import {api, handleError} from "../../helpers/api";
import {Spinner} from "../../views/design/Spinner";
import UserGroups from "./UserGroups";
import {withRouter} from "react-router-dom";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  border: none;
  margin: 60px 10px;  
  width: 100%;
  border: none;
`;

const ScrollContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 150px);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  width: 100%;
  border: none;
`;


class MyGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            groups: null,
        };
    }

    async componentDidMount(){
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        try {
            let usersGroups = null;

            usersGroups = await api.get(`/users/${localStorage.getItem('id')}/groups`);

            this.setState({
                groups: usersGroups.data,
                loading: false
            });

        } catch (error) {
            alert(`Something went wrong while getting your groups: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>My GROUPS</PageTitle>
                {!this.state.groups ? (
                    <Spinner />
                ) : (
                    <BigContainer>
                        <ShadowScrollbars style={{height: 500}}>
                            <ScrollContainer>
                                {this.state.groups.map(group => {
                                    return (
                                        <UserGroups userGroup={group}/>
                                    );
                                })}
                                <SmallCircleButton
                                    onClick={() => {
                                        this.props.history.push('/joinAppGroup')
                                    }}>
                                        <span style={{fontSize: 25}}>
                                            <i className="fas fa-plus"></i>
                                        </span>
                                </SmallCircleButton>
                            </ScrollContainer>
                        </ShadowScrollbars>
                    </BigContainer>
                )}
            </BaseContainer>
        )
    }
}

export default withRouter(MyGroups);