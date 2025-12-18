import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react'
import useFetchProducts from '../utils/useFetchProducts'



export const Product = () => {
    
    const [selectedRating, setSelectedRating] = useState("4.0")   
    const [ cart, setCart] = useState(0)

    const {prodList, loading, error} = useFetchProducts()
   console.log("products:", prodList?.products);


 const ratings = useMemo(() => {
  if (!prodList?.products) return [];

  return [...new Set(
    prodList.products.map(p => Math.floor(Number(p.rating)))
  )].sort((a, b) => b - a); 
}, [prodList]);


    console.log("dasas",ratings);
    const filteredProducts = useMemo(() => {
  if (!selectedRating) return prodList?.products || [];

  return prodList?.products?.filter(
    (p) => Math.floor(Number(p.rating)) >= selectedRating
  );
}, [prodList, selectedRating]);

   
    if(loading){
      return (
        <div>
          loading.......
        </div>
      )
    }

    return (
      <div>
        {/* <div>
          <h1>Header</h1>
          <span>Cart{cart===0? "": cart}</span>
        </div> */}
         <>
              <select
  value={selectedRating}
  onChange={(e) => setSelectedRating(Number(e.target.value))}
>
  <option value="">Select Rating</option>

  {ratings.map((rating) => (
    <option key={rating} value={rating}>
      {rating} & above
    </option>
  ))}
</select>

            </>
        <div className='main'>
           
         {filteredProducts?.map((prod) => (
  <div className='prod-map' key={prod.id}>
    <div className='prod-details'>
      <img
        className='prod-img'
        src={prod.images?.[1] || prod.images?.[0]}
        alt={prod.title}
      />
      <button >Add to Cart</button>
    </div>
  </div>
))}

        </div>
      </div>
    )
}
