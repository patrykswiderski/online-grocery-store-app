"use client"
import { CircleUserRound, CircleUserRoundIcon, LayoutGrid, LogIn, Search, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '..//_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContex'


function Header() {

  const [categoryList, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem('jwt')?true:false;
  const user = JSON.parse(sessionStorage.getItem('user'))
  const jwt = sessionStorage.getItem('jwt');
  const [totalCartItem, setTotalCartItem] = useState(0)
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const router = useRouter();

  useEffect(() => {
      getCategoryList();
  },[])

  useEffect(() => {
      getCartItems();
  }, [updateCart])

  /**
   * Get Category List
  */
  const getCategoryList= () => {
      GlobalApi.getCategory().then(resp => {
          console.log("CategoryList Resp:", resp.data.data);
          setCategoryList(resp.data.data);
      })
  }

    /**
   * Get Total Cart Item
  */
  const getCartItems = async() => {
    const cartItemList = await GlobalApi.getCartItems(user.id, jwt)
    console.log(cartItemList);
    setTotalCartItem(cartItemList?.length)
  }

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  }

  return (
    <div className='p-5 shadow-md flex justify-between'>
        <div className='flex items-center gap-8'>
            <Image src='/logo.png' alt='logo'
            width={150}
            height={60}
            priority={true}
            />



            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <h2 className='hidden md:flex text-lg gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                  <LayoutGrid className='h-5 w-5'/> Category
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categoryList.map((category, index) => (
                    <Link href={'/products-category/' + category.attributes.name} key={index}>
                        <DropdownMenuItem className='flex gap-4 items-center cursor-pointer'>
                            <Image src={category?.attributes?.icon?.data[0]?.attributes?.url}
                            alt='icon'
                            width={23}
                            height={23}
                            />
                            <h2 className='text-lg'>{category?.attributes?.name}</h2>
                        </DropdownMenuItem>
                    </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>


            <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <Search/>
                <input type="text" placeholder='Search' className='outline-none'/>
            </div>
          </div>
          <div className='flex items-center gap-5'>
              <h2 className='flex gap-2 items-center text-lg hover:scale-125 transition-all ease-in-out cursor-pointer'><ShoppingBasket className='w-7 h-7'/><span className='bg-primary text-white px-2 rounded-full'>{totalCartItem}</span></h2>
              {!isLogin?
                  <Link href={'/sign-in'}>
                    <Button className='hover:scale-125 transition-all ease-in-out cursor-pointer'>Login</Button>
                  </Link>
                  :
                  <DropdownMenu>
                    <DropdownMenuTrigger><CircleUserRoundIcon className='w-11 h-11 bg-green-100 text-primary p-2 rounded-full cursor-pointer'/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>My Order</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              }
          </div>
      </div>
  )
}

export default Header