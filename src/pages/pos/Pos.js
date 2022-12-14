import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  Table,
} from "../../components/Component";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { useSelector } from "react-redux";
import PosForm from "./PosForm";
import {
  Row,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import PosModalForm from "./PosModalForm";
import { companyLogos, request } from "../../constants";
import { useHistory } from "react-router";
import useTurn from "../../hooks/useTurn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCookie } from "react-use";
export const getMe = async ({ token }) => {
  try {
    const { data } = await request({
      method: "GET",
      url: "/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {}
};
export default function Pos() {
  const { end } = useTurn();
  //const { getOne } = useUser("cashier");
  const [cashier, setCashier] = useState({});
  const [closeTurnModal, setCloseTurnModal] = useState(false);
  //const cashierId = JSON.parse(localStorage.getItem("userData")).id;
  const [token] = useCookie("token");
  const rating = useSelector((state) => state.rating);
  const history = useHistory();
  useEffect(() => {
    makeAllRequest();
  }, []);
  console.log({ rating });

  const makeAllRequest = async () => {
    const { user } = await getMe({ token });
    setCashier(user);
    //await getOne(user.id, setCashier);
  };
  const onCloseTurn = () => {
    end(cashier.Turn.id)
      .then(() => toast("Turno terminado con éxito", { type: "success" }))
      .catch(() => toast("No se puede cerrar el turno", { type: "error" }));
    setCloseTurnModal(false);
    window.location.reload();
  };

  return (
    <Container className="min-vh-100">
      <Head title="POS" />
      <PosModalForm />
      <Modal isOpen={closeTurnModal}>
        <ModalHeader>¿Estas seguro que quieres cerrar el turno?</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6} className="d-flex flex-column border-right">
              <span>El turno empezó con:</span>
              <Row>
                <Col className="d-flex flex-column">
                  <span>Monedas</span>
                  {cashier.Turn
                    ? Object.keys(cashier.Turn.openBalance.coins).map(
                        (value) => (
                          <span key={value}>
                            {`${value.replace("coin", "")}: ${
                              cashier.Turn.openBalance.coins[value]
                            }`}
                          </span>
                        )
                      )
                    : null}
                </Col>
                <Col className="d-flex flex-column">
                  <span>Billetes</span>
                  {cashier.Turn
                    ? Object.keys(cashier.Turn.openBalance.bills).map(
                        (value) => (
                          <span key={value}>
                            {`${value.replace("bill", "")}: ${
                              cashier.Turn.openBalance.bills[value]
                            }`}
                          </span>
                        )
                      )
                    : null}
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <span>El turno terminará con:</span>
              <Row>
                <Col className="d-flex flex-column">
                  <span>Monedas</span>
                  {cashier.Turn
                    ? Object.keys(cashier.Turn.closeBalance.coins).map(
                        (value) => (
                          <span key={value}>
                            {`${value.replace("coin", "")}: ${
                              cashier.Turn.closeBalance.coins[value]
                            }`}
                          </span>
                        )
                      )
                    : null}
                </Col>
                <Col className="d-flex flex-column">
                  <span>Billetes</span>
                  {cashier.Turn
                    ? Object.keys(cashier.Turn.closeBalance.bills).map(
                        (value) => (
                          <span key={value}>
                            {`${value.replace("bill", "")}: ${
                              cashier.Turn.closeBalance.bills[value]
                            }`}
                          </span>
                        )
                      )
                    : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onCloseTurn}>
            Confirmar cierre
          </Button>
          <Button
            color="gray"
            onClick={() => setCloseTurnModal(!closeTurnModal)}
          >
            Cerrar <Icon name="cross" className="ml-2" />
          </Button>
        </ModalFooter>
      </Modal>
      <Content>
        <BlockHead size="sm" className="mb-0">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Punto de Venta
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent className="d-flex gap-1 h-100">
              <Button
                color="warning"
                onClick={() => history.push("/")}
                className="text-uppercase d-flex align-items-center"
              >
                <em className="icon ni ni-caret-left-fill"></em> Volver
              </Button>
              {cashier?.type !== "admin" && (
                <Button
                  color="danger"
                  onClick={() => setCloseTurnModal(true)}
                  className="text-uppercase d-flex align-items-center"
                >
                  Cerrar turno
                  <em className="icon ni ni-cross-sm"></em>
                </Button>
              )}
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Container className="container-fluid border">
            <Row>
              <Col md="6" className="mb-5">
                <PosForm />
              </Col>
              <Col lg="6" style={{ height: "100%" }}>
                {!rating.data ? (
                  <></>
                ) : (
                  <>
                    <Row
                      className="border"
                      style={{
                        height: "50vh",
                        overflowX: "hidden",
                      }}
                    >
                      <Table
                        responsive
                        border
                        className="w-100"
                        tableData={rating.data}
                        headData={["Compañia", "Servicio", "SubTotal", "Total"]}
                      />
                    </Row>
                    <Row className="border mt-2">
                      <Col className="p-0">
                        {rating.selected && rating.selected.prices ? (
                          <div className="d-flex border rounded w-50 align-items-center">
                            <img
                              style={{ width: "3rem" }}
                              src={companyLogos[rating.selected.company]}
                              alt="company-logo"
                            />
                            <div className="d-flex flex-column">
                              <div>
                                <span className="ml-2 text-center">
                                  {rating.selected.serviceName}
                                </span>
                              </div>
                              <div>
                                <span className="ml-2 text-center">
                                  Precio: {rating.selected.prices.total} MXN
                                </span>
                              </div>
                              <div>
                                <span className="ml-2 text-center">
                                  SubTotal: {rating.selected.prices.total} MXN
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </Col>
                      <Button
                        onClick={(e) => {
                          history.push(
                            `/pos/checkout/${rating.selected.company}`
                          );
                        }}
                        color="success"
                      >
                        Crear Envío
                      </Button>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Block>
      </Content>
    </Container>
  );
}

/* 
  <Row className="g-gs">
              <Col lg="3" sm="6">
                <OutlinedInput
                  label="Origen - Código Postal"
                  size="lg"
                ></OutlinedInput>
              </Col>
              <Col lg="3" sm="6">
                <RSelect
                  options={countryItems.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                ></RSelect>
              </Col>
              <Col lg="3" sm="6">
                <OutlinedInput
                  label="Destino - Código Postal"
                  size="lg"
                ></OutlinedInput>
              </Col>
            </Row>
            <Row className="mt-3 ml-0">
              <h5>Medidas del paquete</h5>
            </Row>
            <Row className="mt-3">
              <Col lg="3" sm="6">
                <OutlinedInput
                  className="form-validation"
                  type="number"
                  name="height"
                  text="CM"
                  id="height"
                  label="Alto"
                  size="lg"
                />
              </Col>
              <Col lg="3" sm="6">
                <OutlinedInput
                  className="form-validation"
                  text="CM"
                  type="number"
                  name="width"
                  id="width"
                  label="Ancho"
                  size="lg"
                />
              </Col>
              <Col lg="3" sm="6">
                <OutlinedInput
                  className="form-validation"
                  text="CM"
                  type="number"
                  id="length"
                  name="length"
                  label="Largo"
                  size="lg"
                />
              </Col>
            </Row>
            <Row className="mt-3 ml-0">
              <Button
                type="submit"
                color="primary"
                onSubmit={() => console.log("el pepe")}
              >
                Cotizar
              </Button>
            </Row>
*/
