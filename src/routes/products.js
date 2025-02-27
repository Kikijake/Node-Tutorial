import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createProductValidationSchema,
  getProductsValidationSchema,
  productDetailValidationSchema,
  updateProductValidationSchema,
  deleteProductValidationSchema,
} from "../utils/validationSchemas.js";
import { checkValidationResult, validate, resolveIndexById } from "../utils/middlewares.js";
import mockProducts from "../mocks/mockProducts.json" assert { type: "json" };
import { responseSuccess, responseError } from "../utils/response.js";

const router = Router();

router.get(
  "/api/products",
  validate(getProductsValidationSchema),
  (req, res) => {
    const { name } = req.validated;
    // console.log(req.sessionID);
    req.sessionStore.get(req.sessionID, (err, session) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(session);
    });
      const filteredProducts = mockProducts.filter((product) => {
        if (name?.length > 0) {
          return product.name
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase());
        }
        return true;
      });
      return responseSuccess(res, filteredProducts, "Retrieve Products Success");
  }
);

router.get(
  "/api/products/:id",
  validate(productDetailValidationSchema),
  resolveIndexById,
  (req, res) => {
    const { findProductIndex } = req;
    return responseSuccess(res, mockProducts[findProductIndex], "Retrieve Product Success");
  }
);

router.post(
  "/api/products",
  validate(createProductValidationSchema),
  (req, res) => {
    const { name, price } = req.validated;
    const newProduct = {
      id: mockProducts[mockProducts.length - 1].id + 1,
      name,
      price,
    };
    mockProducts.push(newProduct);
    return responseSuccess(res, newProduct, "Product created");
  }
);

router.put(
  "/api/products/:id",
  validate(updateProductValidationSchema),
  resolveIndexById,
  (req, res) => {
    const { body, findProductIndex } = req;
    mockProducts[findProductIndex] = {
      id: mockProducts[findProductIndex].id,
      ...body,
    };
    return responseSuccess(
      res,
      mockProducts[findProductIndex],
      "Product Updated"
    );
  }
);

router.patch(
  "/api/products/:id",
  validate(updateProductValidationSchema),
  resolveIndexById,
  (req, res) => {
    const { body, findProductIndex } = req;
    mockProducts[findProductIndex] = {
      id: mockProducts[findProductIndex].id,
      ...mockProducts[findProductIndex],
      ...body,
    };
    return responseSuccess(
      res,
      mockProducts[findProductIndex],
      "Product Updated"
    );
  }
);

router.delete(
  "/api/products/:id",
  validate(deleteProductValidationSchema),
  resolveIndexById,
  (req, res) => {
    const { id, findProductIndex } = req;
    mockProducts.splice(findProductIndex, 1);
    return responseSuccess(res, null, `Product id ${id} deleted`);
  }
);

export default router;