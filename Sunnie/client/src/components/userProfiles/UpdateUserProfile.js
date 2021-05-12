import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { ProductContext } from "../../providers/ProductProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const UpdateUserProfile = ({ userProfile }) => {
    const { updateUserProfile, getUserProfileById } = useContext(UserProfileContext);

    // Get user ID from URL
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userProfileId } = useParams();

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

    // Modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Set user profile state
    const [aUserProfile, setUserProfile] = useState({
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        createDateTime: userProfile.createDateTime,
        age: userProfile.age,
        imageLocation: image,
        skinTypeId: userProfile.skinTypeId,
        email: userProfile.email
    })

    // Save the user input
    const handleInput = (e) => {
        const newUserProfile = { ...aUserProfile }

        newUserProfile[e.target.id] = e.target.value
        setUserProfile(newUserProfile);
        console.log("handle userProfile input")
    }

    useEffect(() => {
        getUserProfileById(currentUser.id)
            .then((response) => {
                setUserProfile(response)
            })
    }, []);

    // // Save the user's updated product
    const handleYesUpdate = () => {
        updateUserProfile(aUserProfile)
            .then(() => getUserProfileById(currentUser.id))
        handleClose()
        console.log(aUserProfile, image, "save user profile")
    };


    // JSX for the product update form
    return (
        <>

            <>
                <Button key={userProfile.id} onClick={handleShow}>
                    Update
                </Button>
            </>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p>Update User Profile</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="imageLocation"><h3>Current Profile Picture</h3></Form.Label>
                    <img src={userProfile.imageLocation} style={{ width: '300px' }} />
                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <>
                            <h3>New Profile Picture</h3>
                            <img src={image} style={{ width: '300px' }} />
                        </>
                    )}
                    <Form.Control type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />

                    <fieldset>
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control id="firstName" type="text" defaultValue={userProfile.firstName} onChange={handleInput} />
                    </fieldset>
                    <fieldset>
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control id="lastName" type="text" defaultValue={userProfile.lastName} onChange={handleInput} />
                    </fieldset>
                    <fieldset>
                        <Form.Label htmlFor="age">Age</Form.Label>
                        <Form.Control id="age" type="text" defaultValue={userProfile.age} onChange={handleInput} />
                    </fieldset>
                    <fieldset>
                        <Form.Label for="email">Email</Form.Label>
                        <Form.Control id="email" type="text" defaultValue={userProfile.email} onChange={handleInput} />
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}> Go Back </Button>
                    <Button onClick={handleYesUpdate}> Save Changes </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}