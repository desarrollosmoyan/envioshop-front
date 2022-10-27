import React from "react";
import { Button, FormGroup } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  PreviewAltCard,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

const Settings = () => {
  return (
    <React.Fragment>
      <Head title="Settings"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockHeadContent>
            <BlockTitle page>Ajustes</BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <PreviewAltCard>
            <h5 className="card-title">Ajustes de administrador</h5>
            <p>
              Aquí podrás modificar datos como URL de los servicios, TOKENS y
              demás
            </p>
            <form className="gy-3 form-settings">
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-name">
                      DHL
                    </label>
                    <span className="form-note">DHL URL</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="site-name"
                        defaultValue="https://express.api.dhl.com/mydhlapi/test"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-email">
                      FEDEX
                    </label>
                    <span className="form-note">FEDEX URL</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="site-email"
                        defaultValue="https://apis.fedex.com"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-copyright">
                      REDPACK
                    </label>
                    <span className="form-note">REDPACK URL</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="site-copyright"
                        defaultValue="&copy; 2019, DashLite. All Rights Reserved."
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label">UPS</label>
                    <span className="form-note">UPS URL</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="site-copyright"
                        defaultValue="https://wwwcie.ups.com"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3">
                <Col lg="5" className="offset-lg-5">
                  <FormGroup className="mt-2">
                    <Button size="lg" color="primary" type="submit">
                      Actualizar
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
              <span className="form-note text-primary">
                Por motivos de seguridad, la nueva url se comienza a utilizar
                pasados unos 30 minutos.
              </span>
            </form>
          </PreviewAltCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Settings;
