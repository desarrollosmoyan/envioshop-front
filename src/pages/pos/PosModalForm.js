import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Col,
  Row,
  ModalFooter,
} from "reactstrap";
import { Button } from "../../components/Component";
import Input from "../../components/input/input/Input";
export default function PosModalForm() {
  const turn = useSelector((state) => state.user.turn);
  const { register, errors, handleSubmit } = useForm();

  const onOpenTurn = () => {};
  return (
    <Modal isOpen={turn}>
      <ModalHeader>
        <h4>Dinero operación del día</h4>
      </ModalHeader>
      <Form onSubmit={handleSubmit()}>
        <ModalBody>
          <Row>
            <Col>
              <label className="form-label">Monedas</label>
            </Col>
            <Col>
              <label className="form-label">Billetes</label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center">
              <Input id="coin10" type="number" min="0" text="10" />
            </Col>
            <Col className="d-flex align-items-center">
              <Input id="bill10" type="number" min="0" text="10" />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center ">
              <Input id="coin20" type="number" min="0" text="20" />
            </Col>
            <Col className="d-flex align-items-center ">
              <Input id="bill20" type="number" min="0" text="20" />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center">
              <Input id="10" type="number" min="0" text="30" />
            </Col>
            <Col className="d-flex align-items-center ">
              <Input id="bill30" type="number" min="0" text="30" />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row className=" mt-2 align-items-center justify-content-center">
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="d-flex align-items-center "
            >
              Abrir Turno
              <em clasName="icon ni ni-caret-right-fill"></em>
            </Button>
          </Row>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
