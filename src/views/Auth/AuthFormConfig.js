export const loginFormConfig = {
  email: {
    label: "Email:",
    elementType: "input",
    elementConfig: {
      name: "email",
      type: "email",
      placeholder: "Email Address",
    },
    value: "",
    valid: true,
    validityMessage: "This value is required and must be a valid email!",
    validatingRules: {
      required: true,
      isEmail: true,
    },
  },

  password: {
    label: "Password:",
    elementType: "input",
    elementConfig: {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    value: "",
    valid: true,
    validityMessage: "This value is required and minimum length must be 8!",
    validatingRules: {
      required: true,
      minLength: 8,
    },
  },
};
export const forgetPasswordFormConfig = {
  email: {
    label: "Email:",
    elementType: "input",
    elementConfig: {
      name: "email",
      type: "email",
      placeholder: "Email Address",
    },
    value: "",
    valid: true,
    validityMessage: "This value is required and must be a valid email!",
    validatingRules: {
      required: true,
      isEmail: true,
    },
  },
};

export const signUpFormConfig = {
  first_name: {
    label: "First Name",
    elementType: "input",
    elementConfig: {
      name: "first_name",
      type: "text",
      placeholder: "First Name",
    },
    value: "",
    valid: true,
    validityMessage: "This value is required!",
    validatingRules: {
      required: true,
    },
  },
  last_name: {
    label: "Last Name",
    elementType: "input",
    elementConfig: {
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
    },
    value: "",
    valid: true,
    validityMessage: "This value is required!",
    validatingRules: {
      required: true,
    },
  },

  email: {
    label: "Email",
    elementType: "input",
    elementConfig: {
      name: "email",
      type: "email",
      placeholder: "Email Address",
    },
    value: "",
    valid: true,
    validityMessage: "This value is required and must be a valid email!",
    validatingRules: {
      required: true,
      isEmail: true,
    },
  },

  password: {
    label: "Password:",
    elementType: "input",
    elementConfig: {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    value: "",
    valid: true,
    validityMessage:
      "This value is required and must contain 8 characters with 1 lowercase and 1 uppercase character and 1 number and 1 symbol!",
    validatingRules: {
      required: true,
      strongPassword: true,
    },
  },

  confirmPassword: {
    label: "Confirm Password:",
    elementType: "input",
    elementConfig: {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
    value: "",
    valid: true,
    validityMessage:
      "This value is required and must contain 8 characters with 1 lowercase and 1 uppercase character and 1 number and 1 symbol!. It must be same are password.",
    validatingRules: {
      required: true,
      strongPassword: true,
    },
  },
};
