import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './CreateNewAccount.css';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';

export default function CreateNewAccount() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/manageAccount';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [avt, setAvt] = useState();

    const roles = [
        { display: '-----Select a role------' },
        { display: 'Staff', value: 'staff' },
        { display: 'QA Manager', value: 'qam' },
        { display: 'QA Coordinator', value: 'qac' },
    ];
    const departments = [
        { display: 'Select a dapartment' },
        { display: 'Finance', value: 'Finance' },
        { display: 'Marketing', value: 'Marketing' },
        { display: 'Human Resource', value: 'Human Resource' },
        { display: 'Information Technology', value: 'Information Technology' },
    ];

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await Axios.post('/api/users/createAccount', {
                name,
                email,
                password,
                role,
                department,
            });
            // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            // localStorage.setItem('userInfo', JSON.stringify(data));
            console.log(data);
            navigate(redirect || '/manageAccount');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div className="accountContainer">
            <Container className="small-container">
                <Row className="accountContainer">
                    <Col className="col-8">
                        <h1 className="text-center">Create New Account</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={role} required onChange={(e) => setRole(e.target.value)}>
                                    {roles.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>
                                                {option.display}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="department">
                                <Form.Label>Department</Form.Label>
                                <Form.Select
                                    value={department}
                                    required
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    {departments.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>
                                                {option.display}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="pic" className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" enable />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit">Create new account</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col>
                        <div>Display pic</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
