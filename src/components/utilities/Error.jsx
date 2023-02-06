import React from 'react'

export default function Error({ error }) {
    console.log(error)
    return (
        <div className='flex w-full justify-center text-red-400'>SOMETHING WENT WRONG 😔</div>
    )
}
