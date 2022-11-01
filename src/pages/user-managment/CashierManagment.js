import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
  Row,
} from "reactstrap";
import AsyncSelect from "react-select/async";
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
import { userData } from "./UserData";
import { findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useUser from "../../hooks/useUser";
import exportFromJSON from "export-from-json";
import { useCookie } from "react-use";
import axios from "axios";
import { useSelector } from "react-redux";
import { components } from "react-select";
const CashierManagment = () => {
  const [token] = useCookie("token");
  const { getAll, create, deleteOne, updateOne, deleteMany } =
    useUser("cashier");
  const { getAll: getAllFranchises, getBySearch: getFranchiseBySearch } =
    useUser("franchise");
  const [cashiersList, setCashiersList] = useState([]);
  const [franchiseList, setFranchisesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [itemPerList, setItemPerList] = useState(5);
  const [listPage, setListPage] = useState(0);
  const [currentFranchise, setCurrentFranchise] = useState(null);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [franchiseCount, setFranchiseCount] = useState(0);
  const [searchFranchiseText, setSearchFranchiseText] = useState(0);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.type === "admin") {
      getAll(
        [(currentPage - 1) * itemPerPage, itemPerPage],
        setCashiersList,
        setCount
      );
      getAllFranchises(
        [listPage * itemPerList, itemPerList],
        setFranchisesList,
        setFranchiseCount
      );
      return;
    }
    if (user.type === "franchise") {
      getMe();
    }
  }, [itemPerPage, currentPage, user, listPage, itemPerList]);

  useEffect(() => {
    if (user.type !== "admin") return;
    getFranchiseBySearch(
      searchFranchiseText,
      [listPage * itemPerList, itemPerList],
      setFranchisesList
    );
  }, [searchFranchiseText, listPage, itemPerList, user]);
  const getMe = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentFranchise(resp.data.user);
      setCashiersList(resp.data.user.cashiers);
      console.log(resp.data.user);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
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
    franchiseId: "",
  });

  // unselects the data on mount
  useEffect(() => {
    if (cashiersList.length === 0) return;
    let newData;
    newData = cashiersList.map((item) => {
      item.checked = false;
      return item;
    });
    setCashiersList([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Changing state value when searching name

  const filterFranchisesByName = async (inputValue) => {
    const data = await getFranchiseBySearch(inputValue, [0, 10]);
    return data.map((f) => ({ label: f.name, value: f.id }));
  };
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setCashiersList([...filteredObject]);
    } else {
      setCashiersList([]);
    }
  }, [onSearchText, setCashiersList]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = cashiersList;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setCashiersList([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      franchiseId: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  const refetchData = async () => {
    if (user.type === "franchise") return getMe();
    if (selectedFranchise)
      return getAllCashiersFromOneFranchise(selectedFranchise);
    getAll(
      [(currentPage - 1) * itemPerPage, itemPerPage],
      setCashiersList,
      setCount
    );
    getAllFranchises(
      [listPage * itemPerList, itemPerList],
      setFranchisesList,
      setFranchiseCount
    );
  };
  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { name, email, password, franchiseId } = submitData;
    console.log({ franchiseId });
    //const { franchiseId } = formData;
    let submittedData = {
      name: name,
      email: email,
      password: password,
      franchiseId:
        user.type === "franchise" ? currentFranchise.id : franchiseId.value,
    };
    create(submittedData)
      .then(() => toast("Cajero creado con éxito", { type: "success" }))
      .catch((error) => {
        toast("Algo salió mal!", { type: "error" });
      })
      .finally(() => {
        refetchData();
      });
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { name, email, franchiseId } = submitData;
    let submittedData;
    let newitems = cashiersList;
    console.log(submitData);
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          name: name,
          email: email,
          franchiseId:
            user.type === "franchise" ? currentFranchise.id : franchiseId,
        };
      }
    });
    updateOne(editId, submittedData)
      .then(() => {
        toast(`Cajero editado con éxito`, { type: "success" });
      })
      .catch((error) => {
        console.log(error);
        toast("Algo salio mal!", { type: "error" });
      })
      .finally(() => {
        refetchData();
      });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = {
      ...newitems[index],
      name: submittedData.name,
      email: submittedData.email,
      franchise: {
        ...franchiseList.find((f) => f.id === franchiseId),
      },
    };
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    cashiersList.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          email: item.email,
          franchiseId:
            user.type === "franchise" ? currentFranchise.id : item.franchiseId,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    console.log(e);
    let newData;
    newData = cashiersList.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setCashiersList([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteUser = async () => {
    let newData = cashiersList.filter((item) => item.checked === true);
    let restData = cashiersList.filter((item) => item.checked !== true);
    if (restData.length > 0) {
      const arrIds = newData.map((item) => item.id);
      deleteMany(arrIds)
        .then(() => toast("Cajeros eliminadas con éxito", { type: "success" }))
        .catch((error) => toast("Algo ha salido mal!", { type: "error" }))
        .finally(() => {
          refetchData();
        });
      setFranchisesList([...restData]);
      return;
    }
    deleteOne(newData[0].id)
      .then(() => toast("Franquicia eliminada con éxito", { type: "success" }))
      .catch((error) => toast("Algo ha salido mal!", { type: "error" }))
      .finally(() => {
        refetchData();
      });
    setFranchisesList([...restData]);
    return;
  };
  const handleDeleteSingle = async ({ id }) => {
    deleteOne(id)
      .then(() => toast("Cajero eliminado con éxito", { type: "success" }))
      .catch((error) => toast("Algo ha salido mal!", { type: "error" }))
      .finally(() => {
        refetchData();
      });
  };
  const currentItems = cashiersList;
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const exportCSV = () => {
    const fileName = `Lista de Cajeros-${new Date(
      Date.now()
    ).toLocaleDateString()}`;
    const data = cashiersList.map((e) => ({
      nombre: e.name,
      franquicia: e.franchise.name,
      email: e.email,
      "Fecha de creación": new Date(e.createdAt).toLocaleDateString(),
      "Email Franquicia": e.franchise.email,
    }));
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const onChangeFranchise = async (e) => {
    const franchiseId = user.type === "admin" ? e.value : currentFranchise.id;
    await getAllCashiersFromOneFranchise(franchiseId);
    setSelectedFranchise(franchiseId);
  };
  const getAllCashiersFromOneFranchise = async (id) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/user/cashier/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset: 0,
          limit: itemPerPage,
        },
      });
      setCashiersList(data.cashiers);
    } catch (error) {
      toast("Algo salió mal!", { type: "error" });
    }
  };

  const onLoadMoreClick = () => {
    setItemPerList(itemPerList + 10);
  };
  const { errors, register, handleSubmit, control } = useForm();
  return (
    <React.Fragment>
      <Head title="Gestión de Cajeros"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Cajeros
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>{`Actualmente hay ${cashiersList?.length} cajeros.`}</p>
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
                      <Button
                        onClick={exportCSV}
                        color="light"
                        outline
                        className="btn-white"
                      >
                        <Icon name="download-cloud"></Icon>
                        <span>Exportar</span>
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
          <Row className="justify-content-between">
            <div className="w-50">
              {user.type === "admin" ? (
                <div className="d-flex flex-row w-100">
                  <div className="form-control-select w-50">
                    <AsyncSelect
                      maxMenuHeight={160}
                      loadingMessage={() => "Cargando Franquicias..."}
                      placeholder="Filtrar por nombre de franquicia"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={onChangeFranchise}
                      defaultOptions={franchiseList.map((f) => ({
                        label: f.name,
                        value: f.id,
                      }))}
                      loadOptions={(inputValue) =>
                        filterFranchisesByName(inputValue)
                      }
                      components={{
                        MenuList: (menuListProps) => (
                          <SelectMenuButton
                            {...menuListProps}
                            onClick={onLoadMoreClick}
                          />
                        ),
                      }}
                      noOptionsMessage={() => "No hay opciones"}
                    />
                  </div>
                  <div className="">
                    <Button color="primary" type="button">
                      Limpiar Filtros
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-25">
                  <input
                    placeholder="Nombre del cajero..."
                    type="search"
                    className="form-control form-control-md"
                  />
                </div>
              )}
            </div>
            <div className="w-15 align-self-end">
              <RSelect
                placeholder="Mostrar de:"
                options={[5, 10, 20].map((e) => ({ label: e, value: e }))}
                onChange={(e) => {
                  setItemPerPage(e.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </Row>
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
                <span className="sub-text">Usuario</span>
              </DataTableRow>
              <DataTableRow size="lg">
                {user.type === "admin" ? (
                  <span className="sub-text">Franquicia</span>
                ) : null}
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Fecha de creación</span>
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
                          <span>Eliminar seleccionado</span>
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
                        to={{
                          pathname: `${process.env.PUBLIC_URL}/user-details-regular/${item.id}`,
                          state: {
                            type: "cashier",
                          },
                        }}
                      >
                        <div className="user-card">
                          <UserAvatar
                            theme={"primary"}
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
                    <DataTableRow>
                      {user.type === "admin" ? (
                        <span>{item.franchise.name}</span>
                      ) : null}
                    </DataTableRow>
                    <DataTableRow>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
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
                                    <span>Editar</span>
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      handleDeleteSingle({ id: item.id });
                                    }}
                                  >
                                    <Icon name="na"></Icon>
                                    <span>Eliminar</span>
                                  </DropdownItem>
                                </li>
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
                totalItems={count}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No hay cajeros</span>
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
              <h5 className="title">Crear cajero</h5>
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
                        type="email"
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
                  {user.type !== "franchise" && (
                    <Col md="6" className="mt-2">
                      <FormGroup>
                        <label className="form-label">
                          Seleccionar franquicia
                        </label>
                        <div className="form-control-wrap">
                          <Controller
                            name="franchiseId"
                            control={control}
                            render={({ onChange, ref, value }) => (
                              <div className="form-control-select">
                                <AsyncSelect
                                  loadingMessage={() =>
                                    "Cargando Franquicias..."
                                  }
                                  className="react-select-container"
                                  classNamePrefix="react-select"
                                  onChange={onChange}
                                  defaultOptions={franchiseList.map((f) => ({
                                    label: f.name,
                                    value: f.id,
                                  }))}
                                  loadOptions={(inputValue) =>
                                    filterFranchisesByName(inputValue)
                                  }
                                  noOptionsMessage={() => "No hay opciones"}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  )}
                  <Col md="6" className="mt-2">
                    <FormGroup>
                      <label className="form-label">Contraseña</label>
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        defaultValue={formData.password}
                        placeholder="Enter email"
                        ref={register({
                          required: "Este campo es requerido",
                        })}
                      />
                      {errors.password && (
                        <span className="invalid">
                          {errors.password.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col size="12" className="mt-4">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Crear usuario
                        </Button>
                      </li>
                      <li className="ml-4">
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
              <h5 className="title">Editar cajero</h5>
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
                        placeholder="Ingrese el nombre"
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
                        placeholder="Ingrese el email"
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
                  {user.type !== "franchise" && (
                    <Col md="12" className="mt-2 mb-2">
                      <FormGroup>
                        <label className="form-label">
                          Selecciona Franquicia
                        </label>
                        <div className="form-control-wrap">
                          <Controller
                            name="franchiseId"
                            control={control}
                            render={({ onChange, ref, value }) => (
                              <RSelect
                                value={value}
                                inputRef={ref}
                                options={franchiseList.map((item) => ({
                                  label: item.name,
                                  value: item.id,
                                }))}
                                placeholder="Selecciona franquicia"
                                onChange={(e) => {
                                  onChange(e.value);
                                  console.log(e);
                                }}
                              />
                            )}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  )}
                  <Col size="12" className="mt-2">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li className="mr-4">
                        <Button color="primary" size="md" type="submit">
                          Confirmar edición
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
                          <Button color="danger" size="md">
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

const SelectMenuButton = ({ onClick, ...props }) => {
  return (
    <components.MenuList {...props}>
      {props.children}
      <div className="w-100 d-flex aling-items-center justify-content-center">
        <Button
          type="button"
          onClick={onClick}
          className=""
          color="primary"
          size="xs"
        >
          Cargar más
        </Button>
      </div>
    </components.MenuList>
  );
};

export default CashierManagment;
