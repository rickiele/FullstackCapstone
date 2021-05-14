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

    // JSX for the Community page
    return userProfiles ? (
        <Container className="community-container">
            <div className="community-list">
                <h1 className="homepage-hello">Community</h1>
                <p>Check out how other users protect themselves from the sun.</p>
            </div>
            <div className="community-cardList">
                {
                    userProfiles.filter(userProfile => userProfile.id != currentUser.id).map(userProfile => (
                        <UserCard key={userProfile.id} userProfile={userProfile} />
                    ))}
            </div>
        </Container>
    ) : null
}

