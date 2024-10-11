import React from 'react';

export async function Time() {
  const beforeTime = new Date();

  await new Promise((res) => {
    setTimeout(res, 3000);
  });

  const afterTime = new Date();

  return (
    <div>
      <h1>Home</h1>
      <div>Before: {beforeTime.toString()}</div>
      <div>After: {afterTime.toString()}</div>
    </div>
  );
}
