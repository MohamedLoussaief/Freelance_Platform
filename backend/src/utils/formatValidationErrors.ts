import { ValidationError } from "class-validator";

export const formatValidationErrors = (errors: ValidationError[]) => {
  return errors.map((error) => ({
    field: error.property,
    messages: Object.values(error.constraints || {}),
  }));
};
