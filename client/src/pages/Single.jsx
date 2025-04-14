import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const Single = () => {
  return (
    <div className='single'>
      <div className='content'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxAg3mAXoavIRQ93Kj8MST7PDhoov313o9bg&s" alt="" />
      <div className='user'>
        <img src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg" alt="" />
     
      <div className='info'>
        <span>John</span>
        <p>Posted 2 days ago</p>
         </div> 
         <div className='edit'>
  <div className='icon-circle teal' title="Edit">
    <FaEdit />
  </div>
  <div className='icon-circle pink' title="Delete">
    <FaTrash />
  </div>
</div>
         
      </div>
      </div>
      <div className='menu'>m</div>
    </div>
  )
}

export default Single