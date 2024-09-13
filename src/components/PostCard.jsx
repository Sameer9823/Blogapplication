import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className='block'>
            <div className='w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='relative'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='w-full h-40 object-cover rounded-t-xl'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20 rounded-t-xl'></div>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
