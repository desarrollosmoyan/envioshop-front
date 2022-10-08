import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Table,
} from "../../components/Component";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { useSelector } from "react-redux";
import PosForm from "./PosForm";
import { Row, Col, Container } from "reactstrap";
import PosModalForm from "./PosModalForm";
import { companyLogos } from "../../constants";
import { useHistory } from "react-router";

export default function Pos() {
  const rating = useSelector((state) => state.rating);
  const history = useHistory();

  console.log(rating);
  return (
    <Container className="min-vh-100">
      <Head title="POS" />
      <PosModalForm />
      <Content>
        <BlockHead size="sm" className="mb-0">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Punto de Venta
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button
                color="danger"
                className="text-uppercase d-flex align-items-center"
              >
                Cerrar turno
                <em class="icon ni ni-cross-sm"></em>
              </Button>
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
                      style={{ height: "40%", overflowX: "hidden" }}
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
                        {rating.selected ? (
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
