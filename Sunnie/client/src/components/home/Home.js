import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { OpenUVContext } from "../../providers/OpenUVProvider";
import { Container, Card, Row, Col } from "react-bootstrap";

export const Home = () => {

    const { getUserProfileById } = useContext(UserProfileContext);
    const { uvLevel, getTheCurrentUVLevel } = useContext(OpenUVContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

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

    useEffect(() => {
        getUserProfileById(currentUser.id);
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);


    let userSkinType = currentUser.skinTypeId;
    let roundedUVLevel = Math.round(uvLevel.result?.uv);
    console.log(uvLevel, "result")

    return (
        <Container>
            <h2>Welcome back, {currentUser.firstName}</h2>
            <Row>
                <Card>
                    <h2>Current UV Level</h2>
                    <h1>{roundedUVLevel}</h1>
                </Card>
                <Card>
                    <h2>Safe Exposure Time</h2>
                    <h1>{uvLevel.result?.safe_exposure_time['st' + userSkinType]} mins</h1>
                </Card>
            </Row>
        </Container>

    );
}