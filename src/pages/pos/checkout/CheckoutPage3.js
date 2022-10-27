import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import { Button } from "../../../components/Component";
import { API_ENDPOINTS, companyLogos, request } from "../../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setPdf, setShipping } from "../../../store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import useShipment from "../../../hooks/useShipment";
import { useCookie } from "react-use";
export default function CheckoutPage3({ setPage, company }) {
  const dispatch = useDispatch();
  const { create } = useShipment();
  const shipping = useSelector((state) => state.shipping.data);
  const selected = useSelector((state) => state.rating.selected);
  const [me, setMe] = useState();
  const [date, setDate] = useState(Date.now());
  const [token] = useCookie("token");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getMe();
  }, []);
  const getMe = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: `/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMe(data.user);
    } catch (error) {
      toast("Algo salió mal!", { type: "error" });
    }
  };
  const { errors, handleSubmit, register, setValue } = useForm();
  const handleSecondPageSubmit = async (formData) => {
    const url = `${API_ENDPOINTS.services.shipping}/${company}`;
    const toastLoading = toast.loading("Cargando...", {
      type: "info",
      position: "bottom-right",
    });
    try {
      const { data } = await request({
        method: "POST",
        url: url,
        data: {
          franchiseId: me.franchiseId,
          turnId: me.Turn.id,
          shipmentPrice: selected.prices.total,
          ...shipping,
          ...formData,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setPdf({ data: data.shipment.document.content }));
      toast.update(toastLoading, {
        render: "Envio creado con éxito",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeOnClick: true,
      });
    } catch (error) {
      toast("Algo salió mal!", { type: "error" });
    }
  };
  const onChangeDate = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <ToastContainer />
      <Form
        onSubmit={handleSubmit(handleSecondPageSubmit)}
        className="d-flex flex-column"
        style={{ height: "500px" }}
      >
        <div className="mb-3">
          <h5>Información adicional</h5>
        </div>
        <div className="d-flex justify-content-between flex-column h-100">
          <div
            className="d-flex flex-column h-100"
            style={{
              gap: "1rem",
            }}
          >
            <FormGroup>
              <label htmlFor="plannedShippingDate" className="form-label">
                Cuando será enviado
              </label>
              <ReactDatePicker
                id="plannedShippingDate"
                name="plannedShippingDate"
                selected={date}
                className="form-control form-control-lg"
                onChange={onChangeDate}
                ref={register({
                  required: "Este campo no puede estar vacío",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="receiverFullName"
                render={({ message }) => (
                  <span className="invalid">{message}</span>
                )}
              />
            </FormGroup>
            <FormGroup className="h-100">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                style={{ resize: "none" }}
                id="description"
                name="description"
                className="form-control form-control-lg h-75"
                ref={register({
                  required: "Este campo no puede estar vacío",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="receiverCompanyName"
                render={({ message }) => (
                  <span className="invalid">{message}</span>
                )}
              />
            </FormGroup>
          </div>
          <div className="d-flex justify-content-between">
            <FormGroup>
              <Button
                onClick={() => setPage(2)}
                name="anterior"
                color="primary"
              >
                Anterior
              </Button>
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary">
                Enviar
              </Button>
            </FormGroup>
          </div>
        </div>
      </Form>
    </>
  );
}
