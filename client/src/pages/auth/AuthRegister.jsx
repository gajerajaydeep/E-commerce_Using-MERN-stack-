import CommanForm from '@/components/common/CommanForm'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";



const initialState = {
    userName: '',
    email: '',
    password: ''
}
export default function AuthRegister() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData))
            .then((data) => {
                if (data?.payload?.success) {
                    toast({
                        title: data?.payload?.message || 'Registration successful',
                        variant: 'default'
                    });
                    navigate('/auth/login')
                } else {
                    toast({
                        title: data?.payload?.message || 'Registration failed',
                        variant: 'destructive'
                    });
                }
            })
            .catch((error) => {
                toast({
                    title: error.message || 'Registration failed',
                    variant: 'destructive'
                });
            });
    }
    console.log(formData);

    return (
        <>
            <div className='mx-auto w-full max-w-md space-y-6'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>

                    <p className='mt-2'>Already have an account
                        <Link className='font-medium ml-2  text-primary hover:underline' to='/auth/login'>Login</Link>
                    </p>

                </div>
                <CommanForm
                    formControls={registerFormControls}
                    buttonText={'Sign Up'}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />

            </div>

        </>
    )
}
