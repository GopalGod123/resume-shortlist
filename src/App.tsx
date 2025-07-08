import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Layout
      isMenuOpen={isMenuOpen}
      onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
    >
      <HomePage />
    </Layout>
  );
};

export default App;