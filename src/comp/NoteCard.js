import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import firebase from "../util/firebase.js";



function NoteCard({ allNotes }) {


    const deleteNoteFunc = () => {
        const noteRef = firebase.database().ref("Notes").child(allNotes.i)
        noteRef.remove();




















    }


    return (
        <div className="noteCardStyle" >

            <Row xs={1} md={2} lg={4} className="g-4 m-3">
                {allNotes ? allNotes.map((value, index) => (
                    <Col key={index} >
                        <Card style={{ backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >

                            <Card.Body>
                                <Card.Title>{value.formTitle}</Card.Title>
                                <Card.Text>
                                    {value.formText}
                                </Card.Text>
                                <Button variant="danger" onClick={deleteNoteFunc} >Delete</Button>
                                <Button variant="primary">Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : ""}
            </Row>
        </div>
    )
}

export default NoteCard
