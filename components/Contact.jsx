import Image from "next/image"
import React from "react"

const Contact = ({ src, name }) => {
  const imageArr = [
    "https://imgs.search.brave.com/Ue7UYN7LYXzmX8gUZCHKjl8CwE6modu6UFtAvjt8aQs/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS8y/ZmRjMjYxMzhlYmVl/OGQzZWI2YzdiYmY0/YTZhNDhkNy5qcGc",
    "https://imgs.search.brave.com/ui6uM6rJaoKRrN8BY_pbqU1mHlqJBrmQ8sHsvWUpc_0/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS9i/N2Y2NTU1YjgxMDQ3/MDllYWMxZDMxNjdl/OTRjOGI1OS5qcGc",
    "https://imgs.search.brave.com/lGh5KMmqIfcEtrelkZy_TluVjtjnE2QMVGNumflfp9g/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS84/YWU2MjEwNTY4NGEz/OTk1ODgxZTZjM2Y2/NjJiYWQ3MC5qcGc",
    "https://imgs.search.brave.com/LgUTU2RcB1oxosAiZ2AK7WIyKczO93zATimoV4pkSto/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9haXJu/ZnRzLnMzLmFtYXpv/bmF3cy5jb20vbmZ0/LWltYWdlcy8yMDIy/MDQxMi9EZWdlbl9h/cGVfdGVzdF8yXzE2/NDk3NTAwMDE3MzAu/cG5n",
    "https://imgs.search.brave.com/eVeEG13qKPe6XsVLrajdz_JjNo5HWOmskLN-ypXMmuc/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS85/Njg1MTgyMWUyODcx/NTJlM2M2OGFkY2E4/MTU0YmRiYS5qcGc",
    "https://imgs.search.brave.com/LunWusATox8mdj5ifGCiGCSlUuZj7jYyI_-LEBWhKk8/rs:fit:1069:1069:1/g:ce/aHR0cHM6Ly9idWNr/ZXRlZXItZTA1YmJj/ODQtYmFhMy00Mzdl/LTk1MTgtYWRiMzJi/ZTc3OTg0LnMzLmFt/YXpvbmF3cy5jb20v/cHVibGljL2ltYWdl/cy9hNDQ2Zjg5Ny1j/ZTlkLTQxZjMtYjdi/MS1iMzc0NzAxNzRk/ZmVfMTA2OXgxMDY5/LmpwZWc",
  ]

  const randNum = () => {
    return Math.floor(Math.random() * imageArr.length - 1)
  }
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
      <Image
        className="rounded-full object-cover h-[40px] w-[40px]"
        src={imageArr[randNum()]}
        width={40}
        height={40}
        full={true}
      />
      <p className="text-sm">{name}</p>
      <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full"></div>
    </div>
  )
}

export default Contact
