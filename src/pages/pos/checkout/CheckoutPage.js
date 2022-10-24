import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Form, FormGroup } from "reactstrap";
import { Button, RSelect } from "../../../components/Component";
import { companyLogos } from "../../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setShipping } from "../../../store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { City, Country, State } from "country-state-city";
import { Controller } from "react-hook-form";
export default function CheckoutPage({ setPage }) {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, setValue, watch, control } =
    useForm();
  const [date, setDate] = useState(Date.now());
  const selected = useSelector((state) => state.rating.selected);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const shipping = useSelector((state) => state.shipping.data);
  const values = watch();
  console.log(values);
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
      setValue("plannedShippingDate", shipping.plannedShippingDate);
    }
  }, [shipping]);
  useEffect(() => {
    if (selected) {
      dispatch(
        setShipping({
          data: {
            ...shipping,
            shipperPostalCode: selected.originPostalCode,
            packageSize: selected.packageSize,
          },
        })
      );
    }
  }, []);
  const handleFirstPageSubmit = (formData) => {
    console.log(formData);
    dispatch(
      setShipping({
        data: {
          ...shipping,
          ...formData,
          shipperCellphone: `${formData.shipperCellphone}`,
        },
      })
    );
    setPage(2);
  };
  const onChangeDate = (newDate) => {
    setDate(newDate);
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
    <Form
      onSubmit={handleSubmit(handleFirstPageSubmit)}
      style={{ height: "500px" }}
      className="d-flex flex-column justify-content-between"
    >
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
            defaultValue="Envioshop"
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
        <FormGroup className="col-md-4">
          <label htmlFor="shipperCountry" className="form-label">
            País
          </label>
          <Controller
            name="shipperCountry"
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
        <FormGroup className="col-md-3">
          <label htmlFor="shipperCounty" className="form-label">
            Estado/Provincia
          </label>
          <RSelect
            placeholder="Estado de México"
            id="shipperCounty"
            name="shipperCounty"
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
          {/*<input
            type="text"
            id="shipperCounty"
            name="shipperCounty"
            ref={register({
              required: "Este campo no puede estar vacío",
            })}
            className="form-control form-control-lg"
          />*/}
          <ErrorMessage
            errors={errors}
            name="shipperCounty"
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        </FormGroup>
        <FormGroup className="col-md-3">
          <label htmlFor="shipperCity" className="form-label">
            Ciudad
          </label>
          <Controller
            name="shipperCity"
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
            name="shipperCity"
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
        <FormGroup className="col-3">
          <label htmlFor="shipperCountry" className="form-label">
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
            name="plannedShippingDate"
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
