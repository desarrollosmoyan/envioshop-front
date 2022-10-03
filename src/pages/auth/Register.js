import React, { useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Spinner, FormGroup } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants";
import { toast, ToastContainer } from "react-toastify";

const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const handleFormSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const response = await axios.post(API_ENDPOINTS.auth.signup, data);

    if (response.status === 200) {
      toast.success("Usuario creado con éxito", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push(`${process.env.PUBLIC_URL}/auth-success`);
        setLoading(false);
      }, 2000);
    } else {
      toast.error(`Error`, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
    /*setTimeout(
      () => history.push(`${process.env.PUBLIC_URL}/auth-success`),
      2000
    );*/
  };
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img
                className="logo-light logo-img logo-img-lg"
                src={Logo}
                alt="logo"
              />
              <img
                className="logo-dark logo-img logo-img-lg"
                src={LogoDark}
                alt="logo-dark"
              />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Registrar</BlockTitle>
                <BlockDes>
                  <p>Crear a una nueva cuenta</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <ToastContainer />
            <form
              className="is-alter"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Usuario
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.name && (
                    <p className="invalid">Este campo es requerido</p>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="default-01"
                    name="email"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                  />
                  {errors.email && (
                    <p className="invalid">Este campo es requerido</p>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Contraseña
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon
                      name="eye-off"
                      className="passcode-icon icon-hide"
                    ></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    ref={register({ required: "Este campo es requerido" })}
                    placeholder="Ingresa tu contraseña"
                    className={`form-control-lg form-control ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  />
                  {errors.password && (
                    <span className="invalid">{errors.password.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="btn-block"
                >
                  {loading ? <Spinner size="sm" color="light" /> : "Registrar"}
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              ¿Ya tienes una cuenta?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Inicia sesión</strong>
              </Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-8">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
