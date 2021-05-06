import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../Login";
import Register from "../Register";
import Hello from "./Hello";

import { QuizList } from "./quiz/QuizList";
import { SkinTypeProvider } from "../providers/SkinTypeProvider";
import { CommunityList } from "./community/CommunityList";
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
                    <QuizList />
                </Route>

                <Route path="/community">
                    <CommunityList />
                </Route>
            </Switch>
        </main>
    );
};