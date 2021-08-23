import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';




function Header({ addANoteFunc, formTitle, setFormTitle, formText, setFormText }) {


    return (
        <div style={{ marginBottom: "50px", borderBottom: "2px solid black", paddingBottom: "20px", backgroundColor: "silver" }} >
            <h1>Add a Note</h1>
            <Form onSubmit={addANoteFunc} >
                <Form.Group className="m-3" controlId="formGroupEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="What is the topic?" value={formTitle} onChange={(e) => { setFormTitle(e.target.value) }} />
                </Form.Group>
                <Form.Group className="m-3" controlId="formGroupPassword">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" placeholder="Can you give some details?" value={formText} onChange={(e) => { setFormText(e.target.value) }} />
                </Form.Group>
                <Button variant="success" type="submit" > <FaPlusCircle style={{ fontSize: "50px" }} /></Button>
            </Form>










        </div>
    )
}

export default Header
