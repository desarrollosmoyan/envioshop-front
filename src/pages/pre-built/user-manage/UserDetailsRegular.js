import React, { useContext, useEffect, useState } from "react";
import { Card, Modal, ModalBody } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  OverlineTitle,
  Sidebar,
  UserAvatar,
} from "../../../components/Component";
import { useHistory, useLocation } from "react-router";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  currentTime,
  findUpper,
  monthNames,
  todaysDate,
} from "../../../utils/Utils";
import { UserContext } from "./UserContext";
import { notes } from "./UserData";
import useUser from "../../../hooks/useUser";

const UserDetailsPage = ({ match }) => {
  //const { contextData } = useContext(UserContext);
  //const [data] = contextData;

  const [sideBar, setSidebar] = useState(false);
  const [user, setUser] = useState();
  const location = useLocation();
  const { getOne } = useUser(location.state.type);
  const [noteData, setNoteData] = useState(notes);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const history = useHistory();
  useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      getOne(id, setUser);
    }
  });
  // grabs the id of the url and loads the corresponding data
  /*useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      let spUser = data.find((item) => item.id === Number(id));
      setUser(spUser);
    } else {
      setUser(data[0]);
    }
  }, [match.params.id, data]);*/

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };

  // delete a note
  const deleteNote = (id) => {
    let defaultNote = noteData;
    defaultNote = defaultNote.filter((item) => item.id !== id);
    setNoteData(defaultNote);
  };

  const submitNote = () => {
    let submitData = {
      id: Math.random(),
      text: addNoteText,
      date: `${
        monthNames[todaysDate.getMonth()]
      } ${todaysDate.getDate()}, ${todaysDate.getFullYear()}`,
      time: `${currentTime()}`,
      company: "Softnio",
    };
    setNoteData([...noteData, submitData]);
    setAddNoteModal(false);
    setAddNoteText("");
  };

  return (
    <React.Fragment>
      <Head title="User Details - Regular"></Head>
      {user && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {user.type === "franchise" ? "Franquicia" : "Cajero"} /{" "}
                  <strong className="text-primary small">{user.name}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      ID de usuario:{" "}
                      <span className="text-base">{user.id}</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => history.goBack()}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>Salir</span>
                </Button>
                <a
                  href="#back"
                  onClick={(ev) => {
                    ev.preventDefault();
                    history.goBack();
                  }}
                  className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                >
                  <Icon name="arrow-left"></Icon>
                </a>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card className="card-bordered">
              <div className="card-aside-wrap" id="user-detail-block">
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#personal"
                        onClick={(ev) => {
                          ev.preventDefault();
                        }}
                      >
                        <Icon name="user-circle"></Icon>
                        <span>Personal</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button
                        className={`toggle btn-icon btn-trigger ${
                          sideBar && "active"
                        }`}
                        onClick={toggle}
                      >
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>

                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Información Personal</BlockTitle>
                        <p>
                          Información básica. Como nombre del usuario y
                          ubicación
                        </p>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Tipo</span>
                            <span className="profile-ud-value">
                              {user.type === "franchise"
                                ? "Franquicia"
                                : "Cajero"}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">
                              Nombre Completo
                            </span>
                            <span className="profile-ud-value">
                              {user.name}
                            </span>
                          </div>
                        </div>
                        {/*
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Surname</span>
                            <span className="profile-ud-value">
                              {user.name.split(" ")[1]}
                            </span>
                          </div>
                        </div>
                            */}
                        {location.type === "franchise" ? (
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">
                                Numero de Teléfono
                              </span>
                              <span className="profile-ud-value">
                                {user.cellphone}
                              </span>
                            </div>
                          </div>
                        ) : null}
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">
                              Correo electrónico
                            </span>
                            <span className="profile-ud-value">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Block>

                    <Block>
                      <BlockHead className="nk-block-head-line">
                        <BlockTitle
                          tag="h6"
                          className="overline-title text-base"
                        >
                          Información Adicional
                        </BlockTitle>
                      </BlockHead>
                      <div className="profile-ud-list">
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">
                              Fecha de registro
                            </span>
                            <span className="profile-ud-value">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="profile-ud-item">
                          <div className="profile-ud wider">
                            <span className="profile-ud-label">Reg Method</span>
                            <span className="profile-ud-value">Email</span>
                          </div>
                        </div>
                        {location.type === "franchise" ? (
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">
                                Ubicación
                              </span>
                              <span className="profile-ud-value">
                                {user.ubication}
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </Block>

                    <div className="nk-divider divider md"></div>
                  </div>
                </div>
              </div>
            </Card>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default UserDetailsPage;
