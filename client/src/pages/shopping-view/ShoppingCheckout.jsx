import React from 'react'
import CheckOutImg from '../../assets/account.jpg'
import Address from '@/components/shopping-view/Address'
import { useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/UserCartItemsContent'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';



export default function ShoppingCheckout() {

  const { cartItems } = useSelector(state => state.shopCart)
  const { toast } = useToast();

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
    cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem.salePrice > 0 ? currentItem.salePrice : currentItem?.price
    ) * currentItem.quantity, 0)
    : 0
  function handleCheckOut() {

    toast({
      title: "Product has been Placed successfully",
      variant: "success",
      className: "bg-green-500 text-white"
    })
  }
  return (
    <>
      <div className='flex flex-col'>
        <div className='relative h-[300px] w-full overflow-hidden'>
          <img
            src={CheckOutImg}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
          <Address />
          <div className='flex flex-col gap-4'>
            {
              cartItems && cartItems.items && cartItems.items.length > 0
                ?
                cartItems.items.map((items) => <UserCartItemsContent cartItems={items} />)
                :
                null
            }
            <div className='mt-8 space-y-4'>
              <div className='flex justify-between'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>${totalCartAmount}</span>
              </div>
            </div>
            <div className='mt-4 w-full'>
              <Button className='w-full' onClick={() => handleCheckOut()}>Cash on Delivery</Button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
