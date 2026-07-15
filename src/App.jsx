import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import BuilderPage from './pages/BuilderPage';
import AboutPage from './pages/AboutPage';
import { getRecipeById } from './data/recipes';

const validPages = ['home', 'recipes', 'recipe', 'builder', 'about'];

const pageTitles = {
  home: 'The Old Fashioned | Craft Cocktail Guide',
  recipes: 'Recipes | The Old Fashioned',
  builder: 'Build Your Own | The Old Fashioned',
  about: 'About | The Old Fashioned',
};

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
    try {
      localStorage.setItem('of-reviews', JSON.stringify(reviews));
    } catch {
      // Storage unavailable (private mode, quota) — reviews stay in memory.
    }
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
        setSelectedSpirit(parts[1] || 'all');
      } else {
        setCurrentPage(validPages.includes(parts[0]) ? parts[0] : 'home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keep the document title in sync with the current page
  useEffect(() => {
    if (currentPage === 'recipe') {
      const recipe = getRecipeById(selectedRecipe);
      document.title = recipe
        ? `${recipe.name} | The Old Fashioned`
        : 'Recipe Not Found | The Old Fashioned';
    } else {
      document.title = pageTitles[currentPage] || pageTitles.home;
    }
  }, [currentPage, selectedRecipe]);

  const navigate = useCallback((page, param) => {
    const previousPage = window.location.hash.slice(1).split('/')[0] || 'home';
    if (page === 'recipe') {
      window.location.hash = `recipe/${param}`;
    } else if (page === 'recipes' && param && param !== 'all') {
      window.location.hash = `recipes/${param}`;
    } else {
      window.location.hash = page;
    }
    // Changing the spirit filter stays on the recipes page — don't yank the scroll position
    if (!(page === 'recipes' && previousPage === 'recipes')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} reviews={reviews} />;
      case 'recipes':
        return (
          <RecipesPage
            navigate={navigate}
            selectedSpirit={selectedSpirit}
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
        return <BuilderPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage navigate={navigate} reviews={reviews} />;
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
