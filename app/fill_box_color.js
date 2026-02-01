'use client'

import BoxComp from '@/components/BoxComp'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [marked, setMarked] = useState([])

  const boxRef1 = React.useRef(null);
  const boxRef2 = React.useRef(null);
  const boxRef3 = React.useRef(null);
  const boxRef4 = React.useRef(null);
  const boxRef5 = React.useRef(null);
  const boxRef6 = React.useRef(null);
  const boxRef7 = React.useRef(null);
  const boxRef8 = React.useRef(null);
  const boxRef9 = React.useRef(null);

  useEffect(() => {
   marked.length ==9 && triggerDeactivate()
  
  }, [marked])
  

  const handleMark = (index) => {
    if (marked.length == 9) {
      setMarked([]);
    };
    if (marked.includes(index)) return;
    setMarked((prev) => [...prev, index]);
  };


  const triggerDeactivate = async () => {
      setMarked([]);

    // Reset boxes one by one with exactly 1000ms between each
    for (let i = 0; i < marked.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      resetColor(marked[i]);
    }
  }


    function resetColor(index) {
      console.log(index)
      switch (index) {
        case 1:
          boxRef1.current.style.backgroundColor = 'white';
          break;
        case 2:
          boxRef2.current.style.backgroundColor = 'white';
          break;
        case 3:
          boxRef3.current.style.backgroundColor = 'white';
          break;
        case 4:
          boxRef4.current.style.backgroundColor = 'white';
          break;
        case 5:
          boxRef5.current.style.backgroundColor = 'white';
          break;
        case 6:
          boxRef6.current.style.backgroundColor = 'white';
          break;
        case 7:
          boxRef7.current.style.backgroundColor = 'white';
          break;
        case 8:
          boxRef8.current.style.backgroundColor = 'white';
          break;
        case 9:
          boxRef9.current.style.backgroundColor = 'white';
          break;
        default:
          break;
      }
    }

    async function retryAPi(retries) {
      try {
        const response  = await fetch('https://sonplaceholder.typicode.com/todos/1');
        if(response.status !==200){
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.log('eeeeeeeee',error, retries)
        if (retries > 0) {
          console.log(`Retrying... attempts left: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          return await retryAPi(retries - 1); // Then retry
        } else {
          console.log('All retries failed!');
        }
      }
    }



    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          <BoxComp handleMark={() => handleMark(1)} key={1} ref={boxRef1} />
          <BoxComp handleMark={() => handleMark(2)} key={2} ref={boxRef2} />
          <BoxComp handleMark={() => handleMark(3)} key={3} ref={boxRef3} />
          <BoxComp handleMark={() => handleMark(4)} key={4} ref={boxRef4} />
          <BoxComp handleMark={() => handleMark(5)} key={5} ref={boxRef5} />
          <BoxComp handleMark={() => handleMark(6)} key={6} ref={boxRef6} />
          <BoxComp handleMark={() => handleMark(7)} key={7} ref={boxRef7} />
          <BoxComp handleMark={() => handleMark(8)} key={8} ref={boxRef8} />
          <BoxComp handleMark={() => handleMark(9)} key={9} ref={boxRef9} />
        </div>
        <button onClick={() => retryAPi(3)}>api fetch</button>
      </div>
    )
  }

  export default page