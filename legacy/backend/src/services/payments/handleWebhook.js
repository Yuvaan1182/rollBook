const { verifyPayment } = require("./verifyWebhook");
const Invoice = require("../../models/Invoice"); // or relevant DB model

async function handleWebhook(provider, req, res) {
  const { valid, event, error } = await verifyPayment(provider, req);

  if (!valid) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    let invoiceId, status;

    if (provider === "stripe") {
      const { type, data } = event;
      if (type === "payment_link.completed") {
        invoiceId = data.object.metadata.invoiceId;
        status = "paid";
      }
    }

    if (provider === "razorpay") {
      const { payload } = event;
      invoiceId = payload.notes.invoiceId;
      status = "paid";
    }

    if (invoiceId && status === "paid") {
      await Invoice.findByIdAndUpdate(invoiceId, {
        status: "paid",
        paidAt: new Date()
      });

      console.log(`✅ Invoice ${invoiceId} marked as paid`);
    }

    return res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (err) {
    console.error("❌ Failed to update invoice:", err.message);
    return res.status(500).json({ success: false, message: "Internal error" });
  }
}

module.exports = { handleWebhook };
