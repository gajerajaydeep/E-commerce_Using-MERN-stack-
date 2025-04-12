
// import { Card, CardContent, CardFooter,CardHeader,CardTitle } from '../../components/ui'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { useSelector } from 'react-redux';


export default function AdminDashBoard() {

  const { user } = useSelector(state => state.auth)


  console.log(user, 'user-name');
  return (

    <>
    <div className='font-extrabold'>
      <h1 className='font-extrabold text-3xl'>WelCome To Admin Panel</h1>
    </div>
      <div className='w-1/2 mt-5'>
        <Card>
         <CardHeader>
          <CardTitle className='flex justify-center'>Admin</CardTitle>
         </CardHeader>
         <CardContent lassName='flex justify-center'>
          <h3>User Name : {user.username}</h3>
          <h3>E-mail : {user.email}</h3>
          <h3>E-mail : {user.role}</h3>
         </CardContent>
        </Card>
      </div>

    </>

  )
}
