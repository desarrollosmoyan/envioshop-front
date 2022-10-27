import React, { useEffect, useState } from "react";
import {
  Card,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import {
  productData,
  productDataSet2,
  productDataSet3,
  productDataSet4,
} from "./ProductData";

const TopProducts = () => {
  const [data, setData] = useState("Weekly");
  const [dataSet, setDataSet] = useState(productData);

  useEffect(() => {
    let object;
    if (data === "Daily") {
      object = productDataSet2;
    } else if (data === "Monthly") {
      object = productDataSet3;
    } else {
      object = productDataSet4;
    }
    setDataSet(object);
  }, [data]);

  const returnTotal = (n1, n2) => {
    var result = n1 * Number(n2);
    return result.toFixed(2);
  };

  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">TOP Franquicias</h6>
          </div>
        </div>
        <ul className="nk-top-products">
          {dataSet.map((item, idx) => (
            <li className="item" key={idx}>
              <div className="thumb">
                <img src={item.img} alt="" />
              </div>
              <div className="info">
                <div className="title">{item.name}</div>
                <div className="price">${item.price}</div>
              </div>
              <div className="total">
                <div className="amount">
                  $ {returnTotal(item.price, item.sold)}
                </div>
                <div className="count">{item.sold} Vendidos</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default TopProducts;
