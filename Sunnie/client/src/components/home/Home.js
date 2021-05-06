import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const Home = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const currentDateTime = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    console.log(currentDateTime, "current date time ");

    // function successFunction(position) {
    //     var lat = position.coords.latitude;
    //     var long = position.coords.longitude;
    //     console.log('Your latitude is :' + lat + ' and longitude is ' + long);
    // }

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(successFunction);
    // } else {
    //     alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    // }


    // function success(pos) {
    //     var crd = pos.coords;

    //     console.log(`Latitude : ${crd.latitude}`);
    //     console.log(`Longitude: ${crd.longitude}`);
    // }

    // function error(err) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    // navigator.geolocation.getCurrentPosition(success, error);

    // const currentLatitude = 1;
    // const currentLongitude = 2;

    const [location, setLocation] = useState();

    const successCallback = (position) => {
        setLocation(position)
        console.log(location, "location")
    };

    const errorCallback = (error) => {
        console.error(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

    let lat = navigator.geolocation.geolocationCoordinatesinstance

    console.log(location, "outside")

    useEffect(() => {
        getUserProfileById(currentUser.id);
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