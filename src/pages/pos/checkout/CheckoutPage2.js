import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Form, FormGroup } from "reactstrap";
import { Button } from "../../../components/Component";
import { API_ENDPOINTS, companyLogos } from "../../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setPdf, setShipping } from "../../../store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export default function CheckoutPage2({ setPage, company }) {
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.shipping.data);
  const [isReadyToSend, setIsReady] = useState(false);
  const { errors, handleSubmit, register, setValue } = useForm();
  useEffect(() => {
    if (shipping) {
      setValue("receiverFullName", shipping.receiverFullName);
      setValue("receiverCompanyName", shipping.receiverCompanyName);
      setValue("receiverCountry", shipping.receiverCountry);
      setValue("receiverPostalCode", shipping.receiverPostalCode);
      setValue("receiverCellphone", shipping.receiverCellphone);
      setValue("receiverCellphoneCode", shipping.receiverCellphoneCode);
      setValue("receiverEmail", shipping.receiverEmail);
      setValue("receiverAddress", shipping.receiverAddress);
      setValue("receiverAddress2", shipping.receiverAddress2);
      setValue("receiverAddress3", shipping.receiverAddress3);
      setValue("receiverCity", shipping.receiverCity);
      setValue("receiverCounty", shipping.receiverCounty);
    }
  });
  const handleSecondPageSubmit = async (formData) => {
    dispatch(
      setShipping({
        data: {
          ...shipping,
          ...formData,
          receiverCellphone: `${formData.receiverCellphone}`,
        },
      })
    );
    setIsReady(true);
    if (isReadyToSend) {
      const url = `${API_ENDPOINTS.services.shipping}/${company}`;
      console.log(shipping);
      console.log({
        ...shipping,
        packageSize: {
          width: 10,
          height: 10,
          length: 10,
          weight: 1,
        },
      });
      const toastLoading = toast.loading("Cargando...", {
        type: "info",
        position: "bottom-right",
      });
      const { data } = await axios({
        method: "POST",
        url: url,
        data: {
          ...shipping,
          packageSize: {
            width: 10,
            height: 10,
            length: 10,
            weight: 1,
          },
        },
      });
      console.log(data);
      dispatch(setPdf({ data: data.shipment.documents[0].content }));
      toast.update(toastLoading, {
        render: "Envio creado con éxito",
        type: "success",
        isLoading: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit(handleSecondPageSubmit)}>
        <div className="mb-3">
          <h5>Información del que recibe</h5>
        </div>
        <div
          className="d-flex"
          style={{
            gap: "1rem",
          }}
        >
          <FormGroup>
            <label htmlFor="receiverFullName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="receiverFullName"
              name="receiverFullName"
              className="form-control form-control-lg"
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
          <FormGroup>
            <label htmlFor="receiverCompanyName" className="form-label">
              Empresa
            </label>
            <input
              type="text"
              id="receiverCompanyName"
              name="receiverCompanyName"
              className="form-control form-control-lg"
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
          <FormGroup>
            <label htmlFor="receiverCountry" className="form-label">
              País
            </label>
            <input
              type="text"
              id="receiverCountry"
              value="México"
              ref={register({
                required: "Este campo no puede estar vacío",
              })}
              name="receiverCountry"
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverCountry"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
        </div>
        <div
          className="d-flex"
          style={{
            gap: "1rem",
          }}
        >
          <FormGroup>
            <label htmlFor="receiverAddress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              id="receiverAddress"
              ref={register({
                required: "Este campo no puede estar vacio",
              })}
              name="receiverAddress"
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverAddress"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="receiverAddress2" className="form-label">
              Dirección 2
            </label>
            <input
              type="text"
              id="receiverAddress2"
              ref={register({
                minLength: 5,
              })}
              name="receiverAddress2"
              className="form-control form-control-lg"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="receiverAddress3" className="form-label">
              Dirección 3
            </label>
            <input
              type="text"
              id="receiverAddress3"
              name="receiverAddress3"
              ref={register({
                minLength: 5,
              })}
              className="form-control form-control-lg"
            />
          </FormGroup>
        </div>
        <div
          className="d-flex"
          style={{
            gap: "1rem",
          }}
        >
          <FormGroup>
            <label htmlFor="receiverCity" className="form-label">
              Ciudad
            </label>
            <input
              type="text"
              id="receiverCity"
              name="receiverCity"
              ref={register({
                required: "Este campo no puede estar vacío",
              })}
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverCity"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="receiverCounty" className="form-label">
              Estado/Provincia
            </label>
            <input
              type="text"
              id="receiverCounty"
              name="receiverCounty"
              ref={register({
                required: "Este campo no puede estar vacío",
              })}
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverCounty"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="receiverPostalCode" className="form-label">
              Código Postal
            </label>
            <input
              type="text"
              id="receiverPostalCode"
              name="receiverPostalCode"
              ref={register({
                required: "Este campo no puede estar vacío",
              })}
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverPostalCode"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
        </div>
        <div className="d-flex" style={{ gap: "1rem" }}>
          <FormGroup>
            <label htmlFor="receiverEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="receiverEmail"
              name="receiverEmail"
              ref={register({
                required: "Este campo no puede estar vacío",
              })}
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverEmail"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
          <FormGroup className="w-15">
            <label htmlFor="receiverCellphoneCode" className="form-label">
              Código
            </label>
            <input
              type="number"
              id="receiverCellphoneCode"
              name="receiverCellphoneCode"
              ref={register({
                required: "Este campo no puede estar vacío",
                valueAsNumber: true,
              })}
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverCellphoneCode"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="receiverCellphone" className="form-label">
              Telefono
            </label>
            <input
              type="text"
              id="receiverCellphone"
              name="receiverCellphone"
              ref={register({
                required: "Este campo no puede estar vacío",
              })}
              className="form-control form-control-lg"
            />
            <ErrorMessage
              errors={errors}
              name="receiverCellphone"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
        </div>
        <div className="d-flex justify-content-between">
          <FormGroup>
            <Button onClick={() => setPage(1)} name="anterior" color="primary">
              Anterior
            </Button>
          </FormGroup>
          <FormGroup>
            <Button type="submit" color="primary">
              Enviar
            </Button>
          </FormGroup>
        </div>
      </Form>
    </>
  );
}
