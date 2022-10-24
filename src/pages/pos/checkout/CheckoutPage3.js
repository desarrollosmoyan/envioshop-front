import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import { Button } from "../../../components/Component";
import { API_ENDPOINTS, companyLogos } from "../../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setPdf, setShipping } from "../../../store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import useShipment from "../../../hooks/useShipment";
export default function CheckoutPage3({ setPage, company }) {
  const dispatch = useDispatch();
  const { create } = useShipment();
  const shipping = useSelector((state) => state.shipping.data);
  const selected = useSelector((state) => state.rating.selected);
  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(false);
  const { errors, handleSubmit, register, setValue } = useForm();
  const handleSecondPageSubmit = async (formData) => {
    dispatch(
      setShipping({
        data: {
          ...shipping,
          ...formData,
        },
      })
    );
    const url = `${API_ENDPOINTS.services.shipping}/${company}`;
    const toastLoading = toast.loading("Cargando...", {
      type: "info",
      position: "bottom-right",
    });
    try {
      const { data } = await axios({
        method: "POST",
        url: url,
        data: {
          ...shipping,
          ...formData,
        },
      });
      if (data.shipment.document.type === "ZPL") {
        try {
          const response = await fetch(
            "http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/pdf",
              },
              body: JSON.stringify(data.shipment.document.content),
            }
          );
          const blob = await response.blob();
          let url = URL.createObjectURL(blob);
          console.log(url);
          dispatch(setPdf({ data: url }));
        } catch (error) {
          console.log(error);
          throw error;
        }
        toast.update(toastLoading, {
          render: "Envio creado con éxito",
          type: "success",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
        });
        return;
      }
      dispatch(setPdf({ data: data.shipment.document.content }));
      toast.update(toastLoading, {
        render: "Envio creado con éxito",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeOnClick: true,
      });
      const shipmentBody = {
        serviceName: company,
        serviceType: "",
        shipper: {
          postalCode: shipping.shipperPostalCode,
          name: shipping.shipperFullName,
          email: shipping.shipperEmail,
          cellphone: shipping.shipperCellphone,
          city: shipping.shipperCity,
          county: shipping.shipperCounty,
          address: [
            shipping.shipperAddress,
            shipping.shipperAddress2,
            shipping.shipperAddress3,
          ],
        },
        receiver: {
          postalCode: shipping.receiverPostalCode,
          name: shipping.receiverFullName,
          email: shipping.receiverEmail,
          cellphone: shipping.receiverCellphone,
          city: shipping.receiverCity,
          county: shipping.receiverCounty,
          address: [
            shipping.receiverAddress,
            shipping.receiverAddress2,
            shipping.receiverAddress3,
          ],
        },
        shipmentPrice: selected.price,
        shipmentDescription: shipping.description,
      };

      create(shipmentBody);
    } catch (error) {
      console.log(error);
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
