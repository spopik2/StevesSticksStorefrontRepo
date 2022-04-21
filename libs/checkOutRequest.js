async function checkOutRequest(uid) {
    
    const data = JSON.stringify({uid})
    const checkoutSession= await fetch('/api/products',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:data
    })    
   
    return null
};

export {checkOutRequest}