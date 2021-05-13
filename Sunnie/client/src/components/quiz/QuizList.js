import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Container, Button } from "react-bootstrap";

export const QuizList = () => {
    const { userProfiles, getUserProfileById, updateUserProfile } = useContext(UserProfileContext);
    const [userProfile, setUserProfile] = useState([]);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    // Quiz array
    const questions = [
        {
            categoryText: "Eye Color",
            questionText: "What is your natural eye color?",
            answerOptions: [
                { answerText: "Light blue, light gray or light green", weight: 0 },
                { answerText: "Blue, gray or green", weight: 1 },
                { answerText: "Hazel or light brown", weight: 2 },
                { answerText: "Dark brown", weight: 3 },
                { answerText: "Brownish black", weight: 4 },
            ]
        },
        {
            categoryText: "Hair Color",
            questionText: "What is your natural hair color?",
            answerOptions: [
                { answerText: "Red or light blonde", weight: 0 },
                { answerText: "Blonde", weight: 1 },
                { answerText: "Dark blonde or light brown", weight: 2 },
                { answerText: "Dark brown", weight: 3 },
                { answerText: "Black", weight: 4 },
            ]
        },
        {
            categoryText: "Skin Color",
            questionText: "What is your natural skin color?",
            answerOptions: [
                { answerText: "Ivory white", weight: 0 },
                { answerText: "Fair or pale", weight: 1 },
                { answerText: "Fair to beige, with golden undertone", weight: 2 },
                { answerText: "Olive or light brown", weight: 3 },
                { answerText: "Dark brown or black", weight: 4 },
            ]
        },
        {
            categoryText: "Freckles",
            questionText: "How many freckles do you have on unexposed areas of your skin?",
            answerOptions: [
                { answerText: "Many", weight: 0 },
                { answerText: "Several", weight: 1 },
                { answerText: "Few", weight: 2 },
                { answerText: "Very few", weight: 3 },
                { answerText: "None", weight: 4 },
            ],
        },
        {
            categoryText: "Skin Response",
            questionText: "How does your skin respond to the sun?",
            answerOptions: [
                { answerText: "Always burns, blisters and peels", weight: 0 },
                { answerText: "Often burns, blisters and peels", weight: 1 },
                { answerText: "Burns moderately", weight: 2 },
                { answerText: "Burns rarely, if at all", weight: 3 },
                { answerText: "Never burns", weight: 4 },
            ]
        },
        {
            categoryText: "Skin Response",
            questionText: "Does your skin tan?",
            answerOptions: [
                { answerText: "Never, I always burn", weight: 0 },
                { answerText: "Rarely", weight: 1 },
                { answerText: "Sometimes", weight: 2 },
                { answerText: "Often", weight: 3 },
                { answerText: "Always", weight: 4 },
            ]
        },
        {
            categoryText: "Tan",
            questionText: "How deeply do you tan?",
            answerOptions: [
                { answerText: "Not at all, or very little", weight: 0 },
                { answerText: "Lightly", weight: 1 },
                { answerText: "Moderately", weight: 2 },
                { answerText: "Deeply", weight: 3 },
                { answerText: "My skin is naturally dark", weight: 4 },
            ]
        },
        {
            categoryText: "Sun Sensitivity",
            questionText: "How sensitive is your face to the sun?",
            answerOptions: [
                { answerText: "Very sensitive", weight: 0 },
                { answerText: "Sensitive", weight: 1 },
                { answerText: "Normal", weight: 2 },
                { answerText: "Resistant", weight: 3 },
                { answerText: "Very resistant/Never had a problem", weight: 4 },
            ]
        }
    ]

    // Update skin type based on the user's score
    const updateUserSkinType = () => {
        if (score >= 0 && score <= 6) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 1,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    createDateTime: currentUser.createDateTime,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
        }
        else if (score >= 7 && score <= 12) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 2,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    createDateTime: currentUser.createDateTime,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
        }
        else if (score >= 13 && score <= 18) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 3,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    createDateTime: currentUser.createDateTime,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
        }
        else if (score >= 19 && score <= 24) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 4,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    createDateTime: currentUser.createDateTime,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
        }
        else if (score >= 25 && score <= 30) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 5,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    createDateTime: currentUser.createDateTime,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
            console.log("5")
        }
        else if (score >= 31 && score <= 32) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 6,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    createDateTime: currentUser.createDateTime,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
            console.log("6")
        } else {
            console.log("nahh")
        }
    }

    // Get the user's profile
    // useEffect(() => {
    //     getUserProfileById(currentUser.id)
    // }, []);


    // Quiz states
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [weight, setWeight] = useState(0);

    // Answer clicks
    const handleAnswerClick = (weight) => {
        if (weight) {
            setScore(score + weight)
        }
        const nextQuestion = currentQuestion + 1;
        const nextCategory = currentCategory + 1;

        if (nextQuestion < questions.length && nextCategory < questions.length) {
            setCurrentQuestion(nextQuestion);
            setCurrentCategory(nextCategory);
        } else {
            console.log(score, "score")
            console.log(weight, "weight")
            console.log(score + weight, "total")
            // setShowScore(true);
            updateUserSkinType();
            console.log(userProfile, "Quiz taken")
            history.push("/")

        }
    };

    // End of quiz button
    const history = useHistory();
    const toHome = () => {
        history.push("/")
    }
    // console.log(currentUser, "currentUser")

    // JSX to show the Quiz
    return (
        <Container className='container app'>
            {showScore ? (
                <div className='score-section'>
                    {/* {currentUser.skinType.typeDescription ?
                        <>
                            <h1>You are {currentUser.skinType.typeDescription}.</h1>
                            <Button onClick={toHome}>Get started!</Button>
                        </> :
                        null
                    } */}
                    {/* <Button onClick={toHome}>Get started!</Button> */}

                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div>
                            <h2>{questions[currentCategory].categoryText}</h2>
                        </div>
                        <div className='question-text'>
                            <h1>{questions[currentQuestion].questionText}</h1>
                        </div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <Button id="button" className="answer" onClick={() => handleAnswerClick(answerOption.weight)}>{answerOption.answerText}</Button>
                        ))}
                    </div>
                    <div className='question-count'>
                        <h2>{currentQuestion + 1}/{questions.length}</h2>
                    </div>
                </>
            )}
        </Container>

    );
};
