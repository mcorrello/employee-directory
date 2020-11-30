import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import { getEmployeeDirectory } from '../../api/directoryApi.js'
import Card from './Card.js'
import Search, { searchEmployeeDirectory } from './Search.js'


export default function Directory() {

    const [employeeDirectory, setEmployeeDirectory] = useState([]);
    const [filteredEmployeeDirectory, setFilteredEmployeeDirectory] = useState([]);
    const [searchText, setSearchText] = useState([]);

    const history = useHistory();

    const fetchData = async () => {
        const response = await getEmployeeDirectory()
        setEmployeeDirectory(response)
        setFilteredEmployeeDirectory(response)
    }

    useEffect(() => {
        if (!employeeDirectory || !employeeDirectory.length) {
            fetchData();
        }
    }, [employeeDirectory]);

    useEffect(() => {
        if (searchText && searchText.length) {
            setFilteredEmployeeDirectory(searchEmployeeDirectory(employeeDirectory, searchText))
        }
    }, [searchText]);

    const handleClick = () => {
        history.push("/employee");
    }

    return (
        <div>
            <Container>
                <Search employeeDirectory={employeeDirectory} setSearchText={setSearchText} />
                <Col xl={{ size: '8' }}>
                <Button className="float-right" variant="dark" onClick={handleClick}>Add employee</Button>
                <br /><br />
                    {filteredEmployeeDirectory.length > 0 ? filteredEmployeeDirectory.map(emp =>
                        <Card employee={emp} setEmployeeDirectory={setEmployeeDirectory} />)
                        : null}
                </Col>
            </Container>
        </div>
    )
}
