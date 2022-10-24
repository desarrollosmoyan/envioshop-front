import { ErrorMessage } from "@hookform/error-message";
import { forwardRef } from "react";
import { FormGroup } from "reactstrap";

const Input = forwardRef(
  (
    {
      label = "",
      id = "",
      placeholder = "",
      containerClassName = "",
      type = "text",
      errors = null,
      text = null,
      name = null,
      setValue,
      ...props
    },
    ref
  ) => {
    return (
      <FormGroup className={`mb-2 col  ${containerClassName}`}>
        {label.length !== 0 ? (
          <label className="form-label" htmlFor={id}>
            {label}
          </label>
        ) : (
          <></>
        )}
        {text ? (
          <div className="input-group">
            <input
              className={`form-control form-control-lg border-${
                errors[id] ? "danger" : ""
              }`}
              id={id}
              name={!name ? id : name}
              type={type}
              ref={ref}
              placeholder={placeholder}
              {...props}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">{text}</div>
            </div>
          </div>
        ) : (
          <input
            className={`form-control form-control-lg border-${
              errors[id] ? "danger" : ""
            }`}
            id={id}
            name={id}
            type={type}
            ref={ref}
            placeholder={placeholder}
            {...props}
          />
        )}
        {!errors ? (
          <></>
        ) : (
          <ErrorMessage
            errors={errors}
            name={id}
            render={({ message }) => <span className="invalid">{message}</span>}
          />
        )}
      </FormGroup>
    );
  }
);

export default Input;
