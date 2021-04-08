import React, {Component} from "react";
import styled from "styled-components";
import {BaseContainer} from "../helpers/layout";
import {CircleButton, RectangleButton, RectButton, RoundButton} from "./Button";
import "./design/styleSheet.css"

export const GroupContainer = styled.div`
  border-radius: 6px;
  align-items: center;
  width: 15%;
  height: 0;
  padding-top: 15%;
  padding-left: 15%;
  border: 1px solid #018692;
  background-color: #018692;
`;

export const TaskContainer = styled.div`
  margin: 6px 0;
  padding: 10px;
  border-radius: 6px;
  align-items: center;
  width: 517px;
  height: 48px;
  left: 113px;
  top: 432px;
  background: #E5E5E5;
  border: 3px solid #018692;
  border-radius: 45px;
  box-sizing: border-box;
`;

export const WeekdayContainer = styled.div`
  align-items: center;
  width: 10%;
  height: 816px; 
  left: 170px;
  top: 47px;
  background: #FEFEFE;
  border-radius: 30px;
`;

export const WeekDayLabel = styled.label`
  margin: 20px 0px 10px 12px;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: grey;
  text-transform: uppercase;
`;

export const CalendarEntryContainer = styled.div`
  margin: 6px 0;
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 6px;
  align-items: center;
  border: 1px solid #ffffff26;
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
                <div className="new_line"/>
                    <CalendarEntryDescription>Description</CalendarEntryDescription>
            </CalendarEntryContainer>
        )
    }
}

export class Weekday extends Component {
    render() {
        return (<WeekdayContainer>
                <WeekDayLabel>Monday</WeekDayLabel>
            </WeekdayContainer>
        )
    }
}