// CSR入口文件

import { createRoot } from 'react-dom/client';

import { Router } from './framework/router';

const root = createRoot(document.getElementById('root'));
root.render(<Root />);

// function Root() {
//   return <h1>Hello World</h1>;
// };

function Root() {
  return <Router />;
}
