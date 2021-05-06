import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const UserCard = ({ userProfile }) => {

    return (
        <section className="userProfile">
            <h3 className="userProfileTitle">
                <Card>
                    <Link to={`/userProfiles/detail/getById/${userProfile.id}`}>
                        {userProfile.firstName}
                    </Link>
                    {userProfile.skinType.typeDescription}
                </Card>
            </h3>
        </section>
    )
}