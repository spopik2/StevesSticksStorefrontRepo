async function getProduct(uid) {
    const res = await fetch(
        `https://storefront-2813c-default-rtdb.firebaseio.com/products/${uid}.json`
    );
    const data = await res.json();
    return data;
}

export { getProduct };