import { Schema, model } from "mongoose";

const enquirySchema = new Schema({
  name: String,
  phone: Number,
  message: String,
  country: {
    type: String,
    default: "India",
  },
  email: String,
  subject: String,
});

const Enquiry = model("Enquiries", enquirySchema);
export default Enquiry;
