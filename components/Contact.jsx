import Image from 'next/image'
import React from 'react'

const Contact = ({src, name}) => {
  return (
    <div className='flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl'>
        <Image className='rounded-full object-cover h-[40px] w-[40px]'
        src={src}
        width={40}
        height={40}
        full={true}
        />
        <p className='text-sm'>{name}</p>
        <div className='absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full animate-pulse '></div>
    </div>
  )
}

export default Contact