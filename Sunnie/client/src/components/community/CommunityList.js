import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserCard } from "./UserCard";

export const CommunityList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUserProfiles();
    }, []);

    console.log(userProfiles, "hello??")
    return (
        <div className="userProfiles">
            <h3>User Profiles</h3>
            {
                userProfiles.map(userProfile => {
                    return <UserCard key={userProfile.id} userProfile={userProfile} />
                })
            }
        </div>
    );
}