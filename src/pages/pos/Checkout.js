import { companyLogos } from "../../constants";
import CheckoutPage from "./checkout/CheckoutPage";
import { useState } from "react";
import CheckoutPage2 from "./checkout/CheckoutPage2";
import Head from "../../layout/head/Head";
import { useSelector } from "react-redux";
import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import { Button, Col, Row } from "reactstrap";
import CheckoutPage3 from "./checkout/CheckoutPage3";
import CoinModal from "../../components/coin-modal/CoinModal";

export default function Checkout() {
  const service = useSelector((state) => state.rating.selected);
  const pdf = useSelector((state) => state.pdf.data);
  const [open, setOpen] = useState(false);
  console.log(pdf);
  const [page, setPage] = useState(1);
  return (
    <div className="vh-100">
      <Head title="Checkout" />
      <Content className="h-100">
        <CoinModal open={open} setOpen={setOpen} />
        <BlockHead size="sm" className="mb-0">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Checkout
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <div
          className="p-3 d-flex align-items-center justify-content-between h-100"
          style={{ height: "500px" }}
        >
          <div className="w-50 h-100 justify-content-between">
            <div
              className="d-flex border rounded-sm mb-2"
              style={{
                gap: "1rem",
              }}
            >
              <div className="d-flex align-items-center">
                <img
                  className="my-0 mx-auto align-self-center"
                  style={{
                    width: "150px",
                    objectFit: "cover",
                  }}
                  src={companyLogos[service.company]}
                  alt="company-img"
                />
              </div>
              <div>
                <h5>{service.company}</h5>
                <h6>{service.serviceName}</h6>
                <span>Coste: {service.prices.total}</span>
              </div>
            </div>
            {page === 1 ? (
              <CheckoutPage setPage={setPage} />
            ) : page === 2 ? (
              <CheckoutPage2 setPage={setPage} company={service.company} />
            ) : page === 3 ? (
              <CheckoutPage3 setPage={setPage} company={service.company} />
            ) : null}
          </div>
          <div className="ml-2 w-50 h-100 d-flex justify-content-between flex-column border">
            {pdf ? (
              <>
                <iframe
                  title="pepe"
                  className="w-100"
                  style={{ height: "500px" }}
                  src={
                    !pdf.includes("blob")
                      ? `data:application/pdf;base64,${pdf}`
                      : pdf
                  }
                ></iframe>
                <Row className="mt-3">
                  <Col>
                    <Button color="info">Imprimir</Button>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      onClick={() => {
                        setOpen(true);
                      }}
                      color="success"
                      className="align-self-end"
                    >
                      Finalizar
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <h5>Acá se mostrará el PDF</h5>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
