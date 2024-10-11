import React, { Suspense } from 'react';

import Layout from './Layout';

async function About() {
  const beforeTime = new Date();

  // await new Promise((res) => {
  //   setTimeout(res, 2000);
  // });

  const afterTime = new Date();

  return (
    <Layout>
      <Suspense fallback={<div>Loading About...</div>}>
        <h1>About</h1>
        <div>Before: {beforeTime.toString()}</div>
        <div>After: {afterTime.toString()}</div>
      </Suspense>
    </Layout>
  );
}

export default About;
