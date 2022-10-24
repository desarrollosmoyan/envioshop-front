import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, FormGroup, Row } from "reactstrap";
import { RSelect } from "../../components/Component";
import { Button } from "../../components/Component";
import { API_ENDPOINTS, countryItems } from "../../constants";
import { useDispatch } from "react-redux";
import { setRating } from "../../store/store";
import { selectRating } from "../../store/store";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/input/input/Input";
import { useSelector } from "react-redux";
export default function PosForm() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();
  const onFormSubmit = async (formData) => {
    try {
      const postData = {
        originPostalCode: formData.originPostalCode,
        destinyPostalCode: formData.destinyPostalCode,
        originCountry: "MX",
        destinyCountry: "MX",
        discount: formData.discount,
        packageSize: {
          length: formData.length,
          width: formData.width,
          height: formData.height,
          weight: formData.weight,
        },
      };
      const toastLoading = toast.loading("Cargando...", {
        type: "info",
        position: "bottom-right",
      });
      const { data } = await axios.post(
        API_ENDPOINTS.services.rating,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.update(toastLoading, {
        render: "Cotización realizada con éxito",
        type: "success",
        isLoading: false,
        closeOnClick: true,
      });
      setLoading(false);
      dispatch(setRating({ data: data }));
      dispatch(
        selectRating({
          selected: {
            originPostalCode: formData.originPostalCode,
            destinyPostalCode: formData.destinyPostalCode,
            packageSize: {
              length: formData.length,
              width: formData.width,
              height: formData.height,
              weight: formData.weight,
            },
          },
        })
      );
    } catch (error) {
      toast("Algo salió mal!", { type: "error" });
    }
  };
  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Container tag="div">
          <Row className="align-items-end align-items-lg-start">
            <Input
              label="Código Postal Origen"
              id="originPostalCode"
              errors={errors}
              placeholder="11800"
              ref={register({ required: "Codigo Postal de Origen requerido" })}
            />
            <FormGroup className="col mb-2">
              <label htmlFor="originCountry" className="form-label">
                Pais
              </label>
              <RSelect
                id="originCountry"
                name="originCountry"
                placeholder="Seleccionar"
                options={countryItems.map((country) => ({
                  label: country,
                  value: country,
                }))}
              />
            </FormGroup>
            <div className="w-100"></div>
            <Input
              label="Código Postal Destino"
              id="destinyPostalCode"
              placeholder="66800"
              errors={errors}
              ref={register({ required: "Codigo Postal Destino requerido" })}
            />
            <Input
              type="number"
              label="Descuento"
              max="20"
              min="0"
              id="discount"
              placeholder="0"
              errors={errors}
              text="%"
              ref={register({ required: "Descuento requerido" })}
            />
          </Row>
          <div className="my-2">
            <h5 className="mb-2">Medidas</h5>
            <span className="border border-2 w-100 d-block"></span>
          </div>
          <Row className="align-items-center">
            <Input
              type="number"
              label="Alto"
              id="height"
              text="CM"
              placeholder="10"
              containerClassName="col-4 col-lg-4"
              errors={errors}
              ref={register({
                required: "Alto requerido",
                valueAsNumber: true,
              })}
            />
            <Input
              type="number"
              label="Ancho"
              id="width"
              errors={errors}
              placeholder="10"
              text="CM"
              containerClassName="col-4 col-lg-4"
              ref={register({
                required: "Ancho requerido",
                valueAsNumber: true,
              })}
            />
            <Input
              type="number"
              label="Largo"
              id="length"
              text="CM"
              errors={errors}
              placeholder="10"
              containerClassName="col-4 col-lg-4"
              ref={register({
                required: "Largo requerido",
                valueAsNumber: true,
              })}
            />
            <div className="w-100"></div>
            <Input
              type="number"
              label="Peso"
              id="weight"
              text="KG"
              placeholder="1"
              errors={errors}
              containerClassName="col-4 col-lg-4"
              ref={register({
                required: "Peso requerido",
                valueAsNumber: true,
              })}
            />
          </Row>
          <div className="mt-2">
            <Button color="primary">
              Cotizar Envio <em className="icon ni ni-caret-right-fill"></em>
            </Button>
          </div>
        </Container>
      </Form>
    </>
  );
}
