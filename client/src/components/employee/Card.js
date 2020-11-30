import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom';

import { deleteEmployee } from '../../api/directoryApi.js'

export default function EmployeeCard(props) {
    const [show, setShow] = useState(false);
    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleVerifyDelete(e) {
        e.preventDefault()
        handleShow()
    }

    const handleDelete = () => {
        handleClose()
        deleteEmployeeFromServer()
    }

    const deleteEmployeeFromServer = async () => {
        await deleteEmployee(props.employee.id)
        props.setEmployeeDirectory([])
    }

    const handleNavigateToEdit = () => {
        history.push({
            pathname: "/employee/" + props.employee.id,
            state: { employee: props.employee }
        });
    }

    const renderImageUrl = () => {
        if (props.employee.imageUrl) {
            return props.employee.imageUrl
        }
        return "//placehold.it/200"
    }

    return (
        <div key={props.employee.id}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are you sure you want to permanently delete this employee?
        <br />&nbsp;&nbsp;<small>Name: {props.employee.name}</small>
                    <br />&nbsp;&nbsp;<small>Employee Id: {props.employee.id}</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <div className="row no-gutters">
                    <div className="col-auto">
                        <Image src={renderImageUrl()} className="img-fluid" alt="" style={{ "width": "140px" }} rounded />
                    </div>
                    <div className="col">
                        <div className="card-block px-2">
                            <Card.Title>{props.employee.name}</Card.Title>
                            <Card.Text>
                                <i>{props.employee.title}</i><br />
                                {props.employee.department}<br />
                                {props.employee.location}<br />
                                <Button variant="light" size="sm" onClick={handleNavigateToEdit}>Edit</Button> |
                 <Button variant="light" size="sm" onClick={(e) => handleVerifyDelete(e)}>Delete</Button>
                            </Card.Text>
                        </div>
                    </div>
                </div>
            </Card>
            <br />
        </div>
    )
}
