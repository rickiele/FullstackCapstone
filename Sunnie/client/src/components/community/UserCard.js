import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const UserCard = ({ userProfile }) => {

    // JSX for the UserCard
    return (
        <Link className="community-link" to={`/userProfiles/detail/getById/${userProfile.id}`}>
            <Card className="community-card" style={{ width: '19em' }}>
                <img className="community-userImage" src={userProfile.imageLocation} />
                <h1 className="community-name">{userProfile.firstName} {userProfile.lastName}</h1>
                <h3>{userProfile.skinType.typeDescription}</h3>
            </Card>
        </Link>
    )
}