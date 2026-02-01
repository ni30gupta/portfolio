"use client";

import React from 'react';
import { List } from 'react-window';

// MessageView component for individual message rendering
const MessageView = (props) => {
  console.log('props', props)
  return (
    <div
      onClick={()=>props?.handleCLick(props.index)}
      style={props.style}
      className="p-4 border-b border-zinc-200 dark:border-zinc-800"
    >
      <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
        Message #{props.index + 1}
      </h3>
      <p className="mt-1 text-zinc-700 dark:text-zinc-300">
        This is a sample message content for message {props.index + 1}.
      </p>
    </div>
  );
};


const handleCLick = (i) => {
  console.log('Clicked', i);
}

function VirtualizationDemo() {
  const names = Array.from({ length: 10000 }, (_, i) => `Message ${i + 1}`);

  return (
    <div className="mt-6 h-100 rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">

      <List
        rowComponent={MessageView}
        rowCount={names.length}
        rowHeight={100}
        rowProps={{ handleCLick }} />
    </div>
  );
}

export default VirtualizationDemo;
