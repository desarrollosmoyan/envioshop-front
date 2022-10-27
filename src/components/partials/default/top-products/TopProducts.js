import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { UserAvatar } from "../../../Component";

const TopProducts = ({ topFranchises }) => {
  const [total, setTotal] = useState(0);
  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">TOP Franquicias</h6>
          </div>
        </div>
        <ul className="nk-top-products">
          {topFranchises.map((item, idx) => (
            <li className="item" key={idx}>
              <div className="thumb">
                <UserAvatar
                  className="sm"
                  theme={"primary"}
                  text={item.name[0]}
                />
              </div>
              <div className="info">
                <div className="title">{item.name}</div>
              </div>
              <div className="total">
                <div className="amount">$ {total}</div>
                <div className="count">{item.sales.length} Vendidos</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default TopProducts;
