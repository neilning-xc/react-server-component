import {
  createContext,
  useContext,
  use,
  startTransition,
  useState,
} from 'react';
import { createFromFetch } from 'react-server-dom-webpack/client';

const RouterContext = createContext();
const initialCache = new Map();

export function Router() {
  const [cache, setCache] = useState(initialCache);
  const [path, setPath] = useState('home');

  let content = cache.get(path);
  if (!content) {
    content = createFromFetch(fetch(`/react/${path}`));
    cache.set(path, content);
  }

  // 切换路由
  function navigate(nextPath) {
    startTransition(() => {
      setPath(nextPath);
      setCache(new Map());
    });
  }

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {use(content)}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);
