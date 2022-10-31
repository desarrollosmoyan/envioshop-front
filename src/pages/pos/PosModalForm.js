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
import { request } from "../../constants";
import { useCookie } from "react-use";
export default function PosModalForm() {
  const { assign } = useTurn();
  //const cashierId = JSON.parse(localStorage.getItem("userData")).id;
  const [userId, setUserId] = useState();
  const [token] = useCookie("token");
  const [open, setOpen] = useState(true);
  const [coins, setCoins] = useState({ coin10: 0, coin20: 0, coin30: 0 });
  const [bills, setBills] = useState({ bill10: 0, bill20: 0, bill30: 0 });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    makeAllRequest();
  }, []);
  const getMe = async () => {
    try {
      const response = await request({
        method: "GET",
        url: "/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const makeAllRequest = async () => {
    const { user } = await getMe();
    setUserId(user.id);
    if (user.Turn) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
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
    assign(userId, openBalance)
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

  useEffect(() => {
    calculateTotal();
  }, [total]);
  console.log(total);
  const calculateTotal = () => {
    console.log(coins);
    const coinSum = Object.values(coins).reduce(
      (prev, current) => prev + current,
      0
    );
    const billSum = Object.values(bills).reduce(
      (prev, current) => prev + current,
      0
    );
    if (isNaN(coinSum)) return;
    setTotal((coinSum + billSum).toFixed(2));
  };

  const sumCoins = (e) => {
    const name = e.target.name;
    const values = name.length > 0 ? getValues()[name] : null;
    if (!values || isNaN(values)) {
      setCoins({ ...coins, [name]: 0 });
      return;
    }
    console.log(values);
    const coeficient = parseInt(name.replace("coin", "")) / 10;
    const res = (values * coeficient) / 100;
    setCoins({ ...coins, [name]: res });
  };

  const sumBills = (e) => {
    const name = e.target.name;
    const values = name.length > 0 ? getValues()[name] : null;
    if (!values || isNaN(values)) {
      setBills({ ...bills, [name]: 0 });
      return;
    }
    const coeficient = parseInt(name.replace("bill", "")) / 10;
    const res = values * coeficient * 10;
    setBills({ ...bills, [name]: res });
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
                text="10"
                onChange={sumCoins}
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
                onChange={sumBills}
                min="0"
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
                ref={register({
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
                min="0"
                onChange={sumCoins}
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
                onChange={sumBills}
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
                onChange={sumCoins}
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
                onChange={sumBills}
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
