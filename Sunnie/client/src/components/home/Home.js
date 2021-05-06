import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { OpenUVContext } from "../../providers/OpenUVProvider";
import { Card, Row, Col } from "react-bootstrap";

export const Home = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext);
    const { uvLevel, getTheCurrentUVLevel } = useContext(OpenUVContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const successCallback = (position) => {
        const currentDateTime = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

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
    console.log(userSkinType, "userSkinType")
    console.log(uvLevel.result, "result")

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