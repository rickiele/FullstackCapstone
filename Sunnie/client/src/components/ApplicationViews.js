import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../Login";
import Register from "../Register";
import Hello from "./Hello";

import { QuizList } from "./quiz/QuizList";
import { UserProfileDetails } from "./userProfiles/UserProfileDetails";
import { CommunityList } from "./community/CommunityList";
import { UpdateProduct } from "./products/UpdateProduct";
import { Home } from "./home/Home";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/quiz">
                    {isLoggedIn ? <QuizList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/community">
                    {isLoggedIn ? <CommunityList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/userProfiles/detail/getById/:userProfileId(\d+)">
                    {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/product/update/:id(\d+)">
                    {isLoggedIn ? <UpdateProduct /> : <Redirect to="/login" />}
                </Route>


            </Switch>
        </main >
    );
};