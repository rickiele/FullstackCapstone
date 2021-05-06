import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { OpenUVContext } from "../../providers/OpenUVProvider";

export const Home = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext);
    const { getTheCurrentUVLevel } = useContext(OpenUVContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const successCallback = (position) => {
        const currentDateTime = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        getTheCurrentUVLevel(lat, long, currentDateTime);
        console.log(position, "location")
    };

    const errorCallback = (error) => {
        console.error(error);
    }

    useEffect(() => {
        getUserProfileById(currentUser.id);
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);

    return (
        <div className="userProfiles">

            <h1>Welcome back, {currentUser.firstName} {currentUser.lastName}.</h1>
            <div>
                <h1>UV Level here</h1>
            </div>
            <div>
                <h1>Curent exposure time for skin type here</h1>
            </div>
        </div>

    );
}