import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <Layout
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      >
        <HomePage />
      </Layout>
    </ThemeProvider>
  );
};

export default App;