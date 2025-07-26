import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import BreakfastPage from "./pages/RecipePages/BreakfastPage";
import LunchPage from "./pages/RecipePages/LunchPage";
import DinnerPage from "./pages/RecipePages/DinnerPage";
import DessertPage from "./pages/RecipePages/DessertPage";
import RecipeForm from "./pages/RecipeForm/RecipeForm";

//Auth
import Register from "./pages/Auth/register/register";
import Login from "./pages/Auth/login/login";
import Username from "./pages/Auth/username/username";
import RecipeDetail from "./pages/recipeDetail/recipeDetail";
import UserAccount from "./pages/Accounts/UserAccount/UserAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breakfast-recipes" element={<BreakfastPage />} />
        <Route path="/lunch-recipes" element={<LunchPage />} />
        <Route path="/dinner-recipes" element={<DinnerPage />} />
        <Route path="/dessert-recipes" element={<DessertPage />} />
        <Route path="/recipe-form" element={<RecipeForm />} />
        <Route path="/recipe-form/:id" element={<RecipeForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/username" element={<Username />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/user-account" element={<UserAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
