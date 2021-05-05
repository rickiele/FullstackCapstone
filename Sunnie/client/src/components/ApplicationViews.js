import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../Login";
import Register from "../Register";
import Hello from "./Hello";

import { QuizList } from "./quiz/QuizList";
import { FrecklesProvider } from "../providers/quiz/FrecklesProvider";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/quiz">
                    <FrecklesProvider>
                        <QuizList />
                    </FrecklesProvider>
                </Route>
            </Switch>
        </main>
    );
};