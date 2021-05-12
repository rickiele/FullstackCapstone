import React, { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavDropdown,
    Col,
    Row
} from 'react-bootstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Get the current user's ID, use it to render the user's own page
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const loggedInUserProfile = () => {
        if (currentUser) {
            return `/userProfiles/detail/getById/${currentUser.id}`
        }
        else {
            return null
        }
    }

    // JSX to return the header
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Sunnie</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <>
                                <Nav.Item className="nav-bar-link-container">
                                    <Row>
                                        <Col>
                                            <NavLink className="nav-link" to="/">Home</NavLink>
                                            <NavLink className="nav-link" to={loggedInUserProfile}>Profile</NavLink>
                                            <NavLink className="nav-link" to="/quiz">Quiz</NavLink>
                                            <NavLink className="nav-link" to="/community">Community</NavLink>
                                        </Col>
                                    </Row>
                                </Nav.Item>
                            </>
                        }

                        {isLoggedIn &&
                            <>
                                <Nav.Item>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </Nav.Item>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <Nav.Item>
                                    <NavLink to="/login">Login</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to="/register">Register</NavLink>
                                </Nav.Item>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

// <Navbar expand="sm" className="nav-bar-link-container">
// <Navbar.Brand to="/">Sunnie</Navbar.Brand>
// <Navbar.Toggle onClick={toggle} />

// <Nav className="mr-auto">
//     { /* When isLoggedIn === true, we will render the Home link */}
//     {isLoggedIn &&
//         <Nav.Item className="nav-bar-link-container">
//             <NavLink className="nav-link" to="/">Home</NavLink>
//             <NavLink className="nav-link" to={loggedInUserProfile}>Profile</NavLink>
//             <NavLink className="nav-link" to="/quiz">Quiz</NavLink>
//             <NavLink className="nav-link" to="/community">Community</NavLink>
//         </Nav.Item>
//     }
// </Nav>
// <Nav navbar>
//     {isLoggedIn &&
//         <>
//             <Nav.Item>
//                 <a aria-current="page" className="nav-link"
//                     style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
//             </Nav.Item>
//         </>
//     }
//     {!isLoggedIn &&
//         <>
//             <Nav.Item>
//                 <NavLink to="/login">Login</NavLink>
//             </Nav.Item>
//             <Nav.Item>
//                 <NavLink to="/register">Register</NavLink>
//             </Nav.Item>
//         </>
//     }
// </Nav>
// </Navbar>