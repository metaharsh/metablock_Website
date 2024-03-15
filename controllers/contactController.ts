import Enquiry from "../models/EnquiryModel";
import { sendEnquiryMail } from "../utils/sendEnquiryMail";
import { successResponse, failedResponse } from "../wrappers/response";
import { Request, Response } from "express";

export class ContactController {
  async submitEnquiry(req: Request, res: Response) {
    const { name, country, email, message, subject, phone, type } = req.body;

    if (!name || !email || !message || !phone) {
      return failedResponse(res, "Please Provide all Form Details..");
    }
    if (type === 1 && (!country)) {
      return failedResponse(res, "Please Provide all Form Details..");
    }
    const formData = { name, email, phone, message };
    const enquiry = await Enquiry.create(formData);
    await sendEnquiryMail(formData);
    return successResponse(res, "Form Submitted Successfully!", enquiry);
  }
}
