import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import { Button } from "../../../components/Component";
import { API_ENDPOINTS, companyLogos } from "../../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setPdf, setShipping } from "../../../store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { Controller } from "react-hook-form";
import { RSelect } from "../../../components/Component";
export default function CheckoutPage2({ setPage, company }) {
  const shipping = useSelector((state) => state.shipping.data);
  const { errors, handleSubmit, register, setValue, control } = useForm();
  const [countries, setCountries] = useState(Country.getAllCountries());
  const selected = useSelector((state) => state.rating.selected);
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  console.log(selected);
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
  }, [shipping]);
  useEffect(() => {
    if (selected) {
      dispatch(
        setShipping({
          data: {
            ...shipping,
            receiverPostalCode: selected.destinyPostalCode,
          },
        })
      );
    }
  }, []);
  const handleSecondPageSubmit = async (formData) => {
    dispatch(
      setShipping({
        data: {
          ...shipping,
          ...formData,
          shipperCellphone: `${formData.shipperCellphone}`,
        },
      })
    );
    setPage(3);
  };
  const onCountryChoose = (e) => {
    const isoCode = e.value;
    const arrOfStates = State.getStatesOfCountry(isoCode);
    setStates(arrOfStates);
  };
  const onStateChoose = (e) => {
    const isoCode = e.value;
    const arrOfCities = City.getCitiesOfState(e.countryCode, isoCode);
    setCities(arrOfCities);
  };
  return (
    <>
      <ToastContainer />
      <Form
        onSubmit={handleSubmit(handleSecondPageSubmit)}
        style={{ height: "500px" }}
        className="d-flex flex-column justify-content-between"
      >
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
          <FormGroup className="col-md-3">
            <label htmlFor="receiverCountry" className="form-label">
              País
            </label>
            <Controller
              name="receiverCountry"
              control={control}
              render={({ onChange, ref, value }) => (
                <RSelect
                  inputRef={ref}
                  options={countries.map((country) => ({
                    label: country.name,
                    value: country.isoCode,
                  }))}
                  onChange={(e) => {
                    onCountryChoose(e);
                    onChange(e.value);
                  }}
                />
              )}
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
          <FormGroup className="col-md-4">
            <label htmlFor="receiverCounty" className="form-label">
              Estado/Provincia
            </label>
            <RSelect
              placeholder="Estado de México"
              id="receiverCounty"
              name="receiverCounty"
              ref={register({
                required: "Este campo no puede estar vacio",
              })}
              options={states.map((state) => ({
                label: state.name,
                value: state.isoCode,
                countryCode: state.countryCode,
              }))}
              onChange={onStateChoose}
            />
            <ErrorMessage
              errors={errors}
              name="receiverCounty"
              render={({ message }) => (
                <span className="invalid">{message}</span>
              )}
            />
          </FormGroup>
          <FormGroup className="col-md-3">
            <label htmlFor="receiverCity" className="form-label">
              Ciudad
            </label>
            <Controller
              name="receiverCity"
              control={control}
              render={({ onChange, ref }) => (
                <RSelect
                  id="shipperCity"
                  inputRef={ref}
                  options={cities.map((city) => ({
                    label: city.name,
                    value: city.isoCode,
                  }))}
                  onChange={(e) => {
                    onStateChoose(e);
                    onChange(e.label);
                  }}
                />
              )}
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
              Siguiente
            </Button>
          </FormGroup>
        </div>
      </Form>
    </>
  );
}
