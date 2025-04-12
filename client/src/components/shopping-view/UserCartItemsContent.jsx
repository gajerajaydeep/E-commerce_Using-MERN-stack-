import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'

export default function UserCartItemsContent({ cartItems }) {

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { toast } = useToast()


  function handleCartItemDelete(getCartItem) {
    console.log('Deleting item:', getCartItem);
    console.log(user.id, "user-id");

    dispatch(deleteCartItem({ userId: user.id, productId: getCartItem.productId })).then(data => {
      if (data.payload.success) {
        toast({
          title: 'Cart item is deleted successfully',
          variant: "success",
          className: "bg-green-500 text-white"
        })
      }

    })
  }

  function handleupdateQuantity(getCartItem, typeOfAction) {
    dispatch(updateCartQuantity({
      userId: user.id,
      productId: getCartItem.productId,
      quantity: typeOfAction === 'plus' ? getCartItem.quantity + 1 : getCartItem.quantity - 1
    })).then(data => {
      if (data.payload.success) {
        toast({
          title: 'Cart item is updated successfully',
          variant: "success",
          className: "bg-green-500 text-white"
        })
      }

    })
  }



  return (
    <>
      <div className='flex items-center space-x-4'>
        <img src={cartItems.image} alt={cartItems.title} className='w-20 h-20 rounded object-cover' />
        <div className='flex-1'>
          <h3 className='font-extrabold'>{cartItems.title}</h3>
          <div className='flex items-center gap-2 mt-1'>
            <Button className='bg-black text-white h-8 w-8 rounded-full' variant="outline" size='icon'
              onClick={() => handleupdateQuantity(cartItems, 'minus')}
              disabled={cartItems.quantity === 1}
            >
              <Minus className='w-4 h-4' />
              <span className='sr-only'>Decrease</span>
            </Button>
            <span className='font-semibold'>{cartItems.quantity}</span>
            <Button className='bg-black text-white h-8 w-8 rounded-full' variant="outline" size='icon'
              onClick={() => handleupdateQuantity(cartItems, 'plus')}
            >
              <Plus className='w-4 h-4' />
              <span className='sr-only'>Increment</span>
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='font-semibold'>
            ${((cartItems.salePrice > 0 ? cartItems.salePrice : cartItems.price) * cartItems.quantity).toFixed(2)}
          </p>
          <Trash onClick={() => handleCartItemDelete(cartItems)} className='cursor-pointer mt-1' size={20} />
        </div>
      </div>
    </>
  )
}
