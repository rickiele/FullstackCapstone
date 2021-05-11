import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [bio, setBio] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // Cloudinary use states
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sunnie');
        setLoading(true);

        // Fetch the upload
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/sunnie-image/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json();

        // Set the upload to false once the response comes back
        setImage(file.secure_url)
        setLoading(false);
    }


    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                firstName,
                lastName,
                age,
                imageLocation: image,
                email
            };
            register(userProfile, password)
                .then(() => history.push("/quiz"));
        }
    };

    return (
        <Container className="container">
            <Form>
                <fieldset>
                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                </fieldset>
                <fieldset>
                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                </fieldset>
                <fieldset>
                    <Form.Label htmlFor="age">Age</Form.Label>
                    <Form.Control id="age" type="text" onChange={e => setAge(e.target.value)} />
                </fieldset>
                <fieldset>
                    <Form.Label for="email">Email</Form.Label>
                    <Form.Control id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </fieldset>
                <fieldset>
                    <Form.Label htmlFor="imageLocation">Upload a profile image</Form.Label>
                    <Form.Control type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />
                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={image} style={{ width: '300px' }} />
                    )}
                </fieldset>
                {/* <fieldset>
                    <Form.Label for="bio">Bio</Form.Label>
                    <Form.Control id="bio" as="textarea" onChange={e => setBio(e.target.value)} />
                </fieldset> */}
                <fieldset>
                    <Form.Label for="password">Password</Form.Label>
                    <Form.Control id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </fieldset>
                <fieldset>
                    <Form.Label for="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </fieldset>
                <Button onClick={registerClick}>Register</Button>
            </Form>
        </Container>
    );
}