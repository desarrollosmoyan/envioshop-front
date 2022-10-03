import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Form, FormGroup } from "reactstrap";
import { Button } from "../../components/Component";
import { companyLogos } from "../../constants";
import { Document, Page } from "react-pdf";
import { ErrorMessage } from "@hookform/error-message";
import CheckoutPage from "./checkout/CheckoutPage";
import { useState } from "react";
import CheckoutPage2 from "./checkout/CheckoutPage2";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function Checkout() {
  const service = useSelector((state) => state.rating.selected);
  const pdf = useSelector((state) => state.pdf.data);
  console.log(pdf);
  const [page, setPage] = useState(1);
  return (
    <div
      className="p-3 d-flex align-items-center"
      style={{
        justifyContent: "space-between",
        border: "1px solid black",
        minHeight: "100vh",
        height: "100vh",
      }}
    >
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
      <div className=" ml-2 w-50 align-self-center text-center h-100">
        {pdf ? (
          <embed
            src={`data:application/pdf;base64,${pdf}`}
            className="w-100 h-100 "
          />
        ) : (
          <h5>Acá se mostrará el PDF</h5>
        )}
      </div>
    </div>
  );
}
