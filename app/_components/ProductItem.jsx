import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


function ProductItem({product}) {
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-110 hover:shadow-lg transition-all ease-in-out cursor-pointer'>
      <Image src={product?.attributes?.images?.data[0]?.attributes?.url}
      unoptimized={true}
      alt={'Image of ' + product?.attributes?.name}
      width={500}
      height={200}
      className='h-[200px] w-[200px] object-contain'
      />
      <h2 className='font-bold text-lg'>{product?.attributes?.name}</h2>

      <div className='flex gap-3'>
        {product?.attributes?.sellingPrice&&
        <h2 className='font-bold text-lg'>${product?.attributes?.sellingPrice}</h2>}
        <h2 className={`font-bold text-lg ${product?.attributes?.sellingPrice&&'line-through text-gray-500'}`}>${product?.attributes?.mrp}</h2>
      </div>

      <Button variant="outline" className='text-primary hover:text-white hover:bg-primary'>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductItem