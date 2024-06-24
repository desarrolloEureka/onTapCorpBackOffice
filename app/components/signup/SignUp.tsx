'use client';
import Link from 'next/link';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import Spinner from '../spinner/Spinner';
import Seo from 'shared/layout-components/seo/seo';
import SignUpHook from './hook/SignUpHook';
import { globalConfig } from '@/config/globalConfig';
import { FontAwesome } from 'react-web-vector-icons';
import user from '@/assets/images/svgs/user.svg';
import { main_logo_light, user_logo } from '@/globals/images';

const SignUp = () => {
  const {
    isLoading,
    remove,
    error,
    email,
    fullName,
    password,
    handleSignUp,
    changeHandler,
    signOut,
    showPassword,
    setShowPassword,
  } = SignUpHook();

  return isLoading || signOut ? (
    <Spinner />
  ) : (
    <div>
      <Seo title='Signup' />

      <div className='page main-signin-wrapper'>
        <Row className='signpages text-center' onClick={() => remove()}>
          <Col md={12} className='col-md-12'>
            <Card>
              <Row className='row-sm'>
                <Col
                  lg={6}
                  xl={5}
                  className='d-none d-lg-block text-center bg-primary details custom-bg'
                >
                  <div className='mt-5 pt-5 p-2 position-absolute'>
                    <Link href='/components/dashboard/dashboard'>
                      <img
                        src={main_logo_light.src}
                        className='header-brand-img mb-4'
                        alt='logo'
                      />
                    </Link>
                    <div className='clearfix'></div>
                    <img
                      src={user_logo.src}
                      className='ht-100 mb-0'
                      alt='user'
                    />
                    <h5 className='mt-4 text-fixed-white'>
                      {globalConfig.register.banner.title}
                    </h5>
                    <span className='text-white-6 fs-13 mb-5 mt-xl-0'>
                      {globalConfig.register.banner.description}
                    </span>
                  </div>
                </Col>
                <Col lg={6} xl={7} xs={12} sm={12} className=' login_form '>
                  <Container fluid>
                    <Row className=' row-sm'>
                      <Card.Body className='mt-2 mb-2'>
                        <img
                          src='../../../assets/images/brand-logos/desktop-white.png'
                          className='d-lg-none header-brand-img text-start float-start mb-4 error-logo-light'
                          alt='logo'
                        />
                        <img
                          src='../../../assets/images/brand-logos/desktop-logo.png'
                          className=' d-lg-none header-brand-img text-start float-start mb-4 error-logo'
                          alt='logo'
                        />

                        <div className='clearfix'></div>
                        <h5 className='text-start mb-2'>
                          {globalConfig.register.form.title}
                        </h5>
                        <p className='mb-4 text-muted fs-13 ms-0 text-start'>
                          {/* {`It's`} free to signup and only takes a minute. */}
                          {globalConfig.register.form.description}
                        </p>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form>
                          <Form.Group
                            className='text-start form-group'
                            controlId='fromFullName'
                          >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                              placeholder='Ingresa tu nombre'
                              type='text'
                              name='fullName'
                              value={fullName}
                              onChange={changeHandler}
                            />
                          </Form.Group>
                          <Form.Group
                            className='text-start form-group'
                            controlId='formEmail'
                          >
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                              placeholder='Ingresa tu correo'
                              type='email'
                              name='email'
                              value={email}
                              onChange={changeHandler}
                            />
                          </Form.Group>
                          <Form.Group
                            className='text-start form-group'
                            controlId='formpassword'
                          >
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                              <Form.Control
                                placeholder='Ingresa tu contraseña'
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={password}
                                onChange={changeHandler}
                              />
                              <InputGroup.Text
                                className='tw-cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <FontAwesome
                                  name={showPassword ? 'eye' : 'eye-slash'}
                                  color='black'
                                  size={14}
                                  // style={{}}
                                />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Button
                            onClick={() => handleSignUp({ email, password })}
                            className='btn ripple btn-main-primary btn-block mt-2'
                          >
                            Registarme
                          </Button>
                        </Form>
                        <div className='text-start mt-5 ms-0'>
                          <p className='mb-0'>
                            Ya tengo una cuenta?
                            <Link className='ms-2' href={`/components/signIn/`}>
                              Iniciar sesión
                            </Link>
                          </p>
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
    </div>
  );
};

export default SignUp;
