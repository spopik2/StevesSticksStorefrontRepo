import styles from "./../styles/products.module.css";
import { loadStripe } from "@stripe/stripe-js";
import Link from 'next/link' 
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

import { checkOutRequest } from "./../libs/checkOutRequest";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Product({ productName, uid, productPrice, imageUrl, productDescription, ...props }) {
  const name= "test"
  function onHandlePurchase() {
    fetch("api/products", {
      method: "POST",
      body:  JSON.stringify( { uid} ),
    })
  }

  return (
    <li className={styles.productItem}>
      <img src={imageUrl} alt="" width="100" />
      <p className={styles.name}>  {productName}</p>
      <p className={styles.price}>${productPrice}</p>

      <p className={styles.description}>{productDescription.substring(0,100)}    
       <Link href={`product/${uid}`}>
          <a> read more....</a>
        </Link> 
      </p>
      <form action="/api/checkout" method="POST">
        <input type="hidden" name="uid" value={uid} />
         <button type="submit">buy now</button>
      </form>
    </li>
  );
}

function IndexPage(props) {
  const featuredProducts = Object.values(props.products).slice(0, 3);

  return (
    <>
    <header className={styles.header}>
      <h1 >StoreFront</h1>
      <p>featured products</p>
    </header>
    <ul className={styles.productList}>
      {featuredProducts.map((product) => (
        <Product
          key={product.uid}
          {...product}
          checkOutRequest={checkOutRequest}
        />
      ))}
    </ul>
    </>
  );
}

export async function getStaticProps(){
  const res = await fetch('https://storefront-2813c-default-rtdb.firebaseio.com/products.json')
  const productData = await res.json();
  const products = Object.values(productData)
  return {
      props:{
        products,
        fallback:false
      },
      revalidate:60
  }
}
export default IndexPage;