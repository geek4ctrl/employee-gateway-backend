import express from 'express';
import database from './database/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/employees', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: "employees retrieved successfully",
        employees: database
    })
})

app.post('/api/v1/employees', (req, res) => {

    if (!req.body.firstName) {
        return res.status(400).send({
            success: 'false',
            message: 'First name is required'
        })
    }

    if (!req.body.lastName) {
        return res.status(400).send({
            success: 'false',
            message: 'Last name is required'
        })
    }

    if (!req.body.email) {
        return res.status(400).send({
            success: 'false',
            message: 'Email is required'
        })
    }

    if (!req.body.dateOfBirth) {
        return res.status(400).send({
            success: 'false',
            message: 'Date of birth is required'
        })
    }

    if (!req.body.streetAddress) {
        return res.status(400).send({
            success: 'false',
            message: 'Street address is required'
        })
    }

    if (!req.body.city) {
        return res.status(400).send({
            success: 'false',
            message: 'Street address is required'
        })
    }

    if (!req.body.postalCode) {
        return res.status(400).send({
            success: 'false',
            message: 'Postal Code is required'
        })
    }

    if (!req.body.country) {
        return res.status(400).send({
            success: 'false',
            message: 'Country is required'
        })
    }

    const employee = {
        id: database.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        dateOfBirth: req.body.dateOfBirth,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country
    }

    database.push(employee);

    return res.status(201).send({
        success: 'true',
        message: 'employee added successfully',
        employee
    })
});

app.delete('/api/v1/employees/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)

    database.map((employee, index) => {
        if (employee.id === id) {
            database.splice(index, 1);

            return res.status(200).send({
                success: 'true',
                message: 'Employee deleted successfully',
            })
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'Employee not found',
    })
});

app.put('/api/v1/employees/:email', (req, res) => {

    // const id = parseInt(req.params.id, 10);
    const email = req.params.email;
    let employeeFound;
    let itemindex;

    database.map((employee, index) => {
        if (employee.email === email) {
            employeeFound = employee;
            itemindex = index;
        }
    });

    if (!employeeFound) {
        return res.status(404).send({
            success: 'false',
            message: 'employee not found'
        });
    }

    if (!req.body.firstName) {
        return res.status(400).send({
            success: 'false',
            message: 'First name is required'
        });
    } else if (!req.body.lastName) {
        return res.status(400).send({
            success: 'false',
            message: 'Last name is required'
        })
    }

    const updatedEmployee = {
        id: employeeFound.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        dateOfBirth: req.body.dateOfBirth,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country
    }

    database.splice(itemindex, 1, updatedEmployee);

    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        updatedEmployee
    });

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
