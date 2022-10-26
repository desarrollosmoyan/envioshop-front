import React from "react";
import Head from "../../../layout/head/Head";
import { Card } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  InputSwitch,
  Button,
} from "../../../components/Component";
import { Modal, ModalBody, ModalFooter, FormGroup, Col, Row } from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
const UserProfileSettingPage = ({ sm, updateSm }) => {
  const [isOpen, setOpen] = useState(false);
  const { handleSubmit, errors, register } = useForm();
  const openModal = () => {
    setOpen(true);
  };
  const closeOpen = () => {
    setOpen(false);
  };
  const onFormSubmit = () => {};
  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Ajustes de seguridad</BlockTitle>
            <BlockDes>
              <p>Estas configuraciones mantendrán tu cuenta segura</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-start d-lg-none">
            <Button
              className={`toggle btn btn-icon btn-trigger mt-n1 ${
                sm ? "active" : ""
              }`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <Block>
        <Modal
          isOpen={isOpen}
          className="modal-dialog-centered"
          size="lg"
          toggle={() => setOpen(!isOpen)}
        >
          <ModalBody>
            <a
              href="#dropdownitem"
              onClick={(ev) => {
                ev.preventDefault();
                closeOpen(false);
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Editar Perfil</h5>
              <Row className="gy-4" tag="form">
                <Col md="6">
                  <FormGroup>
                    <label className="form-label" htmlFor="full-name">
                      Contraseña anterior
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="form-control"
                      name="prevPassword"
                      ref={register({ required: true })}
                      placeholder="Ingrese contraseña anterior"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-label" htmlFor="full-name">
                      Contraseña nueva
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="form-control"
                      name="prevPassword"
                      ref={register({ required: true })}
                      placeholder="Ingrese contraseña anterior"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-label" htmlFor="full-name">
                      Repetir contraseña nueva
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="form-control"
                      name="prevPassword"
                      ref={register({ required: true })}
                      placeholder="Ingrese contraseña anterior"
                    />
                  </FormGroup>
                </Col>
                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2 mt-3">
                    <li>
                      <Button color="primary" size="lg" type="submit">
                        Confirmar edición
                      </Button>
                    </li>
                    <li className="ml-3">
                      <a
                        href="#dropdownitem"
                        onClick={(ev) => {
                          ev.preventDefault();
                          closeOpen(false);
                        }}
                        className="link link-light"
                      >
                        Cancelar
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        <Card className="card-bordered">
          <div className="card-inner-group">
            <div className="card-inner">
              <div className="between-center flex-wrap g-3">
                <div className="nk-block-text">
                  <h6>Cambiar Contraseña</h6>
                  <p>Establece una contraseña</p>
                </div>
                <div className="nk-block-actions flex-shrink-sm-0">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                    <li className="order-md-last">
                      <Button color="primary" onClick={openModal}>
                        Cambiar Contraseña
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Block>
    </React.Fragment>
  );
};
export default UserProfileSettingPage;
