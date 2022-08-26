import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import AuthService from '../../services/auth';
import { connect, useDispatch } from "react-redux";
import {
    errorResponse,
    successResponse,
    isError,
  
  } from "../helpers/response";
  
const LoginForm = ({ hasLabel, layout,isAuthenticated }) => {
    // State
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation()
    const [password, setPassword] = useState("")
    const [togglePassword, setTogglePassword] = useState(false)
    useEffect(() => {
        const isLogin = localStorage.getItem("accessToken") || false;
        if (isLogin) {
            navigate('/admin/dashboard');
        }
    }, []);

    useEffect(() => {
        document.title = process.env.REACT_APP_APP_NAME + ' :: Admin Login';
    }, [1]);

    const handleChange = (e) => {
        setPassword(e.target.value)
    }
    const HideShowPassword = (tPassword) => {
        setTogglePassword(!tPassword)
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        isError(errors);
    });

    const onSubmit = (inputField) => {
        dispatch(AuthService.login(inputField))
            .then((res) => {
                // console.log(res)
            })
            .catch((errors) => {
                if (errors.response) {
                    errorResponse(errors);
                }
            })
    };

    if (isAuthenticated) {
        window.location.href ='/admin/dashboard';
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>Email address</Form.Label>}
                <Form.Control
                    placeholder='Email address'
                    id='email'
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "address invalid "
                        },
                        maxLength: {
                            value: 320,
                            message: "maximum length is 320"
                        },
                    })}
                    name="email"
                    type="email"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {hasLabel && <Form.Label>Password</Form.Label>}
                <Form.Control
                    placeholder="**************"
                    defaultValue={password}
                    name="password"
                    type="password"
                    id="password"
                    onChange={(e) => handleChange(e)}
                    {...register('password', {
                        required: true,
                        minLength: {
                            value: 6,
                            message: "minimum length is 6"
                        },
                    })}
                />
            </Form.Group>

            {/* <Row className="justify-content-between align-items-center">

                <Col xs="auto">
                    <Link
                        className="fs--1 mb-0"
                        to={`/authentication/${layout}/forgot-password`}
                    >
                        Forget Password?
                    </Link>
                </Col>
            </Row> */}

            <Form.Group>
                <Button
                    type="submit"
                    color="primary"
                    className="mt-3 w-100"
                >
                    Log in
                </Button>
            </Form.Group>
        </Form>
    );
};

LoginForm.propTypes = {
    layout: PropTypes.string,
    hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
    layout: 'simple',
    hasLabel: false
};

// export default LoginForm;
const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        accessToken: state.Auth.accessToken,
    }
};
export default connect(mapStateToProps)(LoginForm);
