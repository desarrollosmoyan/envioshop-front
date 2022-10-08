import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  PreviewAltCard,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { filterStatus, userData } from "./UserData";
import { findUpper, url } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { API_ENDPOINTS } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
const FranchiseManagment = () => {
  const {
    responseData: franchisesList,
    isLoading: loadingFranchises,
    setResponseData: setFranchisesList,
    error,
  } = useAxios({
    url: API_ENDPOINTS.users.franchises.allFranchises,
    isLazy: false,
    initialData: [],
    method: "GET",
  });
  const [sm, updateSm] = useState(false);
  const [onSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    balance: "",
    phone: "",
    status: "Active",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  // unselects the data on mount
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setFranchisesList([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setFranchisesList([...filteredObject]);
    } else {
      setFranchisesList([]);
    }
  }, [onSearchText, setFranchisesList]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = franchisesList;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setFranchisesList([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      balance: "",
      phone: "",
      status: "Active",
    });
  };
  // function to add a new franchise
  const createNewFranchise = async (body) => {
    const url = `${API_ENDPOINTS.baseUrl}${API_ENDPOINTS.users.franchises.createFranchise}`;
    console.log(url);
    try {
      const { data } = await axios({
        method: "POST",
        url: url,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Franquicia creada con éxito");
    } catch (error) {
      console.log(error.message);
    }
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { name, email, cellphone, ubication } = submitData;
    let submittedData = {
      name: name,
      email: email,
      password: "franquicia",
      cellphone: cellphone,
      ubication: ubication,
    };
    createNewFranchise(submittedData)
      .then((data) => {
        console.log(data);
        setFranchisesList([submittedData, ...franchisesList]);
      })
      .catch((error) => {
        toast({ type: "error", message: "Algo salio mal" });
      });

    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { name, email, cellphone } = submitData;
    let submittedData;
    let newitems = franchisesList;
    newitems.forEach((item, i) => {
      if (item.id === editId) {
        submittedData = {
          id: i,
          name: name,
          email: email,
          cellphone: "+52" + cellphone,
          ubication: item.ubication,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    franchisesList.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          email: item.email,
          cellphone: item.cellphone,
          ubication: item.ubication,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = franchisesList;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
    setFranchisesList([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = franchisesList.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setFranchisesList([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteUser = async () => {
    let newData;
    newData = franchisesList.filter((item) => item.checked !== true);
    console.log(newData);
    const { data } = await axios.delete(
      `${API_ENDPOINTS.users.franchises.deleteFranchise}/${newData[0].id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);

    setFranchisesList([...newData]);
  };

  // function to change the complete property of an item
  const selectorSuspendUser = () => {
    let newData;
    newData = franchisesList.map((item) => {
      if (item.checked === true) item.status = "Suspend";
      return item;
    });
    setFranchisesList([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = franchisesList.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();
  const [role, setRole] = useState("cashier");
  return (
    <React.Fragment>
      <Head title="User List - Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Franquicias
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>{`Actualmente hay ${franchisesList.length} franquicias.`}</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${
                    sm ? "active" : ""
                  }`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div
                  className="toggle-expand-content"
                  style={{ display: sm ? "block" : "none" }}
                >
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>Export</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        color="primary"
                        className="btn-icon"
                        onClick={() => setModal({ add: true })}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <ToastContainer />
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    onChange={(e) => selectorCheck(e)}
                    id="uid"
                  />
                  <label className="custom-control-label" htmlFor="uid"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Franquicia</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Teléfono</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Ubicación</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Cant. de Cajeros</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Cant. de Ventas</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-col-tools text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    color="tranparent"
                    className="dropdown-toggle btn btn-icon btn-trigger mr-n1"
                  >
                    <Icon name="more-h"></Icon>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <ul className="link-list-opt no-bdr">
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            selectorDeleteUser();
                          }}
                        >
                          <Icon name="na"></Icon>
                          <span>Eliminar</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            selectorSuspendUser();
                          }}
                        >
                          <Icon name="trash"></Icon>
                          <span>Suspend Selected</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input form-control"
                          defaultChecked={item.checked}
                          id={item.id + "uid1"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item.id)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={item.id + "uid1"}
                        ></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-details-regular/${item.id}`}
                      >
                        <div className="user-card">
                          <UserAvatar
                            theme={item.avatarBg}
                            text={findUpper(item.name)}
                            image={item.image}
                          ></UserAvatar>
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.name}{" "}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </Link>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>+{item.cellphone}</span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{item.ubication}</span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{parseInt(Math.random() * 6)}</span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{0}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span
                        className={`tb-status text-${
                          item.status === "Active"
                            ? "success"
                            : item.status === "Pending"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        <li
                          className="nk-tb-action-hidden"
                          onClick={() => onEditClick(item.id)}
                        >
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"edit" + item.id}
                            icon="edit-alt-fill"
                            direction="top"
                            text="Editar"
                          />
                        </li>
                        {item.status !== "Suspend" && (
                          <React.Fragment>
                            <li
                              className="nk-tb-action-hidden"
                              onClick={() => suspendUser(item.id)}
                            >
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"suspend" + item.id}
                                icon="user-cross-fill"
                                direction="top"
                                text="Suspend"
                              />
                            </li>
                          </React.Fragment>
                        )}
                        <li>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              tag="a"
                              className="dropdown-toggle btn btn-icon btn-trigger"
                            >
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                <li onClick={() => onEditClick(item.id)}>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    <Icon name="edit"></Icon>
                                    <span>Edit</span>
                                  </DropdownItem>
                                </li>
                                {item.status !== "Suspend" && (
                                  <React.Fragment>
                                    <li className="divider"></li>
                                    <li onClick={() => suspendUser(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#suspend"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="na"></Icon>
                                        <span>Suspend User</span>
                                      </DropdownItem>
                                    </li>
                                  </React.Fragment>
                                )}
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {currentItems.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={franchisesList.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No data found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal
          isOpen={modal.add}
          toggle={() => setModal({ add: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Añadir Franquicia</h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && (
                        <span className="invalid">{errors.name.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email </label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "Este campo es requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Correo electrónico invalido",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6" className="mt-2">
                    <FormGroup>
                      <label className="form-label">Teléfono</label>
                      <input
                        placeholder="12345678"
                        className="form-control"
                        type="text"
                        name="cellphone"
                        defaultValue={formData.cellphone}
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.phone && (
                        <span className="invalid">{errors.phone.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6" className="mt-2">
                    <FormGroup>
                      <label className="form-label">Ubicación</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="México"
                        name="ubication"
                        defaultValue={formData.ubication}
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.phone && (
                        <span className="invalid">{errors.phone.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col size="12" className="mt-2">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Crear franquicia
                        </Button>
                      </li>
                      <li className="ml-2">
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          <Button color="danger">Cancelar</Button>
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modal.edit}
          toggle={() => setModal({ edit: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Editar franquicia</h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  onSubmit={handleSubmit(onEditSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && (
                        <span className="invalid">{errors.name.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Teléfono</label>
                      <input
                        className="form-control"
                        type="number"
                        name="cellphone"
                        defaultValue={Number(formData.cellphone)}
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.phone && (
                        <span className="invalid">{errors.phone.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6" className="mb-2">
                    <FormGroup>
                      <label className="form-label">Ubicación</label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={formData.ubication}
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.ubication && (
                        <span className="invalid">
                          {errors.ubication.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Franquicia
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          <Button className="ml-2" color="danger">
                            Cancelar
                          </Button>
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default FranchiseManagment;
