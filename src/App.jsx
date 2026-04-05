import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import BuilderPage from './pages/BuilderPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedSpirit, setSelectedSpirit] = useState('all');
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem('of-reviews');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('of-reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = useCallback((recipeId, review) => {
    setReviews((prev) => ({
      ...prev,
      [recipeId]: [...(prev[recipeId] || []), { ...review, date: new Date().toISOString() }],
    }));
  }, []);

  // Hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const parts = hash.split('/');
      if (parts[0] === 'recipe' && parts[1]) {
        setCurrentPage('recipe');
        setSelectedRecipe(parts[1]);
      } else if (parts[0] === 'recipes') {
        setCurrentPage('recipes');
        if (parts[1]) setSelectedSpirit(parts[1]);
      } else {
        setCurrentPage(parts[0] || 'home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = useCallback((page, param) => {
    if (page === 'recipe') {
      window.location.hash = `recipe/${param}`;
    } else if (page === 'recipes' && param) {
      window.location.hash = `recipes/${param}`;
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'recipes':
        return (
          <RecipesPage
            navigate={navigate}
            selectedSpirit={selectedSpirit}
            setSelectedSpirit={setSelectedSpirit}
            reviews={reviews}
          />
        );
      case 'recipe':
        return (
          <RecipeDetailPage
            recipeId={selectedRecipe}
            reviews={reviews}
            addReview={addReview}
            navigate={navigate}
          />
        );
      case 'builder':
        return <BuilderPage navigate={navigate} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
