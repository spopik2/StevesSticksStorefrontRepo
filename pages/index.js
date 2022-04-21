import styles from "./../styles/products.module.css";
import { loadStripe } from "@stripe/stripe-js";

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
      <div className="productCardContents">
        <p className={styles.name}>  {productName}</p>
        <p className={styles.price}>${productPrice}</p>
        <p className={styles.description}>{productDescription}    
        </p>
        <form action="/api/checkout" method="POST">
          <input type="hidden" name="uid" value={uid} />
          <button type="submit">Buy</button>
        </form>
      </div>
    </li>
  );
}

function IndexPage(props) {
  const featuredProducts = Object.values(props.products).slice(0, 3);

  return (
    <>
    <header className={styles.header}>
      <h1 >Steves Sticks</h1>
      <p>Welcome to Steves Stick. Your one stop shop for all new and used hockey sticks</p>
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