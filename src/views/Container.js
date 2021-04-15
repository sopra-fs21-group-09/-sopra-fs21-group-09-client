import React, {Component} from "react";
import styled from "styled-components";
import {HomeContainer} from "./layout";
import {CircleButton, RectangleButton, RectButton, RoundButton} from "./Button";
import "./design/styleSheet.css"

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

//TASK
export const TaskContainer = styled.div`
  margin-right: 5px;
`;

export const Task = styled.div`
  margin: 5px 0px 0px 0px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  background: #E5E5E5;
  border: 3px solid #018692;
  border-radius: 45px;
`;

//WEEKDAY
export const WeekdayContainer = styled.div`
  align-items: center;
  height: 100%;
  margin-right: 5px;
  padding: 5px 5px 0px 5px;
  background: #FEFEFE;
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
                <WeekDayLabel>Monday</WeekDayLabel>
            </WeekdayContainer>
        )
    }
}

//CALENDAR ENTRY
export const CalendarEntryContainer = styled.div`
  &:hover {
    transform: translateY(-2px);
    background: #EB8769;
  }
  margin: 6px 0;
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: #E86539; 
`;

export const CalendarEntryTitle = styled.label`
  margin: 6px 0;
`;

export const CalendarEntryDescription = styled.label`
  margin: 6px 0;
  font-size: 10px;
`;

export class CalendarEntry extends Component {
    render() {
        return (<CalendarEntryContainer>
                <CalendarEntryTitle>Title</CalendarEntryTitle>
                <CalendarEntryDescription>Description</CalendarEntryDescription>
            </CalendarEntryContainer>
        )
    }
}

export const CalendarContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  height: 80%;
  display: flex;
  justify-content : space-around;
`;

export class Calendar extends Component {
    render() {
        return (<CalendarContainer>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                    <Weekday>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                        <CalendarEntry></CalendarEntry>
                    </Weekday>
                </CalendarContainer>
        )
    }
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