import Hero from '@/components/Home/Hero'
import ProductsPage from '@/components/Home/Products'
import LoginButton from '@/components/LoginButton'
import UserInfo from '@/components/UserInfo'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'

async function page () {
      const session = await getServerSession(authOptions);
  
  return (
    <div className="w-full my-24 space-y-8 md:mb-20 md:mt-32 md:space-y-20">
      <Hero />
      <ProductsPage />
      {/* <LoginButton/> */}
      {/* <UserInfo /> */}
    </div>
  )
}

export default page