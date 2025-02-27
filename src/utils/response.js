export const responseSuccess = ( res, data = null, message = 'Success') => {
  return res.status(200).send({
    code: 200,
    status: "success",
    message,
    data,
  });
}

export const responseError = ( res, errors = null,message = 'Error') => {
  return res.status(400).send({
    code: 400,
    status: "failed",
    message,
    errors,
  });
}