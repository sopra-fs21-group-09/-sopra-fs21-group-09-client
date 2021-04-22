import React, {Component} from "react";
import styled from "styled-components";
import {HomeContainer} from "./layout";
import {CircleButton, RectangleButton, RectButton, RoundButton} from "./Button";
import "./design/styleSheet.css"
import { COLORS } from "../views/design/colors"

//GROUP
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

export class Group extends Component {
    render() {
        return (<GroupContainer>
                <GroupName>GROUP NAME</GroupName>
            </GroupContainer>
        )
    }
}

//WEEKDAY
export const WeekdayContainer = styled.div`
  align-items: center;
  height: 100%;
  width: 80%;
  margin-right: 5px;
  padding: 5px 5px 0px 5px;
  background: #E5E5E5;
  border-radius: 20px;
  text-align: center;
`;

export const WeekDayLabel = styled.label`
  color: grey;
  text-transform: uppercase;
  vertical-align: middle;
  margin-bottom: 10px;
`;

export class Weekday extends Component {
    render() {
        return (<WeekdayContainer>
                <WeekDayLabel></WeekDayLabel>
            </WeekdayContainer>
        )
    }
}

//CALENDAR ENTRY
export const CalendarEntryContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: ${COLORS.LECTURES};
  }
  position: relative;
  width: 100%;
  height: 80px;
  padding: 10px;
  margin: 5px 0px 5px 0px;
  border-radius: 5px;
  align-items: center;
  color: white;
  background-color: ${COLORS.LECTURES};
`;

export const CalendarEntryTitle = styled.label`
  margin: 6px 0;
`;

export const CalendarDescription = styled.label`
  margin: 6px 0;
  font-size: 10px;
`;

export class CalendarEntry extends Component {
    constructor() {
      super();
      this.state = {
        top: null
      }
    }

    calculatePosy(start, end) {
      return end - start;
    }

    render() {
        return (<CalendarEntryContainer>
                <CalendarEntryTitle>{this.props.title}</CalendarEntryTitle>
                <CalendarDescription>{this.props.description}</CalendarDescription>
            </CalendarEntryContainer>
        )
    }
}

export const CalendarContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  width: 70%;
  height: 85%;
  display: flex;
  justify-content : space-around;
`;

export const DeadlineContainer = styled.div`
  width: 100%;
  height: 10%;
  margin: 5px 0px 5px 0px;
`;

export const Deadline = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: #EB8769;
  }
  width: 100%;
  height: 25px;
  padding: 10px;
  margin: 5px 0px 0px 0px;
  border-radius: 5px;
  float: left;
  display: flex;
  align-items: center;
  background-color: ${COLORS.PRIVATE}; 
`;

export const UpcomingContainer = styled.div`
  height: 50%;
  margin: 0px 10px 10px 10px;
`;

export const Upcoming = styled.div`
  &:hover {
    transform: translateY(-2px);
  }
  width: 100%;
  height: 25px;
  padding: 10px;
  margin: 5px 0px 5px 0px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;
  background-color: ${COLORS.LECTURES}; 
`;

//TASK
export const TasksContainer = styled.div`
  margin: 0px 10px 0px 10px;
  heigth: 50%;
`;

export const TaskContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: ${COLORS.TASK};
    color: white;
  }
  width: 100%;
  padding: 5px 0px 5px 10px;
  margin: 5px 0px 0px 0px;
  border: 3px solid #018692;
  border-radius: 45px;
  display: flex;
  align-items: center;
  background: #E5E5E5;
`;

export const TaskButton = styled.button` 
  &:hover {
    transform: translateY(-0.5px);
    color: white;
    cursor: pointer;
  }
  background-color: white;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 50%;
  margin-right: 10px; 
`;

export const Task = props => {
    const [open, setClosed] = React.useState(true)
    return (<TaskContainer>
        <TaskButton onClick={()=>setClosed(false)}>{/*open ? <i class="fas fa-check"></i> : <i class="fas fa-check"></i>*/}</TaskButton>
        {props.name}
        </TaskContainer>)
}

//LOGO
// Contains the Logo in the registration and login page
export const LogoContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

// Main light grey container for the login and registration page
export const LoginMainContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 2%;
  margin-bottom: 4%;
  background: #E5E5E5;
  margin-left: 30%;
  padding-left: 15px;
  margin-right: 30%;
  padding-right: 15px;
  border-radius: 20px;
`;

// Title of all the pages like Home, Brofile, MyGroups etc.
export const PageTitle = styled.h1`
  color: #4F4F4F;
  font-size: 50px;
  margin-top: -4%;
  margin-bottom: 2%;
  margin-left: 4%;
  text-transform: uppercase;
`;