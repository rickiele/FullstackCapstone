import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { Card, Modal, Row, Col } from "react-bootstrap"

export const UserProfileDetails = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext)
    const [userProfile, setUserProfile] = useState({ userProfile: {} })
    const { userProfileId } = useParams()

    useEffect(() => {
        getUserProfileById(userProfileId)
            .then((response) => {
                setUserProfile(response)
            })
    }, [])




    console.log(userProfile)
    return (
        <section>
            <Row>
                <Col>
                    <Card className="userDetails">
                        <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                    </Card>
                </Col>
                <Col>
                </Col>
            </Row>
        </section>

    )
}
