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
  Row,
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
  PreviewAltCard,
  RSelect,
} from "../../components/Component";
import { components } from "react-select";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { findUpper, setDateForPicker } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useUser from "../../hooks/useUser";
import exportFromJSON from "export-from-json";
import { useCallback } from "react";
import axios from "axios";
import { useCookie } from "react-use";
import useShipment from "../../hooks/useShipment";
import { useSelector } from "react-redux";
import { request } from "../../constants";
import ReactDatePicker from "react-datepicker";
export default function ShipmentManagment() {
  const [count, setCount] = useState(0);
  const { getAll, getCount, getAllFranchisesWithSales } = useShipment();
  const [token] = useCookie("token");
  //const { currentPage, limit } = useSelector((state) => state.shipmentPage);
  //const [currentFranchise, setCurrentFranchise] = useState({});
  const columns = [
    {
      name: "Empresa",
      selector: (row) => row?.serviceName,
    },
    {
      name: "Servicio",
      selector: (row) => row?.serviceType,
    },
    {
      name: "Precio",
      selector: (row) => row?.shipmentPrice,
    },
    {
      name: "Franquicia",
      selector: (row) => row?.franchise?.name,
    },
    {
      name: "Cajero",
      selector: (row) => row?.Turn?.cashier?.name,
    },
    {
      name: "Fecha y Hora",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Documento",
      cell: (row) => (
        <a
          download={`Documento-Envio-${new Date(
            row.createdAt
          ).toLocaleDateString()}`}
          target="_blank"
          href={`data:application/pdf;base64,${row.shipmentPdf}`}
        >
          <Button color="primary">Descargar PDF</Button>
        </a>
      ),
      selector: (row) => "Descargar Documento",
    },
  ];
  const user = useSelector((state) => state.user);
  const [cols] = useState(columns);
  const [sales, setSalesList] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [franchiseItemList, setFranchiseItemList] = useState(5);
  const [service, setService] = useState("");
  const [lte, setLte] = useState("");
  const [gte, setGte] = useState("");
  const [serviceFilter] = useState([
    "",
    "DHL",
    "FEDEX",
    "UPS",
    "REDPACK",
    "PAQUETE EXPRESS",
    "ESTAFETA",
  ]);
  const [franchisesFilter, setFranchisesFilter] = useState([]);
  console.log(franchiseItemList);
  useEffect(() => {
    if (user.type === "admin" || localStorage.getItem("type") === "admin") {
      getAllFranchisesWithSales([0, franchiseItemList], setFranchisesFilter);
      return;
    }
    return;
  }, [franchiseItemList]);
  useEffect(() => {
    if (user.type === "admin" || localStorage.getItem("type") === "admin") {
      memoizedGetAll();
    } else {
      getMe();
    }
  }, [page, itemPerPage, service, lte, gte]);
  const memoizedGetAll = useCallback(() => {
    getAll(
      [(page - 1) * itemPerPage, itemPerPage, service, lte, gte],
      setSalesList,
      setCount
    );
  }, [page, itemPerPage, service, lte, gte]);

  useEffect(() => {}, []);
  const getMe = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: "/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSalesList(data.user.sales);
    } catch (error) {
      //toast("Algo salió mal!", { type: "error" });
    }
  };
  const currentItems = sales;
  //sconsole.log(currentItems);
  console.log(franchisesFilter);

  const keyMap = {
    serviceName: "Empresa",
    serviceType: "Servicio",
    price: "Precio",
    franchise: "Franquicia",
    cashier: "Cajero",
    createdAt: "Fecha y Hora",
  };
  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <>
      <Head title="Gestión de envios" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Gestión de envios
              </BlockTitle>
              <BlockDes>
                <p>{`Actualmente hay ${count} envios.`}</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent></BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="align-items-center justify-content-between">
            <div className="w-50 d-flex">
              <FormGroup className="w-25">
                <RSelect
                  placeholder="Servicio"
                  options={serviceFilter.map((item) => ({
                    value: item,
                    label: item.length > 0 ? item : "Seleccionar todos",
                  }))}
                  onChange={(e) => {
                    setService(e.value);
                  }}
                />
              </FormGroup>
              {user.type === "admin" ||
              localStorage.getItem("type") === "admin" ? (
                <FormGroup className="ml-2 w-25">
                  <RSelect
                    placeholder="Franquicia"
                    options={franchisesFilter.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    components={{
                      MenuList: (menuListProps) => (
                        <SelectMenuButton
                          {...menuListProps}
                          onLoadMoreFranchises={() => {
                            console.log("el pepe");
                            setFranchiseItemList(franchiseItemList + 10);
                          }}
                        />
                      ),
                    }}
                  />
                </FormGroup>
              ) : null}
              <FormGroup className="ml-2 w-25">
                <ReactDatePicker
                  id="lte"
                  name="lte"
                  placeholderText="Fecha inicio"
                  selected={lte}
                  className="form-control form-control-md"
                  onChange={(newDate) => setLte(newDate)}
                />
              </FormGroup>
              <FormGroup className="ml-2 w-25 ">
                <ReactDatePicker
                  id="gte"
                  placeholderText="Fecha fin"
                  name="gte"
                  selected={gte}
                  className="form-control form-control-md"
                  onChange={(newDate) => setGte(newDate)}
                />
              </FormGroup>
            </div>
            <div className="w-50  d-flex justify-content-end">
              <FormGroup className="w-25">
                <RSelect
                  placeholder="Mostrar de:"
                  options={[5, 10, 20].map((e) => ({ label: e, value: e }))}
                  onChange={(e) => {
                    setItemPerPage(e.value);
                    setPage(1);
                  }}
                />
              </FormGroup>
              <FormGroup className="ml-2 w-25 ">
                <Button
                  color="primary"
                  onClick={() => {
                    setLte("");
                    setGte("");
                    setService("");
                    setPage(1);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </FormGroup>
            </div>
          </Row>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item text-left">
              <DataTableRow>
                {user.type === "admin" ||
                localStorage.getItem("type") === "admin" ? (
                  <span className="sub-text">Franquicia</span>
                ) : (
                  <span className="sub-text">Cajero</span>
                )}
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Tracking Number</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Fecha de creación</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Proveedor</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Valor</span>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow>
                      <span>{item.franchise.name}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{item.shipmentTrackingNumber}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{item.serviceName}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{parseFloat(item.shipmentPrice)} MXN</span>
                    </DataTableRow>
                    <DataTableRow>
                      <a
                        download={`Documento-Envio-${new Date(
                          item.createdAt
                        ).toLocaleDateString()}`}
                        target="_blank"
                        rel="noreferrer"
                        href={`data:application/pdf;base64,${item.shipmentPdf}`}
                      >
                        <Button color="primary">Descargar PDF</Button>
                      </a>
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
                currentPage={page}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No data found</span>
              </div>
            )}
          </PreviewAltCard>
          {/*{sales.length !== 0 ? (
            <ReactDataTable
              keyMap={keyMap}
              data={sales}
              limit={itemPerPage}
              columns={cols}
              count={count}
              expandableRows
              pagination
              actions
              setLimit={setItemPerPage}
              setPage={setPage}
            />
          ) : null}
          */}
        </Block>
      </Content>
    </>
  );
}
const SelectMenuButton = ({ onLoadMoreFranchises, ...props }) => {
  return (
    <components.MenuList {...props}>
      {props.children}
      <div className="w-100 d-flex aling-items-center justify-content-center">
        <Button
          onClick={onLoadMoreFranchises}
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
