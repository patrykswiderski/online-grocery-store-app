"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { toast } from 'sonner'
import { getCookie, setCookie } from 'cookies-next'


function SignIn() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState(false);


  useEffect(()=>{
      const jwt=getCookie('jwt');
      if(jwt)
      {
          router.push('/')
      }
  },[])

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signIn(email, password).then(resp => {
      console.log(resp.data.user);
      console.log(resp.data.jwt);
      setCookie('user',JSON.stringify(resp.data.user));
      setCookie('jwt',resp.data.jwt);
      toast("Login successfully")
      router.push('/')
      setLoader(false);
    }, (e) => {
      console.log(e);
      toast(e?.response?.data?.error?.message)
      setLoader(false);
    })
  }

  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
          <Image src='/logo.png'
            width={200}
            height={200}
            alt='logo'
            onClick={() => router.push('/')}
            className='cursor-pointer'
          />
          <h2 className='font-bold text-3xl pb-2'>Sign In to Account</h2>
          <h2 className='text-gray-500'>Enter your Email and Password to Sign In</h2>
          <div className='w-full flex flex-col gap-5 mt-7'>
              <Input placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)}/>
              <Input type='password' placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
              <Button onClick={() => onSignIn()} disabled={!(email&&password)}>{loader?<LoaderIcon className='animate-spin'/>:'Sign In'}</Button>
              <p>Don't have an account?
                  <span>&nbsp;</span>  
                  <Link href={'/create-account'} className='text-blue-500'>
                      Click here to Sign in
                  </Link>
              </p>
          </div>
      </div>
    </div>
  )
}

export default SignIn
