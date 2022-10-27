import React from "react";
import { Card } from "reactstrap";
import {
  DataTableHead,
  DataTableRow,
  DataTableItem,
  UserAvatar,
} from "../../../Component";
import { recentOrderData } from "./OrderData";

const RecentOrders = ({ data = [] }) => {
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Envios recientes</h6>
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>Número de traqueo</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Cajero</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Fecha</span>
          </DataTableRow>
          <DataTableRow>
            <span>Cantidad </span>
          </DataTableRow>
        </DataTableHead>
        {data.map((item, idx) => (
          <DataTableItem key={idx}>
            <DataTableRow>
              <span className="tb-lead">
                <a href="#order" onClick={(ev) => ev.preventDefault()}>
                  {item.shipmentTrackingNumber}
                </a>
              </span>
            </DataTableRow>
            <DataTableRow size="sm">
              <div className="user-card">
                <UserAvatar
                  className="sm"
                  theme={"primary"}
                  text={item.Turn.cashier.name[0]}
                  image={item.img}
                ></UserAvatar>
                <div className="user-name">
                  <span className="tb-lead">{item.Turn.cashier.name}</span>
                </div>
              </div>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="tb-sub">
                {new Date(item.createdAt).toDateString()}
              </span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.shipmentPrice} <span>MXN</span>
              </span>
            </DataTableRow>
          </DataTableItem>
        ))}
      </div>
    </Card>
  );
};
export default RecentOrders;
