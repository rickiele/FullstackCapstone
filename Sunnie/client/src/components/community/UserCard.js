import React from "react"
import { Link } from "react-router-dom"


export const UserCard = ({ userProfile }) => {

    return (
        <section className="userProfile">
            <h3 className="userProfileTitle">
                <Link to={`/userProfiles/detail/getById/${userProfile.id}`}>
                    {userProfile.displayName}
                </Link>
            </h3>
        </section>
    )
}