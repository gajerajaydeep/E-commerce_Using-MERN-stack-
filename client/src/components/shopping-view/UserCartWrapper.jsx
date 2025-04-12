import React from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './UserCartItemsContent'
import { useNavigate } from 'react-router-dom'

export default function UserCartWrapper({ cartItems,setOpenCartSheet }) {

const navigate = useNavigate()

    const totalCartAmount = cartItems && cartItems.length > 0 ?
        cartItems.reduce((sum, currentItem) => sum + (
            currentItem.salePrice > 0 ? currentItem.salePrice : currentItem?.price
        ) * currentItem.quantity , 0)
        : 0
    return (
        <SheetContent className="sm:max-w-md bg-white text-black">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className='mt-8 space-y-4'>
                {
                    cartItems && cartItems.length > 0
                        ?
                        cartItems.map(item => <UserCartItemsContent cartItems={item} />)
                        :
                        null
                }
            </div>
            <div className='mt-8 space-y-4'>
                <div className='flex justify-between'>
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>${totalCartAmount}</span>
                </div>
            </div>
            <Button onClick={()=>
               { navigate('/shop/checkout')
                setOpenCartSheet(false)
               }
                } className='w-full bg-black text-white mt-6'>Checkout</Button>
        </SheetContent>
    )
}
