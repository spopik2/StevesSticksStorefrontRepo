import { getProduct } from "../../libs/getProduct";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const product = await getProduct(req.body.uid);
  if(product){
    if (req.method === 'POST') {
      try {
        const session = await stripe.checkout.sessions.create({
              line_items: [
            {
              name:product.productName,
              description: product.productDescription,
              images:[product.imageUrl],
              amount: product.productPrice*100,
              currency:"CAD",
              quantity:1
  
            },
          ],
          mode: 'payment',
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
   }
}