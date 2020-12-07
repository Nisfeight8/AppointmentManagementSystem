import React, { useState, useEffect }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'


export default function Dashboard() {

    // GET/Fetch all patients, listener for patients

    const [employees, setEmployees] = React.useState([

    ])

    useEffect(() => {
        fetch('http://localhost:8000/employee/list')
        .then(response => response.json())
        .then(json => setEmployees(json))

    }, [employees])

    return (
        <div>
        <Nav/>
        <Container maxwidth="md">
        <h2>Hello from Dashboard! (Main "/" route or landing page)</h2>
        {employees.map((employee) => (
            <p>{employee.name}</p>
        ))}
        </Container>
        </div>
    )
}