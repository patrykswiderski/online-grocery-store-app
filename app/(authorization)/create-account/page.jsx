import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function CreateAccount() {

  
  return (
    <div className='flex items-baseline justify-center my-10'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
          <Image src='/logo.png'
            width={200}
            height={200}
            alt='logo'
          />
          <h2 className='font-bold text-3xl'>Create an Account</h2>
          <h2 className='text-gray-500'>Enter your Email and Password to Create an account</h2>
          <div className='w-full flex flex-col gap-5 mt-7'>
              <Input placeholder='Username'/>
              <Input placeholder='name@example.com'/>
              <Input type='password' placeholder='Password'/>
              <Button>Create an Account</Button>
              <p>Already have an account 
                  <Link href={'/sign-in'} className='text-blue-500'>
                      Click here to Sign in
                  </Link>
              </p>
          </div>
      </div>
    </div>
  )
}

export default CreateAccount
