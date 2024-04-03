import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function CartItemList({cartItemList, onDeleteItem}) {
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount
    });
    setSubTotal(total)
  }, [cartItemList])

  return (
    <div>
      <div className='h-[500px] overflow-auto'>
          {cartItemList.map((cart, index) => (
            <div className='flex justify-between items-center p-2 mb-3' key={index}>
              <div className='flex gap-6 items-center'>
                <Image src={cart.image}
                width={90}
                height={90}
                alt={cart.name}
                className='border p-2'
                />
                <div>
                    <h2 className='font-bold'>{cart.name}</h2>
                    <h2 className=''>Quantity: {cart.quantity}</h2>
                    <h2 className='text-lg font-bold'>${cart.amount}</h2>
                </div>
              </div>
              <TrashIcon className='cursor-pointer' onClick = {() => onDeleteItem(cart.id)}/>
            </div>
          ))}
      </div>
        <div className='absolute w-[90%] bottom-6 flex flex-col'>
            <h2 className='text-lg font-bold flex justify-between pb-2 '>Subtotal <span>${subtotal.toFixed(2)}</span></h2>
            <Button>View Cart</Button>
        </div>
    </div>
  )
}

export default CartItemList
