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
export default function ShipmentManagment() {
  const {
    responseData: shipmentsList,
    error,
    isLoading,
  } = useAxios({ url: "", initialData: [], method: "GET" });
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
                <p>{`Actualmente hay ${3} envios.`}</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent></BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          {/*<ReactDataTable
            data={responseData}
            columns={dataTableColumns}
            expandableRows
            pagination
  />*/}
        </Block>
      </Content>
    </>
  );
}
