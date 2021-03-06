import React, { useState } from 'react';
import { Button, Card, Col, Row, Modal, Form } from 'react-bootstrap';
import { firebase } from "../util/firebase.js";




function NoteCard({ allNotes }) {

    //Delete Function
    const deleteNoteFunc = (id) => {
        const noteRef = firebase.database().ref("Notes").child(id)
        noteRef.remove();
    }

    // Update Function

    const [editID, setEditID] = useState(null)

    const editFunc = (formTitle, formText, id) => {
        setShow(true);
        setUpdateTitle(formTitle);
        setUpdateText(formText);
        setEditID(id);

    }

    const [updateTitle, setUpdateTitle] = useState("");
    const [updateText, setUpdateText] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    }

    const saveUpdateFunc = () => {
        const noteRef = firebase.database().ref("Notes").child(editID);
        noteRef.update({
            formTitle: updateTitle,
            formText: updateText
        });

        setShow(false);

    }


    const doneFunc = (id, isComplete) => {

        const noteRef = firebase.database().ref("Notes").child(id);
        noteRef.update({
            isComplete: !isComplete   //bir hata var ama ne????
        });



    }


    return (
        <>

            <div className="noteCardStyle modalStyle" >

                <Row xs={1} md={2} lg={4} className="g-4 m-3">

                    {allNotes ? allNotes.map(({ id, formTitle, formText, isComplete }, index) => {

                        return <div key={id} >

                            <Modal show={show} onHide={handleClose}  >
                                <Form  >
                                    <Form.Group className="m-3" controlId="formGroupEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="What is the topic?" value={updateTitle} onChange={(e) => { setUpdateTitle(e.target.value) }} />
                                    </Form.Group>
                                    <Form.Group className="m-3" controlId="formGroupPassword">
                                        <Form.Label>Text </Form.Label>
                                        <Form.Control as="textarea" placeholder="Can you give some details?" value={updateText} onChange={(e) => { setUpdateText(e.target.value) }} />
                                    </Form.Group>

                                </Form>
                                <Modal.Footer>

                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="success" onClick={() => saveUpdateFunc()} >
                                        Save Changes
                                    </Button>

                                </Modal.Footer>

                            </Modal>



                            <Col>
                                <Card className={"cardStyle"} >

                                    <Card.Body>
                                        <Card.Title className={isComplete ? "complete" : ""} >{formTitle} </Card.Title>
                                        <Card.Text className={isComplete ? "complete" : ""} >
                                            {formText}
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => deleteNoteFunc(id)} >Delete</Button>
                                        <Button variant="primary" onClick={() => editFunc(formTitle, formText, id)} >Edit</Button>
                                        <Button variant="success" onClick={() => doneFunc(id, isComplete)} > {isComplete ? "Undone" : "Done"} </Button>
                                    </Card.Body>
                                </Card>
                            </Col></div>
                    }
                    ) : ""}
                </Row>





                {/* */}










            </div>
        </>
    )
}

export default NoteCard
