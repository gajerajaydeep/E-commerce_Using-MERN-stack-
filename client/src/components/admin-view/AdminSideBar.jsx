import { ChartNoAxesCombined, LayoutDashboard, ShoppingBasket, ShoppingCart } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icons: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icons: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icons: <ShoppingCart />
  }
]

function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map(menuItem => <div key={menuItem.id}
        onClick={() =>{
           navigate(menuItem.path)
            setOpen ? setOpen(false) : null;
          }}
        className='flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground
         hover:bg-slate-200 hover:text-black
        
        '>
        {menuItem.icons}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}

export default function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className="w-64 bg-gray-100">
          <div className="flex flex-col h-full" >
            <SheetHeader className="border-b">
              <SheetTitle className='flex gap-2 mt-5 mb-5'>

                <ChartNoAxesCombined size={30} />
                <span>    Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>

        <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2' >
          <ChartNoAxesCombined size={30} />
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />

      </aside>
    </>
  )
}
