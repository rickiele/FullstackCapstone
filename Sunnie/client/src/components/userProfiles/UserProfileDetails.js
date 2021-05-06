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
                <Col md={3}>
                    <Card className="userDetails">
                        <h3>Profile pic here</h3>
                        <h3>{userProfile.firstName} {userProfile.lastName}</h3>
                        <h3>Age: {userProfile.age}</h3>
                        <h3>Skin Type {userProfile.skinTypeId}</h3>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <Card>
                            <h3>Favorites</h3>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <h3>Likes</h3>
                            <p>populate top 3 liked here</p>
                        </Card>
                        <Card>
                            <h3>Dislikes</h3>
                            <p>populate  top 3 disliked here</p>
                        </Card>
                    </Row>
                </Col>
            </Row>
        </section>

    )
}
