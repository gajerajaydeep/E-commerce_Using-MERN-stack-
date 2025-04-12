import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

export default function ShoppingLayout() {
    return (
        <>
            <div className='flex flex-col bg-white overflow-hidden'>
                {/* header */}
                <ShoppingHeader/>
                <main className='flex flex-col w-full'>
                    {/* render a child */}
                    <Outlet />
                </main>

            </div>

        </>
    )
}
