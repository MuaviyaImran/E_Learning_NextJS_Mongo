export function validateLogin(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password =
      "Password must be greater than 6 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function validateRegister(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.includes(" ")) {
    errors.firstName = "Invalid firstName...!";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length != 10) {
    errors.phone = "Invalid Phone Number...!";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.includes(" ")) {
    errors.lastName = "Invalid lastName...!";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password =
      "Password must be greater then 6 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password Not Match...!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm Password";
  }

  if (!values.agree) {
    errors.agree = "You must agree to the terms & conditions";
  }

  return errors;
}

export function validateChangePassword(values) {
  const errors = {};

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validate new password
  if (!values.npassword) {
    errors.npassword = "Required";
  } else if (values.npassword.length < 4 || values.npassword.length > 20) {
    errors.npassword =
      "Must be greater then 4 and less then 20 characters long";
  } else if (values.npassword.includes(" ")) {
    errors.npassword = "Invalid Password";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.npassword !== values.cpassword) {
    errors.cpassword = "Password Not Match...!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm Password";
  }

  return errors;
}

export function validateForgot(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}
