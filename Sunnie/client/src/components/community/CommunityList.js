import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserCard } from "./UserCard";

export const CommunityList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

    useEffect(() => {
        console.log("UserList: useEffect - getUsers")
        getAllUserProfiles();
    }, []);

    return (
        <div className="userProfiles">
            {console.log("UserList: Render", userProfiles)}
            <h3>User Profiles</h3>
            {
                userProfiles.map(userProfile => {
                    return <UserCard key={userProfile.id} userProfile={userProfile} />
                })
            }
        </div>
    );
}