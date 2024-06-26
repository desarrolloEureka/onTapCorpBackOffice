"use client";
import React from "react";
import Link from "next/link";
import {
    Row,
    Col,
    Card,
    Form,
    Container,
    Alert,
    Button,
    InputGroup,
} from "react-bootstrap";
import Seo from "shared/layout-components/seo/seo";
import SignInHook from "./hook/SignInHook";
import Spinner from "../spinner/Spinner";
import { globalConfig } from "@/config/globalConfig";
import { FontAwesome } from "react-web-vector-icons";
import { logo_light, user_logo, main_logo_dark } from "@/globals/images";

const SingIn = () => {
    const {
        handleSignIn,
        changeHandler,
        setShowPassword,
        isLoading,
        error,
        email,
        password,
        sigIn,
        showPassword,
    } = SignInHook();

    // console.log(isLoading, sigIn);

    return isLoading || sigIn ? (
        <Spinner />
    ) : (
        <div className="page main-signin-wrapper">
            <Seo title="SignIn" />
            <Row className="signpages text-center ">
                <Col md={12}>
                    <Card>
                        <Row className="row-sm">
                            <Col
                                lg={6}
                                xl={5}
                                className="d-none d-lg-block text-center details custom-bg"
                            >
                                <div className="mt-5 pt-4 p-2 position-absolute">
                                    <img
                                        src={main_logo_dark.src}
                                        className="header-brand-img tw-mb-10"
                                        alt="logo-light"
                                        style={{ width: '85px' }}
                                    />
                                    <div className="clearfix"></div>
                                    <img
                                        src={user_logo.src}
                                        className="ht-100 mb-0"
                                        alt="user"
                                    />
                                    <h5 className="mt-4 text-white">
                                        {globalConfig.login.banner.title}
                                    </h5>
                                    <span className="text-white-6 fs-13 mb-5 mt-xl-0">
                                        {globalConfig.login.banner.description}
                                    </span>
                                </div>
                            </Col>
                            <Col
                                lg={6}
                                xl={7}
                                xs={12}
                                sm={12}
                                className="login_form "
                            >
                                <Container fluid>
                                    <Row className="row-sm">
                                        <Card.Body className="mt-2 mb-2">
                                            <img
                                                src={main_logo_dark.src}
                                                className=" d-lg-none header-brand-img text-start float-start mb-4 auth-light-logo"
                                                alt="logo"
                                            />
                                            {/* <img
                                                src={logo_light.src}
                                                className=" d-lg-none header-brand-img text-start float-start mb-4 auth-dark-logo"
                                                alt="logo"
                                            /> */}
                                            <div className="clearfix"></div>
                                            {error != "" && (
                                                <Alert variant="danger">
                                                    {error}
                                                </Alert>
                                            )}
                                            <Form>
                                                <h5 className="text-start mb-2">
                                                    {
                                                        globalConfig.login.form
                                                            .title
                                                    }
                                                </h5>
                                                <p className="mb-4 text-muted fs-13 ms-0 text-start">
                                                    {
                                                        globalConfig.login.form
                                                            .description
                                                    }
                                                </p>
                                                <Form.Group
                                                    className="text-start form-group"
                                                    controlId="formEmail"
                                                >
                                                    <Form.Label>
                                                        Correo
                                                    </Form.Label>
                                                    <Form.Control
                                                        className="form-control"
                                                        placeholder="Enter your email"
                                                        name="email"
                                                        type="text"
                                                        value={email}
                                                        onChange={changeHandler}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className="text-start form-group"
                                                    controlId="formpassword"
                                                >
                                                    <Form.Label>
                                                        Contraseña
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            className="form-control"
                                                            placeholder="Enter your password"
                                                            name="password"
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            value={password}
                                                            onChange={
                                                                changeHandler
                                                            }
                                                            required
                                                        />
                                                        <InputGroup.Text
                                                            className="tw-cursor-pointer"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword,
                                                                )
                                                            }
                                                        >
                                                            <FontAwesome
                                                                name={
                                                                    showPassword
                                                                        ? "eye"
                                                                        : "eye-slash"
                                                                }
                                                                color="black"
                                                                size={14}
                                                            // style={{}}
                                                            />
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Button
                                                    onClick={() =>
                                                        handleSignIn({
                                                            email,
                                                            password,
                                                        })
                                                    }
                                                    className="btn ripple btn-main-primary btn-block mt-2"
                                                >
                                                    Iniciar Sesión
                                                </Button>
                                            </Form>
                                            <div className="text-start mt-5 ms-0">
                                                <div className="mb-1">
                                                    <Link href="/components/forgotPassword">
                                                        Has olvidado tu
                                                        contraseña ?
                                                    </Link>
                                                </div>
                                                <div>
                                                    {/* {`Don't`} */}
                                                    No tienes una cuenta
                                                    registrada?
                                                    <Link
                                                        href={`/components/signup/`}
                                                    >
                                                        {" "}
                                                        Regístrate aquí
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SingIn;
