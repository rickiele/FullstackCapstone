import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserCard } from "./UserCard";
import { Container, Button, Dropdown } from "react-bootstrap"

export const CommunityList = () => {

    // UseContext 
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    // Get all the user profiles
    useEffect(() => {
        getAllUserProfiles();
    }, []);

    // Filter by skin type
    // const filterBySkinType1 = userProfiles.filter(userProfile => userProfile.skinTypeId === 1)
    // console.log(filterBySkinType1, "skintype1")

    // JSX for the Community page
    return userProfiles ? (
        <Container className="container">
            <h1>Community</h1>
            <p>Check out how other users protect themselves from the sun.</p>
            {/* Downdrop filter */}
            {/* <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Filter by
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={filterBySkinType1}>Skin Type</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}
            <div className="community-cardList">
                {
                    userProfiles.filter(userProfile => userProfile.id != currentUser.id).map(userProfile => (
                        <UserCard key={userProfile.id} userProfile={userProfile} />
                    ))}
            </div>
        </Container>
    ) : null
}

