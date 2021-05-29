import { motion } from "framer-motion";
import React from "react";
import { useState} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { MenuToggle } from "./menuToggle";
import { NavMenu } from "./navMenu";
import {IntroButton} from "../../views/Button";
import "../../views/design/StyleSheet.css"
import Rodal from "rodal";
import {BlueLabel} from "../../views/Labels";
import ShadowScrollbars from "../../views/design/Scrollbars";

const HamburgerMenuContainer = styled.div`
  display: flex;
  position: fixed;
  top: 3%;
  left: 3%; 
  z-index: 99;
`;

/*change size here*/
const MenuContainer = styled(motion.div)`
  min-width: 300px;
  width: 10%;
  max-width: 44%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 2px rgba(15, 15, 15, 0.3);
  z-index: 90;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(4em);
  user-select: none;
  padding: 1.5em 2em;
`;

const BottomContainer = styled.div`
  display: inline-block;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1.5em 2em;
`;


const BottomButton = styled(motion.button)`
  border: 0;
  background: transparent;
  color: #555;
  font-size: 14px;
  font-weight: 900;
  transition: all 250ms ease-in-out;
  display: flex;
  cursor: pointer;
  padding-left: 15px;
  padding-top: 14px;
  padding-bottom: 15px;
 

  &:hover {
    color: #666;
  }

  &:focus {
    outline: none;
  }
`;
/* to display a line in between
&:not(:last-of-type) {
    border-left: 1px solid #b4b4b4;
  }*/

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5em;
`;

/*change percentage for size*/
const menuVariants = {
  open: {
    transform: "translateX(-3%)",
  },
  closed: {
    transform: "translateX(-103%)",
  },
};

const menuTransition = {
  type: "spring",
  duration: 1,
  stiffness: 33,
  delay: 0.1,
};

const commonVariants = {
  show: {
    transform: "translateX(0em)",
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.01,
    },
  },
  hide: {
    transform: "translateX(5em)",
    opacity: 0,
  },
};

const commonTransition = { type: "spring", duration: 0.05 };

export function HamburgerMenu() {
  const [isOpen, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const history = useHistory();

  return (
    <HamburgerMenuContainer>
      <MenuToggle toggle={toggleMenu} isOpen={isOpen}/>
      <MenuContainer
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={menuTransition}
      >
        <ContentContainer>
          <NavMenu isOpen={isOpen} />
        </ContentContainer>
        <BottomContainer>
          <IntroButton
              onClick={() =>
                setIntro(true)
              }
              initial={false}
              animate={isOpen ? "show" : "hide"}
              variants={commonVariants}
              transition={commonTransition}
          ><i className="fas fa-question"/>
          </IntroButton>
          {/*Intro Overlay*/}
          <Rodal height={350} customStyles={{borderRadius: '20px', marginLeft: '400px'}} visible={intro} closeOnEsc={true}
                 onClose={() => setIntro(false)}>
            <BlueLabel  style={{color: 'orange'}}>Welcome to Brolat</BlueLabel>
            <ShadowScrollbars style={{height: 250}}>
              <h3>Thank you for using our website!</h3>
              <p>You are currently having a look at your personal Home Screen. Here you can find a calendar,
                where all your tasks, meetings, lectures and more will be displayed.</p>
              <p> On the right you can see two sections.
                Calendar entries that are due very closely will be displayed in "Upcoming". And all your tasks that you set for yourself
                are being shown to you in "To-Do", where you can also mark them as done.</p>
              <h4>Please check out the menu on the left where you can find many more functions!</h4>
              <p>Visit "Modules", to join the modules you are attending and create or join study groups inside that module.
                All the corresponding lectures and meetings will be automatically displayed in your calendar as well.</p>
              <p>Looking for a study group? <br/>Create or join one via "Groups" and share tasks as well
                as a text editor.</p>
              <p>Got some personal tasks to do? <br/>Set them in "Tasks" and they will be added to your To-Do List.</p>
              <h3>Have fun studying with Brolat!</h3>
            </ShadowScrollbars>
          </Rodal>
          <BottomButton
              onClick={() => history.push('/profile')}
              initial={false}
              animate={isOpen ? "show" : "hide"}
              variants={commonVariants}
              transition={commonTransition}
          >
            BROFILE
          </BottomButton>
          <BottomButton
              onClick={() =>
                {history.push('/login');
                  sessionStorage.clear();}
              }
              initial={false}
              animate={isOpen ? "show" : "hide"}
              variants={commonVariants}
              transition={commonTransition}
          >
            LOGOUT
          </BottomButton>
        </BottomContainer>
      </MenuContainer>
    </HamburgerMenuContainer>
  );
}
