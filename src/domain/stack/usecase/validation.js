import validation, { rules } from "../../../utils/validation"
import * as yup from "yup"

const storeBody = (data) => {
  const schema = {
    title: yup.string().required(),
  }
  return validation(schema, data)
}

const updateBody = (data) => {
  const schema = {
    title: yup.string().required(),
  }
  return validation(schema, data)
}

export default {
  storeBody,
  updateBody
}