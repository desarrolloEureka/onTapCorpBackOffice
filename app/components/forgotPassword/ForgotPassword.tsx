'use client';
import Link from 'next/link';
import { Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Container,
  Button,
  Alert,
} from 'react-bootstrap';
import Seo from 'shared/layout-components/seo/seo';
import ForgotPasswordHook from './hook/ForgotPasswordHook';
import { globalConfig } from '@/config/globalConfig';
import { main_logo_light, user_logo } from '@/globals/images';

const ForgotPassword = () => {
  const { remove, changeHandler, handleRemember, email, message } =
    ForgotPasswordHook();

  return (
    <div>
      <Seo title='Forgot Password' />

      {/* <!-- Row --> */}
      <Fragment>
        <div className='page main-signin-wrapper'>
          {/* <!-- Row --> */}
          <Row className='signpages text-center' onClick={() => remove()}>
            <Col md={12}>
              <Card>
                <Row className='row-sm'>
                  <Col
                    lg={6}
                    xl={5}
                    className='d-none d-lg-block text-center bg-primary details custom-bg'
                  >
                    <div className='mt-3 pt-3 p-2 position-absolute'>
                      <Link href={`/components/signIn`}>
                        <img
                          src={main_logo_light.src}
                          className='header-brand-img mb-4'
                          alt='logo'
                          style={{ width: '85px' }}
                        />
                      </Link>

                      <div className='clearfix'></div>
                      <img
                        src={user_logo.src}
                        className='ht-100 mb-0'
                        alt='user'
                      />
                      <h5 className='mt-4 text-fixed-white'>
                        {globalConfig.rememberPassword.banner.title}
                      </h5>
                      <span className='text-white-6 fs-13 mb-5 mt-xl-0'>
                        {globalConfig.rememberPassword.banner.description}
                      </span>
                    </div>
                  </Col>
                  <Col lg={6} xl={7} xs={12} sm={12} className='login_form construction'>
                    <Container fluid>
                      <Row className=' row-sm'>
                        <Card.Body className='card-body mt-3 tw-mb-2'>
                          <img
                            src={
                              '../../../assets/images/brand-logos/desktop-white.png'
                            }
                            className=' d-lg-none header-brand-img text-start float-start mb-4 error-logo-light'
                            alt='logo'
                          />
                          <img
                            src={
                              '../../../assets/images/brand-logos/desktop-logo.png'
                            }
                            className=' d-lg-none header-brand-img text-start float-start mb-4 error-logo'
                            alt='logo'
                          />
                          <div className='clearfix'></div>

                          {message != '' && (
                            <Alert variant='danger'>{message}</Alert>
                          )}


                          <h5 className='text-start mb-2' style={{ color: 'white' }}>
                            {globalConfig.rememberPassword.form.title}
                          </h5>
                          <p className='mb-4 fs-13 ms-0 text-start' style={{ color: 'white' }}>
                            {/* {`It's`} free to signup and only takes a minute. */}
                            {globalConfig.rememberPassword.form.description}
                          </p>
                          <Form>
                            <div className='form-group text-start'>
                              <label className='form-label'>Email</label>
                              <input
                                className='form-control'
                                placeholder='Ingresa tu correo'
                                type='text'
                                name='email'
                                value={email}
                                onChange={changeHandler}
                                required
                              />
                            </div>
                            <Button
                              onClick={handleRemember}
                              className='btn ripple btn-main-primary btn-block mt-2'
                            >
                              Solicitar link de recuperación
                            </Button>
                          </Form>
                          <div className='border-top-0 ps-0 mt-3 text-start mb-3'>
                            <p className='mb-1' style={{ color: 'white' }}>Recuerdas tu contraseña?</p>
                            <p className='mb-0' style={{ color: 'white' }}>
                              Intenta
                              <Link href={`/components/signIn`}> Ingresar</Link>
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

        {/* <!-- End Row --> */}
      </Fragment>
      {/* <!-- End Row --> */}
    </div>
  );
};

export default ForgotPassword;
