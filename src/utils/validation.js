import * as yup from "yup"
import rules from "./validation_rules"
import error from "./error"

/**
 * 
 * @param {Object} data is data to validate
 * @param {Object} schemaRule schema object
 */
const isValid = (data, schemaRule) => {
  return new Promise( async (resolve, reject) => {
    await yup.object()
    .shape(schemaRule)
    .validate(data, { abortEarly: false })
    .catch((detail) => { 
      reject(new error.new(error.message.invalid, { validation: detail.errors }))
    })

    resolve(true)
  })
}

export {
  rules
}

export default (schema, data) => {
  return isValid(data, schema)
}