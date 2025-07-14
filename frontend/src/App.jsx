import { useEffect, useState } from 'react';
import './App.css';

import LogoWithRipples from './components/LogoWithRipples';
import HomePage from './pages/HomePage';

function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen  bg-white dark:bg-black">
      {showLogo ? (
        <div className="flex justify-center items-center h-full animate-fade-in">
          <LogoWithRipples />
        </div>
      ) : (
        <div>
          <HomePage />
        </div>
      )}
    </div>
  );
}

export default App;
