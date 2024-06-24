import Link from 'next/link';
import {
  Row,
  Col,
  Card,
  Form,
  Container,
  Button,
  Alert,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesome } from 'react-web-vector-icons';
import Seo from 'shared/layout-components/seo/seo';
import ResetPasswordHook from './hook/ResetPasswordHook';
import { globalConfig } from '@/config/globalConfig';
import Spinner from '../spinner/Spinner';

const ResetPassword = () => {
  const {
    remove,
    changeHandler,
    email,
    password,
    handleResetPassword,
    newPassword,
    invalidEmail,
    invalidPassword,
    invalidOobCode,
    error,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    sigIn,
  } = ResetPasswordHook();

  return sigIn ? (
    <Spinner />
  ) : (
    <div>
      <Seo title='Reset Password' />

      <div className='page main-signin-wrapper'>
        <Row className='signpages text-center' onClick={() => remove()}>
          <Col md={12}>
            <Card>
              <Row className='row-sm'>
                <Col
                  lg={6}
                  xl={5}
                  className='d-none d-lg-block text-center bg-primary details'
                >
                  <div className='mt-5 pt-5 p-2 position-absolute'>
                    <Link href='/components/dashboard/dashboard'>
                      <img
                        src={
                          '../../../assets/images/brand-logos/desktop-white.png'
                        }
                        className='header-brand-img mb-4'
                        alt='logo'
                      />
                    </Link>
                    <div className='clearfix'></div>
                    <img
                      src={'../../../assets/images/svgs/user.svg'}
                      className='ht-100 mb-0'
                      alt='user'
                    />
                    <h5 className='mt-4 text-fixed-white'>
                      {globalConfig.resetPassword.banner.title}
                    </h5>
                    <span className='text-white-6 fs-13 mb-5 mt-xl-0'>
                      {globalConfig.resetPassword.banner.description}
                    </span>
                    {(invalidEmail || invalidPassword || invalidOobCode) && (
                      <Alert variant='danger'>{error}</Alert>
                    )}
                  </div>
                </Col>
                <Col lg={6} xl={7} xs={12} sm={12} className=' login_form '>
                  <Container fluid>
                    <Row className=' row-sm'>
                      <Card.Body className='mt-2 mb-2'>
                        <img
                          src={
                            '../../../assets/images/brand-logos/desktop-logo.png'
                          }
                          className=' d-lg-none header-brand-img text-start float-start mb-4 error-logo'
                          alt='logo'
                        />
                        <img
                          src={
                            '../../../assets/images/brand-logos/desktop-white.png'
                          }
                          className=' d-lg-none header-brand-img text-start float-start mb-4 error-logo-light'
                          alt='logo'
                        />
                        <div className='clearfix'></div>
                        <h5 className='text-start mb-2'>
                          {globalConfig.resetPassword.form.title}
                        </h5>
                        <p className='mb-4 text-muted fs-13 ms-0 text-start'>
                          {globalConfig.resetPassword.form.description}
                        </p>
                        <Form>
                          <Form.Group
                            className='text-start form-group'
                            controlId='fromEmail'
                          >
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                              placeholder='Enter your mail'
                              name='email'
                              type='text'
                              value={email}
                              onChange={changeHandler}
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className='text-start form-group'
                            controlId='formNewPassword'
                          >
                            <Form.Label>Nueva contraseña</Form.Label>
                            <InputGroup>
                              <Form.Control
                                placeholder='Enter your password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={changeHandler}
                                required
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
                          <Form.Group
                            className='text-start form-group'
                            controlId='formpassword'
                          >
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <InputGroup>
                              <Form.Control
                                placeholder='Confirm your new password'
                                name='newPassword'
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={changeHandler}
                                required
                              />
                              <InputGroup.Text
                                className='tw-cursor-pointer'
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                <FontAwesome
                                  name={showNewPassword ? 'eye' : 'eye-slash'}
                                  color='black'
                                  size={14}
                                  // style={{}}
                                />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Button
                            onClick={handleResetPassword}
                            className='btn ripple btn-main-primary btn-block mt-2'
                          >
                            Cambiar Contraseña
                          </Button>
                        </Form>
                        <div className='text-start mt-5 ms-0'>
                          <p className='mb-0'>
                            Ya tienes una cuenta?
                            <Link className='ms-2' href={`/components/signIn`}>
                              Ingresar
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

export default ResetPassword;
