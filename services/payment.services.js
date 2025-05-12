async function createPaymentService(options) {
  //TODO: get order details
  razorpay.orders.create(options, (err, order) => {
    if (err) {
      return;
    }
  });
  //TODO: create new payment record
  //TODO: call payment gateway to create payment
  //TODO: return payment secrets(URL)
}

async function verifyPaymentService() {
  // TODO: call the payment gateway to verify the payment
  // TODO: update order status through message broker
  // TODO: return the response
}
