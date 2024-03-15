import { Router } from "express";
import { ContactController } from "../controllers/contactController";
import tryCatchWrapper from "../wrappers/tryCatchWrapper";

const router = Router();
const contactController = new ContactController();

// =============== ContactController =================
router.post(
  "/submit-enquiry",
  tryCatchWrapper(contactController.submitEnquiry)
);

export { router as contactRouter };
