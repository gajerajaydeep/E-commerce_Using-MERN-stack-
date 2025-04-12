import ProductDetailsDailog from '@/components/shopping-view/ProductDetailsDailog';
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile';
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchproductDetails } from '@/store/shop/products-slice';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function SearchProducts() {

  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { searchResults } = useSelector(state => state.shopSearch);
  const { productDetails } = useSelector(state => state.shopProducts);
  const { cartItems } = useSelector(state => state.shopCart)
  const { toast } = useToast();
  const { user } = useSelector(state => state.auth)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  function handleAddtoCart(getCurrentProductId) {

    dispatch(addTocart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {

        if (data?.payload?.success) {

          dispatch(fetchCartItems({ userId: user.id }))
          toast({
            title: "Product has been added successfully",
            variant: "success",
            className: "bg-green-500 text-white"
          })
        }
      });
  }

    function handleGetProductDetails(getCurrentProductId) {
      dispatch(fetchproductDetails(getCurrentProductId))
    }
  

  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(getSearchResults(keyword))
      }, 1000)
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
      dispatch(resetSearchResults())
    }
  }, [keyword])

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [productDetails])
console.log(user.username , 'user-name');

  return (
    <>
      <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className='flex justify-center mb-8'>
          <Input className='py-6 ' value={keyword} name='keyword' onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
          />
        </div>
      </div>
      {
        !searchResults.length ? <h1 className='text-5xl font-extrabold'>No Result Found!</h1>
          : null
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {

          searchResults.map((item) => <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item} 
            handleGetProductDetails={handleGetProductDetails}
            />)

        }
      </div>
      {productDetails && (
        <ProductDetailsDailog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      )}
    </>
  )
}
