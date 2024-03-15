import "dotenv/config";
import app from "./app";
import { connect } from "mongoose";
const DB_URI = process.env.DB_URI;
const PORT: any = process.env.PORT || 5000;

if (DB_URI === undefined) {
  console.error("========= DB_URI Not Defined ========");
  process.exit(1);
}

connect(DB_URI as string)
  .then(() => {
    console.log("=============================================");
    console.log("********* DataBase Connection Successfull *********");
    console.log("=============================================");
  })
  .catch(() =>
    console.log(
      "*********** There Was Some issue in conenction with database ***********"
    )
  );

app.listen(PORT, "192.168.1.4", () => {
  console.log(`Server is running on port ${PORT}`);
});
