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
import { toast } from "react-toastify";
import { useState } from "react";
import useTurn from "../../hooks/useTurn";
import axios from "axios";
export default function PosModalForm() {
  const { assign } = useTurn();
  const cashierId = JSON.parse(localStorage.getItem("userData")).id;
  const [open, setOpen] = useState(true);
  useEffect(() => {
    checkIfCashierHasTurn();
  }, []);
  const checkIfCashierHasTurn = async () => {
    const { data } = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/cashier/${cashierId}`,
    });
    if (data.Turn) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const [total, setTotal] = useState(0);
  const { register, errors, handleSubmit, formState, watch, getValues } =
    useForm({
      defaultValues: {
        coin10: 0,
        coin20: 0,
        coin30: 0,
        bill10: 0,
        bill20: 0,
        bill30: 0,
      },
    });
  const onHandleSubmit = (formData) => {
    const openBalance = {
      coins: {
        coin10: formData.coin10,
        coin20: formData.coin20,
        coin30: formData.coin30,
      },
      bills: {
        bill10: formData.bill10,
        bill20: formData.bill20,
        bill30: formData.bill30,
      },
    };
    assign(cashierId, openBalance)
      .then(() => {
        toast("Turno creado con éxito!", { type: "success" });
        setOpen(false);
      })
      .catch((error) =>
        toast("Algo ha salido mal. Vuelve ha intentarlo más tarde", {
          type: "error",
        })
      );
  };
  const calculateTotal = (e) => {
    const values = getValues();
    const filteredValues = Object.values(values).filter((item) => !isNaN(item));
    const sum = Object.values(filteredValues).reduce(
      (prev, current) => prev + current,
      0
    );
    setTotal(sum);
  };
  return (
    <Modal isOpen={open}>
      <ModalHeader tag="div">
        <h4>Dinero operación del día</h4>
      </ModalHeader>
      <Form onSubmit={handleSubmit(onHandleSubmit)}>
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
              <Input
                errors={errors}
                id="coin10"
                type="number"
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
                min="0"
                onChange={calculateTotal}
                text="10"
              />
            </Col>
            <Col className="d-flex align-items-center">
              <Input
                errors={errors}
                id="bill10"
                type="number"
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
                min="0"
                onChange={calculateTotal}
                text="10"
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center ">
              <Input
                errors={errors}
                id="coin20"
                type="number"
                onChange={calculateTotal}
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
                min="0"
                text="20"
              />
            </Col>
            <Col className="d-flex align-items-center ">
              <Input
                errors={errors}
                id="bill20"
                type="number"
                min="0"
                text="20"
                onChange={calculateTotal}
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center">
              <Input
                errors={errors}
                id="coin30"
                type="number"
                min="0"
                text="30"
                onChange={calculateTotal}
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
              />
            </Col>
            <Col className="d-flex align-items-center ">
              <Input
                errors={errors}
                id="bill30"
                type="number"
                min="0"
                onChange={calculateTotal}
                text="30"
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row className=" mt-2 align-items-center justify-content-between  w-100">
            <Col>
              <span>
                Cantidad de dinero: <span>{total}</span>
              </span>
            </Col>
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="d-flex align-items-center"
            >
              Abrir Turno
              <em className="icon ni ni-caret-right-fill"></em>
            </Button>
          </Row>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
