import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import { Modal, ModalBody, FormGroup } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect,
} from "../../../components/Component";
import { countryOptions, userData } from "./UserData";
import { getDateStructured } from "../../../utils/Utils";
import { useSelector } from "react-redux";
import axios from "axios";
import { request } from "../../../constants";
import { useCookie } from "react-use";
const UserProfileRegularPage = ({ sm, updateSm, setProfileName }) => {
  const user = useSelector((state) => state.user);
  const [modalTab, setModalTab] = useState("1");
  const [token] = useCookie("token");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    franchise: {
      name: "",
    },
  });
  const [formData, setFormData] = useState({
    name: "Abu Bin Ishtiak",
    displayName: "Ishtiak",
    phone: "818474958",
    dob: "1980-08-10",
    address: "2337 Kildeer Drive",
    address2: "",
    state: "Kentucky",
    country: "Canada",
  });
  const [modal, setModal] = useState(false);
  const typeMap = {
    cashier: "Cajero",
    franchise: "Franquicia",
    admin: "Admin",
  };

  useEffect(() => {
    getMe();
  }, []);
  const getMe = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: "/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(data.user);
    } catch (error) {
      setUserData(user);
    }
  };
  useEffect(() => {
    setProfileName(formData.name);
  }, [formData, setProfileName]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    let submitData = {
      ...formData,
    };
    setUserData(submitData);
    setModal(false);
  };
  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Información personal</BlockTitle>
            <BlockDes>
              <p>Información básica, como nombre, ubicación</p>
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
        <div className="nk-data data-list">
          <div className="data-head">
            <h6 className="overline-title">Información Básica</h6>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Nombre completo</span>
              <span className="data-value">{userData.name}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Rol</span>
              <span className="data-value text-soft">
                {typeMap[userData.type]}
              </span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="lock-alt"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item">
            <div className="data-col">
              <span className="data-label">Email</span>
              <span className="data-value text-soft">{user.email}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more disable">
                <Icon name="lock-alt"></Icon>
              </span>
            </div>
          </div>
          {user.type === "cashier" ? (
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Franquicia</span>
                <span className="data-value text-soft">
                  {userData.franchise.name}
                </span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="lock-alt"></Icon>
                </span>
              </div>
            </div>
          ) : null}
          {userData.type === "franchise" ? (
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Número de teléfono</span>
                <span className="data-value text-soft">
                  {userData.cellphone}
                </span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {userData.type === "franchise" ? (
            <div className="data-item" onClick={() => setModal(true)}>
              <div className="data-col">
                <span className="data-label">Ubicación</span>
                <span className="data-value">{userData.ubication}</span>
              </div>
              <div className="data-col data-col-end">
                <span className="data-more">
                  <Icon name="forward-ios"></Icon>
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Block>

      <Modal
        isOpen={modal}
        className="modal-dialog-centered"
        size="lg"
        toggle={() => setModal(false)}
      >
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Editar Perfil</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
                  }}
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              <li className="nav-item">
                {userData.type === "franchise" ? (
                  <a
                    className={`nav-link ${modalTab === "2" && "active"}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModalTab("2");
                    }}
                    href="#address"
                  >
                    Ubicación
                  </a>
                ) : null}
              </li>
            </ul>
            <div className="tab-content">
              <div
                className={`tab-pane ${modalTab === "1" ? "active" : ""}`}
                id="personal"
              >
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.name}
                        placeholder="Enter Full name"
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2 mt-3">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={(ev) => {
                            ev.preventDefault();
                            submitForm();
                          }}
                        >
                          Confirmar edición
                        </Button>
                      </li>
                      <li className="ml-3">
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
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
              <div
                className={`tab-pane ${modalTab === "2" ? "active" : ""}`}
                id="address"
              >
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="address-l1"
                        name="address"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.address}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address-l2"
                        name="address2"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.address2}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        State
                      </label>
                      <input
                        type="text"
                        id="address-st"
                        name="state"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.state}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-county">
                        Country
                      </label>
                      <RSelect
                        options={countryOptions}
                        placeholder="Select a country"
                        defaultValue={[
                          {
                            value: formData.country,
                            label: formData.country,
                          },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={() => submitForm()}
                        >
                          Update Address
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default UserProfileRegularPage;
