import * as express from "express";
import * as bodyParser from "body-parser";
import { createHmac } from "crypto";
import { Request, Response } from "express"; // Import types

const app = express();
const port = 3000;

// Paytm Credentials
const merchantId = "DIY12386817555501617";  // Your Paytm Merchant ID
const merchantKey = "bKMfNxPPf_QdZppa";     // Your Paytm Merchant Key
const websiteName = "Payment";               // Your Paytm Website Name

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the payment form
app.get("/", (req: Request, res: Response) => {
    res.send(`
        <form action="/initiate-payment" method="POST">
            <label for="orderId">Order ID:</label>
            <input type="text" name="orderId" required /><br/>

            <label for="customerId">Customer ID:</label>
            <input type="text" name="customerId" required /><br/>

            <label for="amount">Amount:</label>
            <input type="number" name="amount" required /><br/>

            <!-- Select payment method -->
            <label for="paymentMethod">Choose Payment Method:</label>
            <select name="paymentMethod">
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
            </select><br/>

            <button type="submit">Pay Now</button>
        </form>
    `);
});

// Route to initiate the payment
app.post("/initiate-payment", (req: Request, res: Response) => {
    const { orderId, customerId, amount, paymentMethod } = req.body;

    // Define parameters
    const params = {
        MID: merchantId,
        WEBSITE: websiteName,
        INDUSTRY_TYPE_ID: "Retail",
        CHANNEL_ID: "WEB",
        ORDER_ID: orderId,
        CUST_ID: customerId,
        TXN_AMOUNT: amount,
        CALLBACK_URL: `http://localhost:${port}/callback`,
        PAYMENT_MODE: paymentMethod, // Include payment method
    };

    // Generate checksum
    const checksum = generateChecksum(params, merchantKey);

    // Create the form HTML to redirect to Paytm
    const formHtml = Object.keys(params)
        .map((key) => {
            return `<input type="hidden" name="${key}" value="${params[key]}"/>`;
        })
        .join("");

    // Log parameters and checksum for debugging
    console.log("Parameters:", params);
    console.log("Generated Checksum:", checksum);

    // Send response to redirect to Paytm
    res.send(`
        <html>
            <body>
                <h1>Redirecting to Paytm...</h1>
                <form id="paytmForm" method="POST" action="https://securegw-stage.paytm.in/order/process">
                    ${formHtml}
                    <input type="hidden" name="CHECKSUMHASH" value="${checksum}" />
                </form>
                <script>document.getElementById('paytmForm').submit();</script>
            </body>
        </html>
    `);
});

// Route to handle the callback
app.post("/callback", (req: Request, res: Response) => {
    const { CHECKSUMHASH, ...restParams } = req.body;

    // Log the callback parameters for debugging
    console.log("Callback Parameters:", req.body);

    // Verify checksum
    const isValidChecksum = verifyChecksum(restParams, merchantKey, CHECKSUMHASH);

    // Handle the response
    if (isValidChecksum) {
        if (restParams.STATUS === "TXN_SUCCESS") {
            res.redirect(`/success?orderId=${restParams.ORDERID}`);
        } else {
            res.redirect(`/failure?orderId=${restParams.ORDERID}`);
        }
    } else {
        res.status(400).send("Checksum Mismatch");
    }
});

// Success page
app.get("/success", (req: Request, res: Response) => {
    const orderId = req.query.orderId ?? "Unknown";
    res.send(`Payment Successful! Order ID: ${orderId}`);
});

// Failure page
app.get("/failure", (req: Request, res: Response) => {
    const orderId = req.query.orderId ?? "Unknown";
    res.send(`Payment Failed! Order ID: ${orderId}`);
});

// Function to generate checksum
function generateChecksum(params: any, key: string): string {
    // Ensure parameters are sorted by key
    const stringifiedParams = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&");

    // Add the merchant key at the end
    const checksumString = stringifiedParams + `&KEY=${key}`;

    // Generate checksum using HMAC with SHA-256
    return createHmac("sha256", key).update(checksumString).digest("base64");
}

// Function to verify checksum
function verifyChecksum(params: any, key: string, checksum: string): boolean {
    const generatedChecksum = generateChecksum(params, key);
    return generatedChecksum === checksum;
}

app.listen(port, () => {
    console.log(`Payment portal running at http://localhost:${port}`);
});
