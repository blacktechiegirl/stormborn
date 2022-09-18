//We are creating a new Error class so we can update the
//statuscode and the status. We extend the default error class so
// so we can have access to the previous values in the object
//and update only the ones we need.

//By calling the new App Error class we are creating an Error object
//and updating the status and status code. The rest of the object
//is gotten from the extended error class.

class AppError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.operational = true;
    this.status = statuscode.toString().startsWith("4") ? "fail" : "error";
  }
}

module.exports = AppError;
