export const notFoundError = (resourse) => {
  throw {
    httpStatus: 404,
    code: "RESOURECE_NOT_FOUND",
    message: `Esta ruta no existe ${resourse}`,
  };
};

export const userAlReadyRegistratedError = () => {
  throw {
    httpStatus: 409,
    code: "USER_ALREADY_EXIST",
    message: `Nombre de usuario ya en uso`,
  };
};

export const emailAlReadyRegistratedError = () => {
  throw {
    httpStatus: 409,
    code: "EMAIL_ALREDY_USED",
    message: `Email ya en uso`,
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401,
    code: "ERROR_CREDENTIALS_INCORRECT",
    message: `Credenciales incorrectas`,
  };
};

export const notAuthorizationError = () => {
  throw {
    httpStatus: 401,
    code: "NOT_ACREDITED",
    message: `Usuario no acreditado`,
  };
};

export const saveFileError = () => {
  throw {
    httpStatus: 500,
    code: "FILE_SAVE_FAILED",
    message: `Error al guardar archivo`,
  };
};

export const deleteFileError = () => {
  throw {
    httpStatus: 409,
    code: "FILE_DELETED_FAILED",
    message: `No se puede borrar la imagen`,
  };
};

export const canNotResolveTaskError = () => {
  throw {
    httpStatus: 403,
    code: "CANNOT_RESOLVE_TASK",
    message: `No puedes resolver tu propia tarea`,
  };
};

export const solutionAlredyExistError = () => {
  throw {
    httpStatus: 409,
    code: "SOLUTION_ALLREDY_TASK",
    message: `La tarea ya tiene solución`,
  };
};