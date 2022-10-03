import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Form, FormGroup } from "reactstrap";
import { Button } from "../../../components/Component";
import { companyLogos } from "../../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setShipping } from "../../../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function CheckoutPage({ setPage }) {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, setValue } = useForm();
  const shipping = useSelector((state) => state.shipping.data);
  useEffect(() => {
    if (shipping) {
      setValue("shipperFullName", shipping.shipperFullName);
      setValue("shipperCompanyName", shipping.shipperCompanyName);
      setValue("shipperCountry", shipping.shipperCountry);
      setValue("shipperPostalCode", shipping.shipperPostalCode);
      setValue("shipperCellphone", shipping.shipperCellphone);
      setValue("shipperCellphoneCode", shipping.shipperCellphoneCode);
      setValue("shipperEmail", shipping.shipperEmail);
      setValue("shipperAddress", shipping.shipperAddress);
      setValue("shipperAddress2", shipping.shipperAddress2);
      setValue("shipperAddress3", shipping.shipperAddress3);
      setValue("shipperCity", shipping.shipperCity);
      setValue("shipperCounty", shipping.shipperCounty);
    }
  });
  const handleFirstPageSubmit = (formData) => {
    dispatch(
      setShipping({
        data: {
          ...shipping,
          ...formData,
          shipperCellphone: `+${formData.shipperCellphoneCode} ${formData.shipperCellphone}`,
        },
      })
    );
    setPage(2);
  };
  return (
    <Form onSubmit={handleSubmit(handleFirstPageSubmit)}>
      <div className="mb-3">
        <h5>Información del que envia</h5>
      </div>
      <div
        className="d-flex"
        style={{
          gap: "1rem",
        }}
      >
        <FormGroup>
          <label htmlFor="shipperFullName" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            id="shipperFullName"
            name="shipperFullName"
            className="form-control form-control-lg"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="shipperFullName"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="shipperCompanyName" className="form-label">
            Empresa
          </label>
          <input
            type="text"
            id="shipperCompanyName"
            name="shipperCompanyName"
            className="form-control form-control-lg"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="shipperCompanyName"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="shipperCountry" className="form-label">
            País
          </label>
          <input
            type="text"
            id="shipperCountry"
            value="México"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            name="shipperCountry"
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperCountry"
            render={({ message }) => <span className="invalid">{message}</span>}
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
          <label htmlFor="shipperAddress" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            id="shipperAddress"
            ref={register({
              required: "Este campo no puede estar vacio",
            })}
            name="shipperAddress"
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperAddress"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="shipperAddress2" className="form-label">
            Dirección 2
          </label>
          <input
            type="text"
            id="shipperAddress2"
            ref={register({
              minLength: 5,
            })}
            name="shipperAddress2"
            className="form-control form-control-lg"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="shipperAddress3" className="form-label">
            Dirección 3
          </label>
          <input
            type="text"
            id="shipperAddress3"
            name="shipperAddress3"
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
          <label htmlFor="shipperCity" className="form-label">
            Ciudad
          </label>
          <input
            type="text"
            id="shipperCity"
            name="shipperCity"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperCity"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="shipperCounty" className="form-label">
            Estado/Provincia
          </label>
          <input
            type="text"
            id="shipperCounty"
            name="shipperCounty"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperCounty"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup className="w-15">
          <label htmlFor="shipperPostalCode" className="form-label">
            Código Postal
          </label>
          <input
            type="text"
            id="shipperPostalCode"
            name="shipperPostalCode"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperPostalCode"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
      </div>
      <div className="d-flex" style={{ gap: "1rem" }}>
        <FormGroup>
          <label htmlFor="shipperEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="shipperEmail"
            name="shipperEmail"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperEmail"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup className="w-15">
          <label htmlFor="shipperCellphoneCode" className="form-label">
            Código
          </label>
          <input
            type="number"
            id="shipperCellphoneCode"
            name="shipperCellphoneCode"
            ref={register({
              required: "Este campo no puede estar vacío",
              valueAsNumber: true,
            })}
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperCellphoneCode"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="shipperCellphone" className="form-label">
            Telefono
          </label>
          <input
            type="text"
            id="shipperCellphone"
            name="shipperCellphone"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            className="form-control form-control-lg"
          />
          <ErrorMessage
            errors={errors}
            name="shipperCellphone"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
      </div>
      <div className="d-flex justify-content-end">
        <FormGroup>
          <Button color="primary">Siguiente</Button>
        </FormGroup>
      </div>
    </Form>
  );
}
