import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   Breakfast,
//   Lunch,
//   Dinner,
//   Dessert,
// } from "./components/RecipeDisplay/category";
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import Breakfast from "./pages/Breakfast/breakfast";
// import Lunch from "./pages/Lunch/Lunch";
// import Dinner from "./pages/Dinner/Dinner";
// import Dessert from "./pages/Dessert/Dessert";
import RecipeForm from "./pages/RecipeForm/RecipeForm";

//Auth
import Register from "./pages/Auth/register/register";
import Login from "./pages/Auth/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breakfast" element={<Breakfast />} />
        {/* <Route path="/lunch" element={<Lunch />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/dessert" element={<Dessert />} /> */}
        <Route path="/recipe-form" element={<RecipeForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
