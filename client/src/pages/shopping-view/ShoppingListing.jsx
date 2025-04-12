import ProductDetailsDailog from '@/components/shopping-view/ProductDetailsDailog'
import ProductFilter from '@/components/shopping-view/ProductFilter'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchAllFilterdProducts, fetchproductDetails } from '@/store/shop/products-slice'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&')
}

export default function ShoppingListing() {

  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const { user } = useSelector(state => state.auth)

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
 const {toast} = useToast();




  function handleSort(value) {
    setSort(value);
  }
  function handleFilter(getSectionId, getCurrentOption) {

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOFCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOFCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption)
      } else {
        cpyFilters[getSectionId].splice(indexOFCurrentOption, 1)
      }
    }
    // console.log(cpyFilters);
    setFilters(cpyFilters)
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
  }

  useEffect(() => {
    setSort('price-lowtohigh');
    const storedFilters = sessionStorage.getItem('filters');
    setFilters(storedFilters ? JSON.parse(storedFilters) : {});
  }, [])

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchproductDetails(getCurrentProductId))
  }


  function handleAddtoCart(getCurrentProductId) {

    dispatch(addTocart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        console.log("Add to cart response:", data);
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



  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }

  }, [filters])

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilterdProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters])

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [productDetails])


 
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 '>
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div className='bg-background w-full rounded-lg shadow-sm'>
          <div className='p-4 border-b flex items-center  justify-between'>
            <h2 className='text-lg font-extrabold '>All Products</h2>
            <div className='flex items-center gap-3'>
              <span className='text-muted-foreground'><span className='font-semibold'>{productList.length} </span> Products</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outlinne' size='sm' className='flex items-center gap-1'>
                    <ArrowUpDownIcon className='h-4 w-4' />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[200px]'>
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {
                      sortOptions.map((sortItem) => <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>)
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4  gap-4 p-4 '>
            {
              productList && productList.length > 0
                ?
                productList.map((productItem => <ShoppingProductTile product={productItem}
                  handleGetProductDetails={handleGetProductDetails} key={productItem.title}
                  handleAddtoCart={handleAddtoCart}
                  
                />))
                :
                null
            }
          </div>


        </div>
        {productDetails && (
          <ProductDetailsDailog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
          />
        )}
      </div>
    </>
  )
}
