// Importing modules
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import sha256 from "sha256";
import uniqid from "uniqid";

// Creating express application
const app = express();

// UAT environment
const MERCHANT_ID: string = "PGTESTPAYUAT"; // Test key
const PHONE_PE_HOST_URL: string = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_INDEX: number = 1;
const SALT_KEY: string = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"; // Test salt key
const APP_BE_URL: string = "http://localhost:3002"; // Application backend URL

// Setting up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Defining a test route
app.get("/", (req: Request, res: Response) => {
  res.send("PhonePe Integration APIs!");
});

// Endpoint to initiate a payment
app.get("/pay", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Transaction amount
    const amount: number = parseFloat(req.query.amount as string);

    // User ID is the ID of the user present in our application DB
    const userId: string = "MUID123";

    // Generate a unique merchant transaction ID for each transaction
    const merchantTransactionId: string = uniqid();

    // Redirect URL => PhonePe will redirect the user to this URL once payment is completed
    const normalPayLoad = {
      merchantId: MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100, // Converting to paise
      redirectUrl: `${APP_BE_URL}/payment/validate/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      mobileNumber: "4592047593",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Make base64 encoded payload
    const bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    const base64EncodedPayload = bufferObj.toString("base64");

    // Generate X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    const stringToHash = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    const sha256_val = sha256(stringToHash);
    const xVerifyChecksum = `${sha256_val}###${SALT_INDEX}`;

    // Make API request
    const response = await axios.post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      {
        request: base64EncodedPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    );

    console.log("response->", JSON.stringify(response.data));
    res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
  } catch (error: any) {
    console.error("Error during payment initiation:", error.message);
    res.status(500).send(error.message || "Internal Server Error");
  }
});

// Endpoint to check the status of payment
app.get("/payment/validate/:merchantTransactionId", async (req: Request, res: Response) => {
  const { merchantTransactionId } = req.params;

  if (merchantTransactionId) {
    try {
      const statusUrl = `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;

      // Generate X-VERIFY
      const stringToHash = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}${SALT_KEY}`;
      const sha256_val = sha256(stringToHash);
      const xVerifyChecksum = `${sha256_val}###${SALT_INDEX}`;

      const response = await axios.get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "X-MERCHANT-ID": merchantTransactionId,
          accept: "application/json",
        },
      });

      console.log("response->", response.data);
      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        // Redirect to frontend payment success status page
        res.send(response.data);
      } else {
        // Handle payment failure or pending status
        res.status(400).send("Payment failed or is pending.");
      }
    } catch (error: any) {
      console.error("Error during payment validation:", error.message);
      res.status(500).send(error.message || "Internal Server Error");
    }
  } else {
    res.status(400).send("Invalid merchant transaction ID.");
  }
});

// Starting the server
const port: number = 3002;
app.listen(port, () => {
  console.log(`PhonePe application listening on port ${port}`);
});
