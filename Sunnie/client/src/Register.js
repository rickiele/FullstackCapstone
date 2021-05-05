import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, displayName, imageLocation, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="displayName">Display Name</Form.Label>
                    <Form.Control id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label for="email">Email</Form.Label>
                    <Form.Control id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="imageLocation">Profile Image URL</Form.Label>
                    <Form.Control id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label for="password">Password</Form.Label>
                    <Form.Control id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label for="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
