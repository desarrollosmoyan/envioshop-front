import React from "react";
import { basicData } from "./TableData";
import classNames from "classnames";
import { companyLogos } from "../../constants";
import { Link } from "react-router-dom";
import { FormGroup } from "reactstrap";
import { Button } from "../Component";
import Input from "../input/input/Input";
import { useDispatch } from "react-redux";
import { selectRating, setRating } from "../../store/store";
import { useSelector } from "react-redux";

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
  const selected = useSelector((state) => state.rating.selected);
  console.log(tableData);
  const handleClick = (item) => {
    dispatch(selectRating({ selected: { ...selected, ...item } }));
  };
  console.log(selected);
  const tableClass = classNames({
    table: true,
    "table-bordered": border,
    "table-borderless": !border,
    "table-striped": striped,
    "table-hover": hover,
  });
  const companyImgs = {
    DHL: companyLogos.DHL,
    FEDEX: companyLogos.FEDEX,
    UPS: companyLogos.UPS,
    ESTAFETA: companyLogos.ESTAFETA,
    REDPACK: companyLogos.REDPACK,
    "PAQUETE EXPRESS": companyLogos.PAQUETEEXPRESS,
  };
  return (
    <div
      className={`${responsive ? "table-responsive" : ""} h-100`}
      style={{ overflowX: "hidden" }}
    >
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
        <tbody className="w-100 h-50">
          {tableData?.data.map((item, i) => {
            if (item === null) {
              return;
            }
            if (Object.keys(item).length === 0 || item.prices.subTotal === 0) {
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
