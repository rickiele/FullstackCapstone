import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
    const apiUrl = "/api/userprofile";

    const userProfile = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

    const [userProfiles, setUserProfiles] = useState([])

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) => saveUser({ ...userProfile, firebaseId: createResponse.user.uid }))
            .then((savedUserProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
                setIsLoggedIn(true);
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                console.log("testing", resp)
                return resp.json()
            }));
    };

    const getUserProfileById = (userProfileId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getById/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json()))
    }

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            }).then(resp => resp.json()));
    };

    const getAllUserProfiles = () => {
        return getToken().then((token) =>

            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setUserProfiles))
    };

    const updateUserProfile = (userProfile) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${userProfile.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile),
            }));
    // .then(getUserProfileById(userProfile.id)));

    return (
        <UserProfileContext.Provider value={{ userProfiles, isLoggedIn, login, logout, register, getToken, getUserProfile, getAllUserProfiles, getUserProfileById, updateUserProfile }}>
            {props.children}
        </UserProfileContext.Provider>
    );
}