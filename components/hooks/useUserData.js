'use client'

import React, {  useEffect } from 'react'

export const useUserData = () => {
    const [data, setData] = React.useState({})

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setData(json))

    }, [])

    return [data]

}
