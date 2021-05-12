import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const UserCard = ({ userProfile }) => {

    // JSX for the UserCard
    return (
        <section className="userProfile">
            <h3 className="userProfileTitle">
                <Card>
                    <img className="userProfilePicture" src={userProfile.imageLocation} />
                    <Link to={`/userProfiles/detail/getById/${userProfile.id}`}>
                        <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    </Link>
                    <h3>{userProfile.skinType.typeDescription}</h3>
                </Card>
            </h3>
        </section>
    )
}