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
import { Page, Text, View, Document, Link } from "@react-pdf/renderer";
import Content from "../../layout/content/Content";

export default function Checkout() {
  const service = useSelector((state) => state.rating.selected);
  const pdf = useSelector((state) => state.pdf.data);
  console.log(pdf);
  const [page, setPage] = useState(1);
  return (
    <div className="vh-100">
      <Head title="Checkout" />
      <Content className="h-100">
        <BlockHead size="sm" className="mb-0">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Checkout
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <div className="p-3 d-flex align-items-center h-100">
          <div className="w-50">
            <div
              className="d-flex border rounded-sm mb-2"
              style={{
                gap: "1rem",
              }}
            >
              <div>
                <img
                  className="my-0 mx-auto"
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
            ) : null}
          </div>
          <div className="ml-2 w-50 d-block h-100 ">
            {pdf ? (
              <>
                <iframe
                  title="pepe"
                  className="w-100"
                  src={`data:application/pdf;base64,${pdf}`}
                ></iframe>
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
