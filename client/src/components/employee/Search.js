import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Search(props) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
    props.setSearchText(formDataObj.search)
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup className="mb-3">
        <Form.Control name="search" type="text" placeholder="Search" />
        <Button type="submit" className="mb-2" variant="light">Search</Button>&nbsp;&nbsp;
      </InputGroup>
    </Form>
  )
}

export function searchEmployeeDirectory(employeeDirectory, searchText) {
  const upperSearchText = searchText.toUpperCase();
  return employeeDirectory.filter(employee => 
        employee.name.toUpperCase().includes(upperSearchText)
        || employee.title.toUpperCase().includes(upperSearchText)
        || employee.department.toUpperCase().includes(upperSearchText)
        || employee.location.toUpperCase().includes(upperSearchText)
  )
}
 