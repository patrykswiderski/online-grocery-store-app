"use client"
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react'
import { setCookie } from 'cookies-next'


function CreateAccount() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(()=>{
      const jwt=setCookie('jwt');
      if(jwt)
      {
          router.push('/')
      }
  },[])

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(username, email, password).then(resp => {
      console.log(resp.data.user);
      console.log(resp.data.jwt);
      setCookie('user',JSON.stringify(resp.data.user));
      setCookie('jwt',resp.data.jwt);
      toast("Account Created successfully");
      router.push('/');
      setLoader(false);
    }, (e) => {
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
          <h2 className='font-bold text-3xl pb-2'>Create an Account</h2>
          <h2 className='text-gray-500'>Enter your Email and Password to Create an account</h2>
          <div className='w-full flex flex-col gap-5 mt-7'>
              <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
              <Input placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)}/>
              <Input type='password' placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
              <Button onClick={() => onCreateAccount()} disabled={!(username&&email&&password)}>{loader?<LoaderIcon className='animate-spin'/>:'Create an Account'}</Button>
              <p>Already have an account?
                  <span>&nbsp;</span>  
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
