import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  PreviewAltCard,
  Row,
} from "../../../../components/Component";
import { request } from "../../../../constants";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

const Settings = () => {
  const [urls, setUrls] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, errors, handleSubmit, formState, watch, getValues } =
    useForm({
      defaultValues: {
        destinyPostalCode: "test",
      },
    });
  const [token] = useCookies("token");
  const getUrls = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: "/settings",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      setUrls(data);
    } catch (e) {}
  };
  useEffect(() => {
    getUrls();
  }, []);
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const values = {
        ...urls,
        DHL: e.target.dhl.value,
        FEDEX: e.target.fedex.value,
        UPS: e.target.ups.value,
      };
      const isEmpty = ![values.DHL, values.FEDEX, values.UPS].every(
        (val) => val
      );
      if (isEmpty)
        return Swal.fire(
          "Ups!",
          "Todos los campos deben estar completos.",
          "error"
        );
      const { data } = await request({
        method: "PUT",
        url: "/settings",
        data: values,
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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

            {!urls ? (
              <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                <Spinner size="lg" type="grow" color="primary"></Spinner>
              </div>
            ) : (
              <form onSubmit={onHandleSubmit}>
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
                        <Input
                          name="dhl"
                          placeholder="https://express.api.dhl.com/mydhlapi/test"
                          errors={errors}
                          defaultValue={urls.DHL}
                          ref={register({
                            required: "URL requerida",
                          })}
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
                      <Input
                        name="fedex"
                        placeholder="https://apis.fedex.com"
                        errors={errors}
                        defaultValue={urls.FEDEX}
                        ref={register({
                          required: "URL requerida",
                        })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/*  <Row className="g-3 align-center">
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
                      <Input
                        name="redpack"
                        placeholder="https://example.com"
                        errors={errors}
                        ref={register({
                          required: 'URL requerida',
                        })}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row> */}
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
                        <Input
                          name="ups"
                          defaultValue={urls.UPS}
                          placeholder="https://wwwcie.ups.com"
                          errors={errors}
                          ref={register({
                            required: "URL requerida",
                          })}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col lg="5" className="offset-lg-5">
                    <FormGroup className="mt-2">
                      <Button size="lg" color="primary" type="submit">
                        {!isSubmitting ? (
                          <span>Actualizar</span>
                        ) : (
                          <Spinner
                            className={classNames({
                              "position-relative": true,
                              visible: isSubmitting,
                              invisible: !isSubmitting,
                            })}
                            size="sm"
                            // type="grow"
                          />
                        )}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </form>
            )}
          </PreviewAltCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Settings;
