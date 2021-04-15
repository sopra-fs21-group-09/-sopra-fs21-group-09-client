import React, {Component} from "react"
import './NavBar.css'
import {CircleButton} from "../../views/Button";
import HamburgerMenu from "../../views/HamburgerMenu";

const MenuItems = [
    {
        title: '',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Home',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Services',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Products',
        url: '#',
        cName: 'nav-links-mobile'
    }
]


class NavBar extends Component{
    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <div className="menu-icon" onClick={this.handleClick}>
                    <i class={this.state.clicked ? 'fas fa-times fa-2x': 'fas fa-bars fa-2x'}></i>
                </div>
                    <ul className={this.state.clicked ? 'nav-menu-active' : 'nav-menu'}>
                        {MenuItems.map((item, index)=>{
                            return (
                                <li key={index}>
                                    <a className={MenuItems.cName} href={item.url}>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })}

                    </ul>
            </nav>
        )
    }
}

export default NavBar;