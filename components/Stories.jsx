import React from 'react'
import StoryCard from './StoryCard'

const stories = [
    {
        name: "Sonny Sangha",
        src: "https://links.papareact.com/zof",
        profile: "https://links.papareact.com/l4v",
    },
    {   
        name: "Elon Musk",
        src: "https://links.papareact.com/4zn",
        profile: "https://imgs.search.brave.com/86xLqfSj68ymh5lJxD2oujnrvFKV9nuiNIl7qU07-Z8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9tZWRp/YS53aXJlZC5jb20v/cGhvdG9zLzVmNDdl/ZjA1YzM2ZmE0YmNm/ZDllY2EwMy9tYXN0/ZXIvd18yNTYwJTJD/Y19saW1pdC9TZWN1/cml0eV9FbG9uTXVz/ay0xMjA2MjkyMDc0/LmpwZw",
    }, 
    {
        name: "Jeff Bezos",
        src: "https://links.papareact.com/k2j",
        profile: "https://imgs.search.brave.com/LYHsBvkX6TssCKDV1pBKjxB-gA6EOekN8GNGOXhUmWc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9vYnNl/cnZlci5jb20vd3At/Y29udGVudC91cGxv/YWRzL3NpdGVzLzIv/MjAyMC8wMS9HZXR0/eUltYWdlcy0xMDMy/OTQxNzkyLWUxNTky/MjM5MzI3MjE1Lmpw/Zz9xdWFsaXR5PTgw/JnN0cmlw",
    }, 
    {
name: "Mark Zukerberg",
src: "https://links.papareact.com/xql",
profile: "https://links.papareact.com/snf",
    },
    {
        name: "Bill Gates",
        src: "https://links.papareact.com/4U4",
        profile: "https://links.papareact.com/zvy",
    }
]

const Stories = () => {
  return (
    <div className='flex justify-center space-x-3 mx-auto overflow-x-auto scrollbar-hide'>
{stories.map((story) => {
  return  <StoryCard 
    key={story.src} 
    name={story.name} 
    src={story.src} 
    profile={story.profile} />
})}
    </div>
  )
}

export default Stories