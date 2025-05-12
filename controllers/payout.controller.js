async function payout() {}

async function createContact() {
  try {
    const {
      name,
      email,
      contactNo,
      type = "employee",
      reference_id,
      notes,
    } = req.body;

    if (!name || !email || !contactNo) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, email, contact" });
    }

    const contactData = {
      name,
      email,
      contact,
      type,
      reference_id: reference_id || `user_${Date.now()}`,
      notes: notes || {},
    };

    const contact = await razorpay.contacts.create(contactData);

    return res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error("Error creating Razorpay contact:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function fundAccount() {}

export { payout, createContact, fundAccount };
