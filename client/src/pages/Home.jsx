import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

  const posts = [
    
      {
        id: 1,
        title: "Solar for Schools",
        desc: "Help install solar panels in rural schools to bring sustainable energy and brighter futures.",
        img: "https://www.iamrenew.com/wp-content/uploads/2019/07/School-buiding-1280x720.jpg"
      },
      {
        id: 2,
        title: "The Indie Game Project",
        desc: "Support a passionate team of developers creating a retro-inspired adventure game.",
        img: "https://www.northeasternchronicle.in/wp-content/uploads/2024/06/Gaming-696x464.jpg"
      },
      {
        id: 3,
        title: "Clean Water for All",
        desc: "Join the mission to bring clean drinking water to underserved communities worldwide.",
        img: "https://www.halma.in/~/media/Files/H/Halma/India/press-releases/WFL_children%20in%20Bihar.jpg?h=541&w=811"
      },
      {
        id: 4,
        title: "Next-Gen Smartwatch",
        desc: "Back the next generation of wearable tech — sleek, powerful, and budget-friendly.",
        img: "https://i.ytimg.com/vi/_BRT_0N1uLA/maxresdefault.jpg"
      },
      {
        id: 5,
        title: "Artists Unleashed",
        desc: "Fund independent artists and help bring bold, original art to life in local galleries.",
        img: "https://blog.sothebysrealty.co.uk/hubfs/Imported_Blog_Media/a66510b8-b14b-4ce5-8f43-beaec82e0bcb-1.jpg"
      }
    
    
  ]
  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post=>(
          <div className='post' key={post.id}>
            <div className='img'>
              <img src={post.img} alt="" />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
              <div className='button-group'>
              <button>Know More</button>
              <button>Contribute Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home