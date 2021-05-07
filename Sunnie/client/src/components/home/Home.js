import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { OpenUVContext } from "../../providers/OpenUVProvider";
import { Card, Row, Col } from "react-bootstrap";

export const Home = () => {

    const { getUserProfileById } = useContext(UserProfileContext);
    const { uvLevel, getTheCurrentUVLevel } = useContext(OpenUVContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const successCallback = (position) => {
        // const currentDateTime = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        // var now = new Date;
        // var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        //     now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

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

    console.log(uvLevel, "result")

    return (
        <div className="userProfiles">
            <Card>
                <h1>Welcome back, {currentUser.firstName} {currentUser.lastName}.</h1>
                <Row>
                    <Col>
                        <h1>Current UV Level: {uvLevel.result?.uv}</h1>
                    </Col>
                    <Col>
                        <h1>Safe Exposure Time:{uvLevel.result?.safe_exposure_time['st' + userSkinType]} mins</h1>
                    </Col>
                </Row>
            </Card>

        </div>

    );
}