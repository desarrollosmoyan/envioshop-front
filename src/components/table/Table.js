import React from "react";
import { basicData } from "./TableData";
import classNames from "classnames";
import DHLLOGO from "../../assets/images/services/DHL.png";
import FEDEXLOGO from "../../assets/images/services/fedex.jpg";
import UPSLOGO from "../../assets/images/services/UPS.png";
import ESTAFETALOGO from "../../assets/images/services/estafeta.jpg";
import PAQUETEEXPRESSLOGO from "../../assets/images/services/PAQUETE EXPRESS.png";
import { Link } from "react-router-dom";
import { FormGroup } from "reactstrap";
import { Button } from "../Component";
import Input from "../input/input/Input";
import { useDispatch } from "react-redux";
import { selectRating, setRating } from "../../store/store";

const Table = ({
  tableData,
  headData,
  headColor,
  striped,
  border,
  hover,
  responsive,
}) => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(selectRating({ selected: item }));
  };
  const tableClass = classNames({
    table: true,
    "table-bordered": border,
    "table-borderless": !border,
    "table-striped": striped,
    "table-hover": hover,
  });
  const companyImgs = {
    DHL: DHLLOGO,
    FEDEX: FEDEXLOGO,
    UPS: UPSLOGO,
    ESTAFETA: ESTAFETALOGO,
    "PAQUETE EXPRESS": PAQUETEEXPRESSLOGO,
  };
  return (
    <div className={`${responsive ? "table-responsive" : ""} h-100`}>
      <table className={tableClass}>
        <thead className={`${headColor ? `thead-${headColor}` : ""}`}>
          <tr>
            {headData?.map((item, idx) => {
              return (
                <th colSpan="1" key={idx}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="w-100">
          {tableData?.data.map((item, i) => {
            if (
              item.prices.total === 0 ||
              item.prices.subTotal === 0 ||
              Object.keys(item).length === 0
            ) {
              return;
            }
            return (
              <tr key={`item-${i}`} className="border border-2">
                <td className="w-100 align-middle">
                  <img
                    className="logo-img my-0 mx-auto d-block"
                    src={companyImgs[item.company]}
                    alt="company-img"
                  />
                </td>
                <td className="align-middle">{item.serviceName}</td>
                <td className="align-middle">
                  {item.company === "FEDEX"
                    ? parseFloat(item.prices["0"].subTotal)
                    : parseFloat(item.prices.subTotal)}
                </td>
                <td className="align-middle">
                  {item.company === "FEDEX"
                    ? parseFloat(item.prices["0"].total)
                    : parseFloat(item.prices.total)}
                </td>
                <td className="align-middle">
                  <Button
                    color="primary"
                    onClick={() => handleClick(item)}
                    size="sm"
                  >
                    Seleccionar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            {headData?.map((item, idx) => {
              return (
                <th colSpan="1" key={idx}>
                  {item}
                </th>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Table;
