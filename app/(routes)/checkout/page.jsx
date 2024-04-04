"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ArrowBigRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Checkout() {

  const user = JSON.parse(sessionStorage.getItem('user'))
  const jwt = sessionStorage.getItem('jwt');
  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemList,setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState();
  const router = useRouter();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const getCartItems = async() => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt)
    console.log(cartItemList_);
    setTotalCartItem(cartItemList_?.length)
    setCartItemList(cartItemList_);
  }

  useEffect(() => {
    if(!jwt){
      router.push('/sign-in')
    }
    getCartItems();
  }, [])


  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount
    });
    setSubtotal(total.toFixed(2))
    setTotalAmount(((total * 1.09) + 15).toFixed(2))
  }, [cartItemList])

  const taxPercentage = 1.09
  const deliveryCost = 15

  const calculateTotalAmount = () => {
    const totalAmount = (subtotal * taxPercentage) + deliveryCost;
    return totalAmount.toFixed(2)
  }
  const tax = (subtotal * (taxPercentage - 1)).toFixed(2)

  const onApprove = (data) => {
    console.log(data);
  }

  return (
    <div className=''>
        <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
        <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
            <div className='md:col-span-2 mx-20 pb-3'>
                <h2 className='font-bold text-3xl'>Billing Details</h2>
                <div className='grid grid-cols-2 gap-10 mt-3'>
                    <Input placeholder='Name' onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='grid grid-cols-2 gap-10 mt-3'>
                      <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)}/>
                      <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)}/>
                </div>
                <div className='mt-3'>
                      <Input placeholder='Address'onChange={(e) => setUsername(e.target.value)}/>
                </div>
            </div>
            <div className='mx-10 border'>
                <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
                <div className='p-4 flex flex-col gap-4'>
                    <h2 className='font-bold flex justify-between'>Subtotal: <span>${subtotal}</span></h2>
                    <hr></hr>
                    <h2 className='flex justify-between'>Delivery: <span>${deliveryCost}</span></h2>
                    <h2 className='flex justify-between'>Tax (9%): <span>${tax}</span></h2>
                    <hr></hr>
                    <h2 className='font-bold flex justify-between'>Total: <span>${calculateTotalAmount()}</span></h2>
                    {/* <Button>Payment <ArrowBigRight/></Button> */}
                    {totalAmount>15&& <PayPalButtons style={{ layout: "horizontal" }} 
                      onApprove={onApprove}
                      createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: totalAmount,
                                  currency_code: 'USD'
                                }
                              }
                            ]
                          })
                      }}
                    />}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
