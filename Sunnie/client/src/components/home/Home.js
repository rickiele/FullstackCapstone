import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { OpenUVContext } from "../../providers/OpenUVProvider";
import { Container, Card, Row } from "react-bootstrap";

export const Home = () => {

    // Use contexts
    const { getUserProfileById } = useContext(UserProfileContext);
    const { uvLevel, getTheCurrentUVLevel } = useContext(OpenUVContext);

    // Get the current logged in user
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const [userProfile, setUserProfile] = useState([]);


    // Function which takes the current position of the user as a params
    const successCallback = (position) => {
        // In case you're not on a browser that supports date.toISOString
        if (!Date.prototype.toISOString) {
            (function () {

                function pad(number) {
                    var r = String(number);
                    if (r.length === 1) {
                        r = '0' + r;
                    }
                    return r;
                }

                Date.prototype.toISOString = function () {
                    return this.getUTCFullYear() +
                        '-' + pad(this.getUTCMonth() + 1) +
                        '-' + pad(this.getUTCDate()) +
                        'T' + pad(this.getUTCHours()) +
                        ':' + pad(this.getUTCMinutes()) +
                        ':' + pad(this.getUTCSeconds()) +
                        '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
                        'Z';
                };

            }());
        }
        const currentDateTime = new Date().toISOString();

        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        console.log(lat, "lat");
        console.log(long, "long");
        console.log(currentDateTime, "date time");

        getTheCurrentUVLevel(lat, long, currentDateTime);
    };

    const errorCallback = (error) => {
        console.error(error);
    }

    // Get the current logged in user 
    // And get the latitude and longitude of where they are at
    useEffect(() => {
        getUserProfileById(currentUser.id)
            .then((response) => {
                setUserProfile(response)
            })
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);

    // Get the user's skin type
    let userSkinType = userProfile.skinTypeId;

    // Round the UV level to the nearest whole number
    let roundedUVLevel = Math.round(uvLevel.result?.uv);

    // Safe exposure time numbers - In case you want to break them down by hour and minutes
    let minutes = uvLevel.result?.safe_exposure_time['st' + userSkinType];
    let hours = minutes / 60;
    console.log(uvLevel, "result")

    // JSX for the Home page view
    return (
        <Container>
            <h1>Hi, {currentUser.firstName}</h1>
            <Row>
                <Card className="UVLevel">
                    <h2>Current UV Level</h2>
                    <h1>{roundedUVLevel}</h1>
                </Card>
                <Card>
                    <h2>Safe Exposure Time</h2>
                    <h1>{uvLevel.result?.safe_exposure_time['st' + userSkinType]} mins</h1>
                </Card>
                <Card>
                    <h2>Take Care</h2>
                    <h1>Precaution One Liner.</h1>
                    <p>Detailed information. Make sure to apply sunscreen today</p>
                </Card>
            </Row>
        </Container >

    );
}