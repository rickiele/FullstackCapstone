import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button } from "react-bootstrap";

export const QuizList = () => {

    const questions = [
        {
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


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const { userProfiles, getUserProfileById, updateUserProfile } = useContext(UserProfileContext);
    const [userProfile, setUserProfile] = useState([]);
    // after the user takes the quiz
    // get the current user
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    // We will need to update the user
    // We will need to get the skin type ranges from the server side 
    // Does this score match any of the skinType user ranges?
    // Find the skintype where the score is between the minimum

    const userSkinType = () => {
        if (score >= 0 && score <= 6) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 1,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation
                })
        }
        else if (score >= 7 && score <= 13) {
            updateUserProfile(
                {
                    id: currentUser.id,
                    skinTypeId: 2,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    age: currentUser.age,
                    email: currentUser.email,
                    imageLocation: currentUser.imageLocation

                })
        }
        else {
            console.log("nahh")
        }

    }

    const handleAnswerClick = (weight) => {
        if (weight) {
            setScore(score + weight)
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            userSkinType();
        }
    };

    return (
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score}.
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <Button onClick={() => handleAnswerClick(answerOption.weight)}>{answerOption.answerText}</Button>
                        ))}
                    </div>
                </>
            )}
        </div>

    );
};
