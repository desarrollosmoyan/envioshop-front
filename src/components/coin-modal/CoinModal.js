import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import useTurn from "../../hooks/useTurn";
import { Form } from "reactstrap";
import Input from "../input/input/Input";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { request } from "../../constants";
import { useCookie } from "react-use";
const CoinModal = ({ open, setOpen }) => {
  const { assign, end, update } = useTurn();
  const selected = useSelector((state) => state.rating.selected);
  //Cambiar por cookie
  const [token] = useCookie("token");
  const [cashierId, setCashierId] = useState();
  const [coins, setCoins] = useState({ coin10: 0, coin20: 0, coin30: 0 });
  const [bills, setBills] = useState({ bill10: 0, bill20: 0, bill30: 0 });
  useEffect(() => {
    getMe();
    //checkIfCashierHasTurn();
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

  const getMe = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: "/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCashierId(data.user.id);
      if (data.user.Turn) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    } catch (error) {
      toast("Algo salió mal!", { type: "error" });
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
    if (
      total < parseFloat(selected.prices.total) ||
      total === parseFloat(selected.prices.total)
    ) {
      console.log("pepe");
    }
    /*assign(cashierId, openBalance)
      .then(() => {
        toast("Turno creado con éxito!", { type: "success" });
        setOpen(false);
      })
      .catch((error) =>
        toast("Algo ha salido mal. Vuelve ha intentarlo más tarde", {
          type: "error",
        })
      );*/
  };

  useEffect(() => {
    calculateTotal();
  }, [coins, bills]);
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
          <Row className="pl-2 mb-2">
            <h5>Valor: {selected.prices.total} MXN</h5>
          </Row>
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
                onChange={sumCoins}
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
                onChange={sumBills}
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
                onChange={sumCoins}
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
            <Col className="d-flex flex-column">
              <span>
                Total: <span>{total}</span>
              </span>
              <span>
                Cambio: <span>{total}</span>
              </span>
            </Col>
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="d-flex align-items-center"
            >
              Pagar
              <em className="icon ni ni-caret-right-fill"></em>
            </Button>
          </Row>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CoinModal;
