const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });
const stripe = require('../src/config/stripe.config'); // adjust path as needed

async function logStripeProductsAndPrices() {
  try {
    // List all products
    const products = await stripe.products.list({ limit: 100 });
    for (const product of products.data) {
      console.log(`Product: ${product.name} (${product.id})`);
      // List all prices for this product
      const prices = await stripe.prices.list({ product: product.id, limit: 100 });
      for (const price of prices.data) {
        console.log(`  Price: ${price.id} | Amount: ${price.unit_amount} | Interval: ${price.recurring?.interval}`);
      }
    }
  } catch (err) {
    console.error('Error fetching products/prices from Stripe:', err);
  }
}

logStripeProductsAndPrices();