import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  getUsersValidationSchema,
  userDetailValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
  deleteUserValidationSchema,
} from "../utils/validationSchemas.js";
import { validate, resolveUserIndexById } from "../utils/middlewares.js";
import mockUsers from "../mocks/mockUsers.json" assert { type: "json" };
import { responseSuccess, responseError } from "../utils/response.js";
import User from "../mongoose/schemas/user.js";
import { hashPassword } from "../utils/helpers.js";

const router = Router();

router.get("/api/users", validate(getUsersValidationSchema), (req, res) => {
  const { name } = req.validated;
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("Inside Session Store Get");
    console.log(session);
  });
  const filteredUsers = mockUsers.filter((user) => {
    if (name?.length > 0) {
      return (
        user.username.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
        user.displayName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    return true;
  });
  return responseSuccess(res, filteredUsers, "Retrieve Users Successfully");
});

router.get(
  "/api/users/:id",
  validate(userDetailValidationSchema),
  resolveUserIndexById,
  (req, res) => {
    const { findUserIndex } = req;
    return responseSuccess(
      res,
      mockUsers[findUserIndex],
      "Retrieve User Successfully"
    );
  }
);

// router.post(
//   "/api/users",
//   validate(createUserValidationSchema),
//   (req, res) => {
//     const { username, displayName, password } = req.validated;
//     const newUser = {
//       id: mockUsers[mockUsers.length - 1].id + 1,
//       username,
//       displayName,
//       password
//     };
//     mockUsers.push(newUser);
//     return responseSuccess(res, newUser, "User created");
//   }
// );

router.post(
  "/api/users",
  validate(createUserValidationSchema),
  async (req, res) => {
    const data = req.validated;
    data.password = hashPassword(data.password);
    console.log(data);
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return responseSuccess(res, savedUser, "User created");
    } catch (error) {
      return responseError(res, error, 500);
    }
  }
);

router.put(
  "/api/users/:id",
  validate(updateUserValidationSchema),
  resolveUserIndexById,
  (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = {
      id: mockUsers[findUserIndex].id,
      ...body,
    };
    return responseSuccess(res, mockUsers[findUserIndex], "User Updated");
  }
);

router.patch(
  "/api/users/:id",
  validate(updateUserValidationSchema),
  resolveUserIndexById,
  (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = {
      id: mockUsers[findUserIndex].id,
      ...mockUsers[findUserIndex],
      ...body,
    };
    return responseSuccess(res, mockUsers[findUserIndex], "User Updated");
  }
);

router.delete(
  "/api/users/:id",
  validate(deleteUserValidationSchema),
  resolveUserIndexById,
  (req, res) => {
    const { id, findUserIndex } = req;
    mockUsers.splice(findUserIndex, 1);
    return responseSuccess(res, null, `User id ${id} deleted`);
  }
);

export default router;
