import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserCard } from "./UserCard";
import { Container } from "react-bootstrap"

export const CommunityList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));


    useEffect(() => {
        getAllUserProfiles();
    }, []);

    // {
    //     userProfiles.filter(userProfile => currentUser.id =)
    //         return <ProductCard key={product.id} product={product} />
    //     })
    // }

    const filterCommunity = userProfiles.filter(userProfile => userProfile.id != currentUser.id)

    //Need to add a filter by skin type
    // Need to not show the current user in the array

    console.log(filterCommunity, "oink??")
    return (
        <Container className="container">
            <h1>Community</h1>
            <p>Check out how other users protect themselves from the sun.</p>
            {
                userProfiles.filter(userProfile => userProfile.id != currentUser.id).map(userProfile => (
                    <UserCard key={userProfile.id} userProfile={userProfile} />
                ))}

        </Container>
    );
}

