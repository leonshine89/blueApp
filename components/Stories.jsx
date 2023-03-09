import React from "react"
import StoryCard from "./StoryCard"

const imageArr = [
  "https://imgs.search.brave.com/Ue7UYN7LYXzmX8gUZCHKjl8CwE6modu6UFtAvjt8aQs/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS8y/ZmRjMjYxMzhlYmVl/OGQzZWI2YzdiYmY0/YTZhNDhkNy5qcGc",
  "https://imgs.search.brave.com/ui6uM6rJaoKRrN8BY_pbqU1mHlqJBrmQ8sHsvWUpc_0/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS9i/N2Y2NTU1YjgxMDQ3/MDllYWMxZDMxNjdl/OTRjOGI1OS5qcGc",
  "https://imgs.search.brave.com/nX3lDgxmYVFVIfOWNi2z2VO82tWnLfbmrcD7Jf9FPTQ/rs:fit:461:464:1/g:ce/aHR0cHM6Ly93d3cu/YXJ3ZWF2ZS5uZXQv/SlE0dWxZVHo0TUVJ/V3RPbkpZSzFYMnVS/SG02Qi1qbGZyaFF6/YThnRmEyYz9leHQ9/cG5n",
  "https://imgs.search.brave.com/lGh5KMmqIfcEtrelkZy_TluVjtjnE2QMVGNumflfp9g/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS84/YWU2MjEwNTY4NGEz/OTk1ODgxZTZjM2Y2/NjJiYWQ3MC5qcGc",
  "https://imgs.search.brave.com/LgUTU2RcB1oxosAiZ2AK7WIyKczO93zATimoV4pkSto/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9haXJu/ZnRzLnMzLmFtYXpv/bmF3cy5jb20vbmZ0/LWltYWdlcy8yMDIy/MDQxMi9EZWdlbl9h/cGVfdGVzdF8yXzE2/NDk3NTAwMDE3MzAu/cG5n",
  "https://imgs.search.brave.com/eVeEG13qKPe6XsVLrajdz_JjNo5HWOmskLN-ypXMmuc/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS85/Njg1MTgyMWUyODcx/NTJlM2M2OGFkY2E4/MTU0YmRiYS5qcGc",
  "https://imgs.search.brave.com/LunWusATox8mdj5ifGCiGCSlUuZj7jYyI_-LEBWhKk8/rs:fit:1069:1069:1/g:ce/aHR0cHM6Ly9idWNr/ZXRlZXItZTA1YmJj/ODQtYmFhMy00Mzdl/LTk1MTgtYWRiMzJi/ZTc3OTg0LnMzLmFt/YXpvbmF3cy5jb20v/cHVibGljL2ltYWdl/cy9hNDQ2Zjg5Ny1j/ZTlkLTQxZjMtYjdi/MS1iMzc0NzAxNzRk/ZmVfMTA2OXgxMDY5/LmpwZWc",
]
const stories = [
  {
    name: "Degen Ape",
    src: "https://imgs.search.brave.com/LunWusATox8mdj5ifGCiGCSlUuZj7jYyI_-LEBWhKk8/rs:fit:1069:1069:1/g:ce/aHR0cHM6Ly9idWNr/ZXRlZXItZTA1YmJj/ODQtYmFhMy00Mzdl/LTk1MTgtYWRiMzJi/ZTc3OTg0LnMzLmFt/YXpvbmF3cy5jb20v/cHVibGljL2ltYWdl/cy9hNDQ2Zjg5Ny1j/ZTlkLTQxZjMtYjdi/MS1iMzc0NzAxNzRk/ZmVfMTA2OXgxMDY5/LmpwZWc",
    profile:
      "https://imgs.search.brave.com/Ue7UYN7LYXzmX8gUZCHKjl8CwE6modu6UFtAvjt8aQs/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS8y/ZmRjMjYxMzhlYmVl/OGQzZWI2YzdiYmY0/YTZhNDhkNy5qcGc",
  },
  {
    name: "Bored Ape",
    src: "https://imgs.search.brave.com/Te8EHqqGPrRb3ex9zKhwxbuIeAhshG8XVU0LinpNKqM/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9zdGF0/aWMubmV3cy5iaXRj/b2luLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wOC90/cm9vcC1vZi1ib3Jl/ZC1hcGUtbmZ0cy1y/aXNlcy1hYm92ZS10/aGUtY29tcGV0aXRp/b24tbmZ0LXByb2pl/Y3QtZG9uYXRlcy0y/MDBrLWluLWV0aC10/by1vcmFuZ3V0YW4t/b3V0cmVhY2guanBn",
    profile:
      "https://imgs.search.brave.com/3Fum4VCU9wojsSr_gFZzguLdIwVfCsq5CUFB9ENxajw/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC55/ZVoxcjZXWlZSSVpD/bU03WlhKazlBSGFF/SyZwaWQ9QXBp",
  },
  {
    name: "Cool Cats",
    src: "https://imgs.search.brave.com/fbMebv_u0AaCuzaITE2xR3dNpHA3n-rPNgyYb3AeQbQ/rs:fit:1080:1080:1/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tLzk5/ZkJKakxwU29KVVN6/eGxkTFdNSEtTOXpu/UUI0Q1NBWWV0c0JI/elZWT1h6ZzZ5LVg0/al9temhWcnl1Q0Ff/WVFGSlhIdHpkX1ZV/NlhhRFV5aXdRYnRZ/aFE4X191Q0k2alJa/UzU9dzE0MDAtaw",
    profile:
      "https://imgs.search.brave.com/ULhWLuicknLWDh2AxTtVWP3fklqW6fv4fTfRO9sQ-9g/rs:fit:1080:1080:1/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL3JI/TTV2NEF2aVlFV1BJ/YWNub3p3YklIUERz/NUhfWmRFZGJyTmV6/RUhUalFhT0JjdHd0/VHQxWlhuVl9FMVNE/bW1aTE40YXpncXJC/b0UwTlRYMHNKSW5w/U3FDcGt1RW1MVU9G/R0lQQT13MTQwMC1r",
  },
  {
    name: "ZCore Club",
    src: "https://imgs.search.brave.com/iBH1SSmjWX7wQ6T9PP2RBWdwpueKzKPwtJrBvX1WniA/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9jbHVi/Lnpjb3JlLm5ldHdv/cmsvYXNzZXRzL2lt/YWdlcy9uZnRzLzQu/cG5n",
    profile:
      "https://imgs.search.brave.com/uQZgqA6QtQcbqvAoW4mdyHh3FzDWBdkBMjlV99bxif4/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9jbHVi/Lnpjb3JlLm5ldHdv/cmsvYXNzZXRzL2lt/YWdlcy9uZnRzLzIu/cG5n",
  },
]

const Stories = () => {
  return (
    <div className="flex justify-center space-x-3 mx-auto overflow-x-auto scrollbar-hide">
      {stories.map((story) => {
        return (
          <StoryCard
            key={story.src}
            name={story.name}
            src={story.src}
            profile={story.profile}
          />
        )
      })}
    </div>
  )
}

export default Stories
