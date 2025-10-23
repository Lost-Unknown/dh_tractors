import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const NavBar = () => {
  return (
    <nav className='w-full flex flex-col items-center'>
        <div className='bg-white w-full h-14 px-4 flex items-center  m-auto'>
          <h1 className='text-4xl text-green-500 font-bold font-rouge'>DH Tractors</h1>
          <div className='flex grow'></div>
          <Image src="/swaraj.png" width={100} height={20} alt='Logo' className=''/>
        </div>
        <div className=' w-max rounded-3xl h-auto flex bg-blue-400'>
          <Link className='px-5 py-2 text-white font-bold' href={"/Sales_Report"}  >Sales</Link>
          <Link className='px-5 py-2 text-white font-bold' href={"/Service_Report"} >Service</Link>
          <Link className='px-5 py-2 text-white font-bold' href={"/Spare_Report"} >Spare</Link>
          <Link className='px-5 py-2 text-white font-bold' href={"/Stock_Transfer"} >Stock Transfer</Link>
        </div>
    </nav>
  )
}

export default NavBar