import React from 'react';
import Image from 'next/image'
import {productCard, price, name, description} from './styles.module.scss'

function ProductCard ({children, product, ...props})  {
  const {productName, productPrice, productDescription, imageUrl}= {...product}
  return (
       <aside className={productCard}>
         <header>
            <Image
              src={imageUrl}
              alt={productName}
              width={418}
              height={240}
              quality={50}
            />
          
         </header>
          <p className={name}>{productName}</p>
          <p className={price}>${productPrice}</p>
          <p className={description}>{productDescription}</p>
          <footer>
            <form action="/api/checkout" method="POST">
              <input type="hidden" name="uid" value="uid"/>
              <button type="submit">Buy Now</button>
            </form>
          </footer>
       </aside>
  )
}

export default ProductCard