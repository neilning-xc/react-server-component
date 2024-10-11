import React, { Suspense } from 'react';

import Layout from './Layout';
import { Count } from './Count';
import { Time } from './Time';
import { Loading } from './Loading';

// import './style/Home.css';

async function Home() {
  return (
    <Layout>
      <div className="dashboard">
        <Suspense fallback={<Loading />}>
          <div className="dashboard-item">
            <Time />
          </div>
        </Suspense>

        <div className="dashboard-item">
          <Count />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
