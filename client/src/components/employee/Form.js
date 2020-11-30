import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { useHistory } from 'react-router-dom';

import { addNewEmployee, updateEmployee } from '../../api/directoryApi.js'

export default function UpdateForm(props) {
    const [currentEmployee, setCurrentEmployee] = useState({});
    const [responseMessage, setResponseMessage] = useState({});

    const history = useHistory();

    useEffect(() => {
        console.log("use effect")
        if (props.location.state && props.location.state.employee) {
            setCurrentEmployee(props.location.state.employee)
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())

        if (currentEmployee.id) {
            updateCurrentEmployee(formDataObj)
        } else {
            insertNewEmployee(formDataObj)
        }
    }

    const insertNewEmployee = async (employee) => {
        const response = await addNewEmployee(employee)
        setResponseMessage(response)
    }

    const updateCurrentEmployee = async (employee) => {
        employee.id = currentEmployee.id
        const response = await updateEmployee(employee)
        setResponseMessage(response)
    }

    const handleBackToDirectory = () => {
        history.push("/");
    }

    const renderAlertMessage = () => {
        if (responseMessage.success) {
            return <Alert variant="success">Changes successfully saved</Alert>
        } else {
            return <Alert variant="danger">Error - responseMessage.error</Alert>
        }
    }

    return (
        <Container>
            <h3>Employee form</h3>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Row>
                    <Form.Label column lg={2}>Name</Form.Label>
                    <Col>
                        <Form.Control name="name" type="text" placeholder="Enter full name of employee" defaultValue={currentEmployee.name} />
                    </Col>
                </Form.Row>
                <br />

                <Form.Row>
                    <Form.Label column lg={2}>Title</Form.Label>
                    <Col>
                        <Form.Control name="title" type="text" placeholder="Enter title of employee" defaultValue={currentEmployee.title} />
                    </Col>
                </Form.Row>
                <br />

                <Form.Row>
                    <Form.Label column lg={2}>Department</Form.Label>
                    <Col>
                        <Form.Control name="department" type="text" placeholder="Enter department of employee" defaultValue={currentEmployee.department} />
                    </Col>
                </Form.Row>
                <br />

                <Form.Row>
                    <Form.Label column lg={2}>Location</Form.Label>
                    <Col>
                        <Form.Control name="location" type="text" placeholder="Enter location of employee" defaultValue={currentEmployee.location} />
                    </Col>
                </Form.Row>
                <br />

                <Form.Row>
                    <Form.Label column lg={2}>Image URL</Form.Label>
                    <Col>
                        <Form.Control name="imageUrl" type="text" placeholder="Enter URL to image of employee" defaultValue={currentEmployee.imageUrl} />
                    </Col>
                </Form.Row>
                <br />
              
                <Button type="submit" className="mb-2" variant="dark">Submit</Button>&nbsp;&nbsp;
                    <Button variant="light" className="mb-2" onClick={handleBackToDirectory}>Back</Button>
                {Object.keys(responseMessage).length > 0 ? renderAlertMessage() : null}
            </Form>
        </Container>
    )
}