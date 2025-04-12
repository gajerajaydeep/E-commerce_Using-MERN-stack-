import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export default function AddressCard({addressInfo,handleDeleteAddress,handleEditAddress}) {


  return (
   <>
   <Card>
    <CardContent className='grid  p-4 gap-4'>
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>Pincode: {addressInfo.pincode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
    </CardContent>
    <CardFooter className='flex justify-between p-3' >
      <Button className="bg-black"
      onClick={()=>handleEditAddress(addressInfo)}
      >Edit</Button>
      <Button className="bg-black" onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
    </CardFooter>
   </Card>
   </>
  )
}
