'use client'
import React, { useState } from 'react'
import { useUserData } from './hooks/useUserData'
import UserCard from './UserCard'
import { useFetch } from './hooks/useFetch'

const SupportiveComponent = ({ skill }) => {

  const [count, setCount] = useState(0)

  // const [data] = useUserData()
  const { data, loading, error } = useFetch({ url: 'https://jsonplaceholder.typicode.com/users' })
  console.log(data)



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-4">
      {/* <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button> */}

      {
        Array.isArray(data) && data.map(user => (
          <UserCard key={user.id} user={user} />
        ))
      }

      {loading && <p className="col-span-full">Loading...</p>}
      {error && <p className="col-span-full text-red-500">Error: {error}</p>}
    </div>
  )
}

export default SupportiveComponent