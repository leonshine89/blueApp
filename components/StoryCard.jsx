// import Image from 'next/leagcy/image'
import Image from 'next/image'
import React from 'react'

const StoryCard = ({src, name, profile}) => {
  return (
    <div className='relative h-15 w-15 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse'>
        {profile && <Image 
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-6 object-cover h-10 w-10  border-4 shadow-xl border-blue-500 "
        src={profile}
        width={40}
        height={40}
             
        />}
       {(src && profile) && <Image className='object-cover filter brightness-75 rounded-full lg:rounded-xl w-[70px] h-[1000px]' 
        src={src}
        fill={true}
        />}
        <p className='absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate'>{name}</p>
    </div>
  )
}

export default StoryCard