import React from 'react'
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

const App = () => {
  const routing = useRoutes(Router);

  return (
    <div>
      {routing}
    </div>
  )
}

export default App