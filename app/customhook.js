'use client';
import React, { useState, useEffect } from 'react'
import useToggle from './hooks/useToggle';
import useEscape from './hooks/useEscape';
import useFetchData from './hooks/useFetchData';

const page = () => {

  const [isOpen, toggleIsOpen] = useToggle(true);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // here registering the keypress evenet through custom hook
  useEscape(toggleIsOpen);

  // Fetch data for selected button - hook called at top level
  const [_data, _loading, _error] = useFetchData(
    selectedId !== null ? `https://jsonplaceholder.typicode.com/todos/${selectedId}` : null
  );

  // Log the results when they change
  useEffect(() => {
    if (selectedId !== null) {
      if (_loading) {
        setLoading(true);
        setData(null);
        setError(null);
      } else if (_error) {
        setLoading(false);
        setData(null);
        setError(_error);
      } else if (_data) {
        setLoading(false);
        setData(_data);
        setError(null);
      }

    }
  }, [_data, _loading, _error, selectedId]);

  const fetchData = (i) => {
    setSelectedId(i + 1); // Just update state, don't call hook
  }

  return (
    <div className='p-4'>
      <button onClick={toggleIsOpen} className='dark:bg-indigo-500 p-2 mb-4' >click to show/hide</button>
      {
        isOpen && <div style={{height:100, width:100, border:"1px solid white"}}></div>
      }
      
      <div className='my-4'>
        {
          Array.from({length:10},(_,i)=> <button onClick={()=>fetchData(i)} key={i} className='dark:bg-pink-500 m-2 p-2' >Button {i+1}</button>)
        }
      </div>

      {/* Display fetched data */}
      {selectedId !== null && (
        <div className='mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded'>
          <h3 className='text-lg font-bold mb-2'>Todo #{selectedId}</h3>
          {loading && <p className='text-blue-500'>Loading...</p>}
          {error && <p className='text-red-500'>Error: {error.message || String(error)}</p>}
          {data && !loading && (
            <div className='space-y-2'>
              <p><strong>ID:</strong> {data.id}</p>
              <p><strong>Title:</strong> {data.title}</p>
              <p><strong>Completed:</strong> {data.completed ? '✅ Yes' : '❌ No'}</p>
              <p><strong>User ID:</strong> {data.userId}</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default page
