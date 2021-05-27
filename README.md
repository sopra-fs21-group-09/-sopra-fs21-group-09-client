# SoPra FS21 - BROLAT

## Introduction

Hi there! We are five students from the University of Zurich. As part of the module "Software Computer Engineering Lab" we were instructed to create an application. In order to learn how to implement a server/client-architecture, we had to integrate a collaborative feature as well as to include an external API.  

During the first couple of weeks of our studies, the members of our group recognized, that it is often overwhelming to get a hold of all the deadlines from the different modules we booked. We think all this energy of planning the semester could be simplified. For this reason, we want to build an interactive application, where users can communicate with each other in small groups and handle all their personal or shared tasks in a simple and intuitive way. Information about various modules, tasks you need to work on and collaborations with other students is centralized in one application. A well designed homepage delivers all the information you need to know about the current week lectures, tasks, exercises, deadlines and meetings that are coming up.

## Technologies used
- [React](https://reactjs.org/) for building the interface
- [Styled components](https://styled-components.com/) for visual styling
- [Npm](https://www.npmjs.com/) as package manager
- [Spring](https://spring.io/) to connect to the backend via REST API

## High-level components
- [Calendar](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/blob/main/src/components/home/NpmCal.js): The calendar component is the main feature on the home page. It shows all the user's events as well as tasks that are marked as to be shown in calendar. It communicates with the task component to retrieve the tasks. The main feature is the quick-add tool, which, by dragging on the calendar, creates an event in the corresponding time frame.
- [Modules](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/blob/main/src/components/module/Module.js): The modules component shows all available modules from the University of Zurich. It connects to the course catalog api ([Vorlesungsverzeichnis](https://studentservices.uzh.ch/uzh/anonym/vvz/index.html#)) to fetch all data regarding the modules.
- [Groups](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/blob/main/src/components/group/MyGroups.js): This component is responsible to create groups inside a module and therefore interacts with the module component. It also features one of the main features, a [text editor](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/blob/main/src/components/textEditor/TextEditor.js), which lets users collaborate in a shared document.
- [Tasks](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/blob/main/src/components/task/Tasks.jsx): The task component is the most connected component. It lets the user create tasks. A task can be shown in the calendar if it is of high-importance. Furthermore, modules and groups can have shared tasks which will be distributed among all members. 

## Launch & Deployment
The local development requires node.js v14.16.0 (download latest node version [here](https://nodejs.org/en/download/)). All the other dependencies including react and styled-components are installed with the following command (do this before starting the application for the first time! ):

``npm install``

This command runs the app in development mode on http://localhost:3000.

``npm run dev``

The application is deployed on [heroku](http://sopra-fs21-group-09-client.herokuapp.com/login).

## Illustrations
The following diagrams show the basic architecture of the software as well as some activities which illustrate some key insights on how to use the application.

### Component Diagram
![Kopie von SOPRA Component diagram](https://user-images.githubusercontent.com/71380307/112836531-06012100-909b-11eb-9229-60ce1b352361.png)

### Activity Diagram 
![Kopie von ActivityDiagram (1)](https://user-images.githubusercontent.com/71380307/112837804-9ee46c00-909c-11eb-8e4f-f858eb518e78.png)

## User Interface

### Homepage with calendar
![](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/tree/main/img/ui-homepage.jpg)

### Module page
![](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/tree/main/img/ui-mymodules)

### MyGroups page
![](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/tree/main/img/ui-)

## Group details
![](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/tree/main/img/ui-)

### Tasks page
![](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/tree/main/img/ui-)

### Brofile
![](https://github.com/sopra-fs21-group-09/sopra-fs21-group-09-client/tree/main/img/ui-)

## Roadmap
Some of the features to implement in the future:
- Chat: Users can communicate on the app either in a groupchat inside a module or group or in a private chat whith every user.
- Module searchbar: To date, the course catalog api only fetches a specific part of the modules because otherwise it would get too cluttered ond hard to find a module. A searchbar would help the user find a specific module out of around 3'500 modules provided by the university.
- Further connections between the components:
    - Connect module events shown in the calendar to the corresponding module page
    - Connect tasks on the homepage to taskpage
    - connect events to group such that groups can vreate shared events

## Authors and acknowledgment

### Frontend developers
- [Stefanie Krohman](https://github.com/StefanieKrohmann), BSc People-Oriented Computing, University of Zurich 
- [Jonas Gebel](https://github.com/jnsgbl), BSc People-Oriented Computing,  University of Zurich
- [Samuele Walzer](https://github.com/samuelewalzer), BSc People-Oriented Computing,  University of Zurich

# License
MIT License

Copyright (c) 2021-present [Stefanie Krohmann, Jonas Gebel, Samuele Walzer]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
)