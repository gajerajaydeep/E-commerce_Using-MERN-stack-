import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommanForm from '../common/CommanForm'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from '@/store/shop/address-slice/index'
import AddressCard from './AddressCard'
import { useToast } from '@/hooks/use-toast'

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
}

export default function Address() {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopAddress)
    const {toast} = useToast()


    function handleManageAddress(event) {

        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null){
            setFormData(initialAddressFormData)
            toast({
                title :"You can Max 3 Addresses",
                variant : 'destructive'
            })
            return;
        }
        currentEditedId !== null
            ?
            dispatch(editaAddress({
                userId: user.id,
                addressId: currentEditedId,
                formData
            })).then((data) => {
                if (data.payload.success) {
                    dispatch(fetchAllAddresses(user.id))
                    setCurrentEditedId(null)
                    setFormData(initialAddressFormData);
                    toast({
                        title : 'Address Updated Succcessfully'
                    })
                }
            })
            :
            dispatch(
                addNewAddress({
                    ...formData,
                    userId: user.id,
                })
            ).then((data) => {
                console.log(data)
                if (data.payload.success) {
                    dispatch(fetchAllAddresses(user.id))
                    setFormData(initialAddressFormData)
                    toast({
                        title : 'Address Added Succcessfully'
                    })
                }
            })
    }

    function handleDeleteAddress(getCurrentAddress) {
      
        dispatch(deleteAddress({ userId: user.id, addressId: getCurrentAddress._id }))
            .then((data) => {
                if (data.payload && data.payload.success) {
                    dispatch(fetchAllAddresses(user.id))
                    toast({
                        title : 'Address Deleted Succcessfully'
                    });
                }
            });
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress._id)
        setFormData({
            ...formData,
            address: getCurrentAddress.address,
            city: getCurrentAddress.city,
            phone: getCurrentAddress.phone,
            pincode: getCurrentAddress.pincode,
            notes: getCurrentAddress.notes
        })
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item);
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user.id))
    }, [dispatch])



    return (
        <>
            <Card>
                <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2'>
                    {
                        addressList && addressList.length > 0 ?
                            addressList.map(singleAddressItem => <AddressCard
                                handleDeleteAddress={handleDeleteAddress}
                                addressInfo={singleAddressItem}
                                handleEditAddress={handleEditAddress}
                            />)
                            : null
                    }
                </div>
                <CardHeader>
                    <CardTitle>
                        {
                            currentEditedId !== null ? 'Edit Address' : 'Add New Address'
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <CommanForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={
                            currentEditedId !== null ? 'Edit ' : 'Add '
                        }
                        onSubmit={handleManageAddress}
                        isBtnDisabled={!isFormValid()}
                    />
                </CardContent>
            </Card>

        </>
    )
}
