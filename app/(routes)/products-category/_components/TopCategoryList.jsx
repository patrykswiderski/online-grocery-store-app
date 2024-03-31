import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopCategoryList({categoryList}) {
  return (
    <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center' >
        {categoryList.map((category, index) => (
          <Link href={'/products-category/' + category.attributes.name} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400 w-[150px] min-w-[100px] ' key={index}>
            <Image src={category?.attributes?.icon?.data[0]?.attributes?.url}
            alt='icon'
            width={50}
            height={50}
            className='group-hover:scale-125 transition-all ease-in-out'
            />
            <h2 className='text-green-800'>{category?.attributes?.name}</h2>
          </Link>
        ))}
    </div>
  )
}

export default TopCategoryList
Image