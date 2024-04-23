import { Router } from "express";
import { deleteAgency, updateAgencyEmail, updateAgencyName, updateAgencyPassword } from "../controllers/agencyControllers.js"

const agencyRouter = Router();

agencyRouter.route("/update/username/:id").put(updateAgencyName);

agencyRouter.route("/update/password/:id").put(updateAgencyPassword);

agencyRouter.route("/update/email/:id").put(updateAgencyEmail);

agencyRouter.route("/delete/:id").delete(deleteAgency);


export default agencyRouter;