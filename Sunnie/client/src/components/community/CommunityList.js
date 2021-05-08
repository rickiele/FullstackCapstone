import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserCard } from "./UserCard";
import { Container } from "react-bootstrap"

export const CommunityList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUserProfiles();
    }, []);

    //Need to add a filter by skin type
    // Need to not show the current user in the array

    console.log(userProfiles, "hello??")
    return (
        <Container className="container">
            <h1>Community</h1>
            <p>Check out how other users protect themselves from the sun.</p>
            {
                userProfiles.map(userProfile => {
                    return <UserCard key={userProfile.id} userProfile={userProfile} />
                })
            }
        </Container>
    );
}