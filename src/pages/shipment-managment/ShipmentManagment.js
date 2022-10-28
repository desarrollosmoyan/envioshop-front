import React from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
} from "../../components/Component";
import useAxios from "../../hooks/useAxios";
import { defaultShipmentData } from "../../constants";
import useShipment from "../../hooks/useShipment";
import { ReactDataTable } from "../../components/Component";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { request } from "../../constants";
import { useCookie } from "react-use";
//import toast from "react-toastify";
export default function ShipmentManagment() {
  const [count, setCount] = useState(0);
  const { getAll, getCount } = useShipment();
  const [token] = useCookie("token");
  const { currentPage, limit } = useSelector((state) => state.shipmentPage);
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
  useEffect(() => {
    if (user.type === "admin") {
      getAll([(currentPage - 1) * limit, limit], setSalesList, setCount);
    } else {
      getMe();
    }
  }, [currentPage, limit]);

  const getMe = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: "/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.user);
      setSalesList(data.user.sales);
    } catch (error) {
      //toast("Algo salió mal!", { type: "error" });
    }
  };
  const keyMap = {
    serviceName: "Empresa",
    serviceType: "Servicio",
    price: "Precio",
    franchise: "Franquicia",
    cashier: "Cajero",
    createdAt: "Fecha y Hora",
  };
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
          {sales.length !== 0 ? (
            <ReactDataTable
              keyMap={keyMap}
              data={sales}
              columns={cols}
              count={count}
              expandableRows
              pagination
              actions
            />
          ) : null}
        </Block>
      </Content>
    </>
  );
}
