import React from 'react'
import Image from 'next/image'


function ProductItemDetail({product}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
        <Image src={product?.attributes?.images?.data[0]?.attributes?.url}
        width={300}
        height={300}
        alt={'Image of' + product?.attributes?.name}
        className='bg-white p-5 h-[320px] w-[300px] object-contain rounded-lg'
        />
        <div className='flex flex-col gap-3'>
            <h2 className='text-2xl font-bold'>{product?.attributes?.name}</h2>
            <h2 className='text-sm text-gray-500'>{product?.attributes?.description}</h2>
            <div className='flex gap-3'>
                {product?.attributes?.sellingPrice&&
                <h2 className='font-bold text-3xl'>${product?.attributes?.sellingPrice}</h2>}
                <h2 className={`font-bold text-3xl ${product?.attributes?.sellingPrice&&'line-through text-gray-500'}`}>${product?.attributes?.mrp}</h2>
            </div>
            <h2 className='text-lg'>Quantity ({product?.attributes?.itemQuantityType})</h2>
            <h2 className='text-md'><span className='font-bold'>Category: </span>{product?.attributes?.categories?.data[0]?.attributes?.name}</h2>

        </div>
    </div>
  )
}

export default ProductItemDetail
