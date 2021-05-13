import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Container } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Container className="container">
            <Form className="form">
                <h1>Login</h1>
                <div className="fieldset">
                    <Form.Label for="email">Email</Form.Label>
                    <Form.Control id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="fieldset">
                    <Form.Label for="password">Password</Form.Label>
                    <Form.Control id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="fieldset">
                    <Button id="button" onClick={loginSubmit}>Login</Button>
                </div>
                <div className="fieldset">
                    <em>
                        Not registered? <Link style={{ color: 'red' }} to="register">Register</Link>
                    </em>
                </div>
            </Form>
        </Container>
    );
}