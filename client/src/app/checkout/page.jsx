"use client"
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";

import { MyContext } from '@/context/ThemeContext';

import { useRouter } from 'next/navigation';
import { fetchDataFromApi, postData } from '@/utils/api';
import Script from 'next/script';

const Checkout = () => {

    const [formFields, setFormFields] = useState({
        fullName: "",
        country: "",
        streetAddressLine1: "",
        streetAddressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: ""
    })

    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState();

    useEffect(() => {
        window.scrollTo(0,0)
        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
            setCartData(res);

            setTotalAmount(res.length !== 0 &&
                res.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0))


        })

    }, []);

    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const context = useContext(MyContext);
    const history = useRouter();

    const checkout = (e) => {

        e.preventDefault();


        console.log(cartData)

        console.log(formFields)
        if (formFields.fullName === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill full name "
            })
            return false
        }

        if (formFields.country === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill country "
            })
            return false
        }

        if (formFields.streetAddressLine1 === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill Street address"
            })
            return false
        }

        if (formFields.streetAddressLine2 === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill  Street address"
            })
            return false
        }

        if (formFields.city === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill city "
            })
            return false
        }

        if (formFields.state === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill state "
            })
            return false
        }

        if (formFields.zipCode === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill zipCode "
            })
            return false
        }

        if (formFields.phoneNumber === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill phone Number "
            })
            return false
        }

        if (formFields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill email"
            })
            return false
        }


        const addressInfo = {
            name: formFields.fullName,
            phoneNumber: formFields.phoneNumber,
            address: formFields.streetAddressLine1 + formFields.streetAddressLine2,
            pincode: formFields.zipCode,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }




        var options = {
            key: process.env.NEXT_PUBLIC_APP_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_APP_RAZORPAY_KEY_SECRET,
            amount: parseInt(totalAmount * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + formFields.fullName,
            name: "E-Bharat",
            description: "for testing purpose",
            handler: function (response) {

                 console.log(response)


                const paymentId = response.razorpay_payment_id

                const user = JSON.parse(localStorage.getItem("user"));

                const payLoad = {
                    name: addressInfo.name,
                    phoneNumber: formFields.phoneNumber,
                    address: addressInfo.address,
                    pincode: addressInfo.pincode,
                    amount: parseInt(totalAmount * 100),
                    paymentId: paymentId,
                    email: user.email,
                    userid: user.userId,
                    products: cartData
                }

               // console.log(payLoad)


                postData(`/api/orders/create`, payLoad).then(res => {
                    history.push("/orders");
                })



            },

            theme: {
                color: "#3399cc"
            }
        };


        var pay = new window.Razorpay(options);
        pay.open();


    }

    return (
    <>
        <section className='section'>
            <div className='container'>
                <form className='checkoutForm' onSubmit={checkout}>
                    <div className='row'>
                        <div className='col-md-8'>
                            <h2 className='hd'>BILLING DETAILS</h2>

                            <div className='row mt-3'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Full Name *" variant="outlined" className='w-100' size="small" name="fullName" onChange={onChangeInput} />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Country *" variant="outlined" className='w-100' size="small" name="country" onChange={onChangeInput} />
                                    </div>
                                </div>


                            </div>


                            <h6>Street address *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="House number and street name" variant="outlined" className='w-100' size="small" name="streetAddressLine1" onChange={onChangeInput} />
                                    </div>

                                    <div className='form-group'>
                                        <TextField label="Apartment, suite, unit, etc. (optional)" variant="outlined" className='w-100' size="small" name="streetAddressLine2" onChange={onChangeInput} />
                                    </div>

                                </div>
                            </div>



                            <h6>Town / City *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="City" variant="outlined" className='w-100' size="small" name="city" onChange={onChangeInput} />
                                    </div>

                                </div>
                            </div>

                            <h6>State / County *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="State" variant="outlined" className='w-100' size="small" name="state" onChange={onChangeInput} />
                                    </div>

                                </div>
                            </div>


                            <h6>Postcode / ZIP *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="ZIP Code" variant="outlined" className='w-100' size="small" name="zipCode" onChange={onChangeInput} />
                                    </div>

                                </div>
                            </div>


                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Phone Number" variant="outlined" className='w-100' size="small" name="phoneNumber" onChange={onChangeInput} />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Email Address" variant="outlined" className='w-100' size="small" name="email" onChange={onChangeInput} />
                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className='col-md-4'>
                            <div className='card orderInfo'>
                                <h4 className='hd'>YOUR ORDER</h4>
                                <div className='table-responsive mt-3'>
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartData?.length !== 0 && cartData?.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{item?.productTitle?.substr(0, 20) + '...'}  <b>× {item?.quantity}</b></td>

                                                            <td> 
                                                            
                                                            {
                                                                item?.subTotal?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                                                            }
                                                            
                                                         </td>
                                                        </tr>

                                                    )
                                                })
                                            }



                                            <tr>
                                                <td>Subtotal </td>

                                                <td>

                                                {
                                                    (cartData?.length !== 0 ?
                                                        cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0) : 0)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                                                }

                                                  
                                                </td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>

                                <Button type="submit" className='btn-blue bg-red btn-lg btn-big'
                                ><IoBagCheckOutline /> &nbsp; Checkout</Button>

                            </div>
                        </div>


                    </div>
                </form>
            </div>
        </section>

        <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
        </>
    )
}

export default Checkout;