import usermodel from "../models/userModel.js"

// ── Get all customers ──
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await usermodel
      .find({})
      .select("-password -cartdata")
      .sort({ _id: -1 })

    res.json({ success: true, customers,stats:{total:customers} })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Get single customer — id from body ──
export const getSingleCustomer = async (req, res) => {
  try {
    const { customerId } = req.body

    if (!customerId) {
      return res.json({ success: false, message: "customerId is required" })
    }

    const customer = await usermodel
      .findById(customerId)
      .select("-password -cartdata")

    if (!customer) {
      return res.json({ success: false, message: "Customer not found" })
    }

    res.json({ success: true, customer })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Delete customer — id from body ──
export const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.body

    if (!customerId) {
      return res.json({ success: false, message: "customerId is required" })
    }

    const customer = await usermodel.findById(customerId)
    if (!customer) {
      return res.json({ success: false, message: "Customer not found" })
    }

    await usermodel.findByIdAndDelete(customerId)

    res.json({ success: true, message: "Customer deleted successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Block / Unblock — id from body ──
export const toggleBlockCustomer = async (req, res) => {
  try {
    const { customerId } = req.body

    if (!customerId) {
      return res.json({ success: false, message: "customerId is required" })
    }

    const customer = await usermodel.findById(customerId)
    if (!customer) {
      return res.json({ success: false, message: "Customer not found" })
    }

    customer.isBlocked = !customer.isBlocked
    await customer.save()

    res.json({
      success: true,
      message: customer.isBlocked ? "Customer blocked" : "Customer unblocked",
      isBlocked: customer.isBlocked,
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}