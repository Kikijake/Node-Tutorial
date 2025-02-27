import { validationResult, matchedData, checkSchema } from "express-validator";
import { responseError } from "./response.js";
import mockProducts from "../mocks/mockProducts.json" assert { type: "json" };
import mockUsers from "../mocks/mockUsers.json" assert { type: "json" };

export const checkValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return responseError(res, result.array(), "Validation Error");
  }
  req.validated = matchedData(req);
  next();
};

export const validate = (schema) => {
  return async (req, res, next) => {
    await Promise.all(
      checkSchema(schema).map((validation) => validation.run(req))
    );
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return responseError(res, result.array(), "Validation Error");
    }
    req.validated = matchedData(req);
    next();
  };
};

export const resolveIndexById = (req, res, next) => {
  const { id } = req.validated;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return responseError(res, null, "Invalid id");
  }
  const findProductIndex = mockProducts.findIndex((prd) => prd.id === parsedId);
  if (findProductIndex === -1) {
    return responseError(res, null, "Product not found");
  }
  req.findProductIndex = findProductIndex;
  req.id = parsedId;
  next();
};

export const resolveUserIndexById = (req, res, next) => {
  const { id } = req.validated;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return responseError(res, null, "Invalid id");
  }
  const findUserIndex = mockUsers.findIndex((usr) => usr.id === parsedId);
  if (findUserIndex === -1) {
    return responseError(res, null, "Product not found");
  }
  req.findUserIndex = findUserIndex;
  req.id = parsedId;
  next();
};

export const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};