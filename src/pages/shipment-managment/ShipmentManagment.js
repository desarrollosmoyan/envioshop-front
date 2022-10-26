import React from 'react';
import Head from '../../layout/head/Head';
import Content from '../../layout/content/Content';
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Block,
} from '../../components/Component';
import useAxios from '../../hooks/useAxios';
import { defaultShipmentData } from '../../constants';
import useShipment from '../../hooks/useShipment';
import { ReactDataTable } from '../../components/Component';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
export default function ShipmentManagment() {
  const { getAll } = useShipment();

  const columns = [
    {
      name: 'Empresa',
      selector: (row) => row?.serviceName,
    },
    {
      name: 'Servicio',
      selector: (row) => row?.serviceType,
    },
    {
      name: 'Precio',
      selector: (row) => row?.shipmentPrice,
    },
    {
      name: 'Franquicia',
      selector: (row) => row?.franchise?.name,
    },
    {
      name: 'Cajero',
      selector: (row) => row?.Turn?.cashier?.name,
    },
    {
      name: 'Fecha y Hora',
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Documento',
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
      selector: (row) => 'Descargar Documento',
    },
  ];

  const downloadPDF = (pdfInBase64) => {
    const linkSource = `data:application/pdf;base64,${pdfInBase64}`;
  };
  const [cols, setCols] = useState(columns);
  const [sales, setSalesList] = useState([]);
  useEffect(() => {
    getAll([0, 20], setSalesList);
  }, []);
  const keyMap = {
    serviceName: 'Empresa',
    serviceType: 'Servicio',
    price: 'Precio',
    franchise: 'Franquicia',
    cashier: 'Cajero',
    createdAt: 'Fecha y Hora',
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
                <p>{`Actualmente hay ${sales.length} envios.`}</p>
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
