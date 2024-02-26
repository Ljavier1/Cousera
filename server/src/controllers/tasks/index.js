import newTaskController from "./newTaskController.js";
import listTasksController from "./listTasksController.js";
import solutionsEntryController from "./solutionsEntryController.js";
import getTaskController from "./getTaskController.js";
import commentsTaskController from "./commentsTaskController.js";
import editStatusTaskController from "./editStatusTasksController.js";

// Modelos de tareas:
// Se comentan los modelos que no se están utilizando:
// import selectCompletedTasksModel from "./models/tasks/selectCompletedTasksModel.js";
// import selectUncompletedTasksModel from "./models/tasks/selectUncompletedTasksModel.js";

// Importación correcta de searchTasksModel:
import searchTasksModel from '../../../models/tasks/searchTasksModel.js'
// Modelos de usuarios (si se usan en este archivo):
import { userModel, userExistsModel } from "../models/users/index.js"; // Importación múltiple

// Controlador de búsqueda:
import searchTasksController from "./searchTasksController.js";

export {
  newTaskController,
  listTasksController,
  solutionsEntryController,
  getTaskController,
  commentsTaskController,
  editStatusTaskController,
  searchTasksController,
  searchTasksModel,
  // Modelos comentados por no utilizarse:
  // selectUncompletedTasksModel,
  // selectCompletedTasksModel,
  // Modelos de usuarios:
  userModel,
  userExistsModel,
};
