export const getProductsValidationSchema = {
  name: {
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "name field must be string",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "name field must be less than 10 characters",
    },
  },
};

export const productDetailValidationSchema = {
  id: {
    in: ["params"],
    optional: true,
  },
};

export const createProductValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name is required",
    },
    isString: {
      errorMessage: "name field must be string",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "price is required",
    },
    isNumeric: {
      errorMessage: "price field must be number",
    },
  },
};

export const updateProductValidationSchema = {
  id: {
    notEmpty: {
      errorMessage: "ID is required",
    },
  },
  name: {
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "name field must be string",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "name field must be less than 10 characters",
    },
  },
  price: {
    optional: {
      options: { nullable: true },
    },
    isNumeric: {
      errorMessage: "price field must be number",
    },
  },
};

export const deleteProductValidationSchema = {
  id: {
    notEmpty: {
      errorMessage: "id is required",
    },
  }
};

export const getUsersValidationSchema = {
  name: {
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "name field must be string",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "name field must be less than 10 characters",
    },
  },
};

export const userDetailValidationSchema = {
  id: {
    in: ["params"],
    optional: true,
  },
};

export const createUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "username is required",
    },
    isString: {
      errorMessage: "username field must be string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "displayName is required",
    },
    isString: {
      errorMessage: "displayName field must be string",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password is required",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "password field must be less than 10 characters",
    },
  },
};

export const updateUserValidationSchema = {
  id: {
    notEmpty: {
      errorMessage: "ID is required",
    },
  },
  username: {
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "username field must be string",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "username field must be less than 10 characters",
    },
  },
  displayName: {
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "displayName field must be string",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "displayName field must be less than 10 characters",
    },
  },
  password: {
    optional: {
      options: { nullable: true },
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "password field must be less than 10 characters",
    },
  },
};

export const deleteUserValidationSchema = {
  id: {
    notEmpty: {
      errorMessage: "id is required",
    },
  },
};

export const loginValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "username is required",
    },
    isString: {
      errorMessage: "username field must be string",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password is required",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "password field must be less than 10 characters",
    },
  },
};