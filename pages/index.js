import Head from 'next/head'
import PageTitle from "../components/PageTitle/PageTitle";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from "../components/ProductCard/ProductCard";

export default function Home(props) {
  const products = props.products

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  return (
    <>
    <PageTitle title="StoreFront" tagline="featured products"/> 
    <main>
        { products.map(product => <ProductCard key={product.uid} product={product} />)}
    </main>
    
    </>
    )
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