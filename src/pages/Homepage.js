import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import DataCard from "../components/partials/default/DataCard";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import useShipment from "../hooks/useShipment";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useCookie } from "react-use";
const Homepage = () => {
  const [sm, updateSm] = useState(false);
  const [token] = useCookie("token");
  const [stats, setStats] = useState({});
  useEffect(() => {
    getStats();
  }, []);
  console.log(stats);

  const getStats = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/stats`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setStats(data);
    } catch (error) {
      toast("Algo salió mal!", { type: "error" });
      setStats(null);
    }
  };
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${
                    sm ? "active" : ""
                  }`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div
                  className="toggle-expand-content"
                  style={{ display: sm ? "block" : "none" }}
                >
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          tag="a"
                          className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                        >
                          <Icon
                            className="d-none d-sm-inline"
                            name="calender-date"
                          />
                          <span>
                            <span className="d-none d-md-inline">Ultimos</span>{" "}
                            30 Dias
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Ultimos 30 Días</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Ultimos 6 Meses</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Ultimas 3 Semanas</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="3" sm="6">
              <DataCard
                title="Total de Envios"
                percentChange={4}
                up={true}
                chart={<DefaultOrderChart />}
                amount={stats ? stats.totalShipments : 0}
              />
            </Col>
            <Col xxl="3" sm="6">
              <DataCard
                title="Total vendido"
                percentChange={3}
                up={false}
                chart={<DefaultRevenueChart />}
                amount={`$${stats ? stats.totalEarned : 0}`}
              />
            </Col>
            <Col xxl="3" sm="6">
              <DataCard
                title="Franquicias registradas"
                percentChange={"4.63"}
                up={true}
                chart={<DefaultCustomerChart />}
                amount={stats ? stats.totalFranchises : 0}
              />
            </Col>
            <Col xxl="3" sm="6">
              <DataCard
                title="Cajeros registrados"
                percentChange={"4.63"}
                up={true}
                chart={<DefaultCustomerChart />}
                amount={stats ? stats.totalCashiers : 0}
              />
            </Col>
            <Col xxl="6">
              <SalesStatistics />
            </Col>
            <Col xxl="3" md="6">
              <OrderStatistics />
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics />
            </Col>
            <Col xxl="8">
              <h3>Envios recientes</h3>
              <RecentOrders />
            </Col>
            <Col xxl="4" md="8" lg="6">
              <h1>
                Franquicias ordenadas de la que menos vende a la que mas vende
              </h1>
              <TopProducts />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
