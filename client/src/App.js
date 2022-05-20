import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RecipeForm from "./pages/RecipeForm";
import SingleRecipe from "./pages/SingleRecipe";
import UpdateRecipeForm from "./pages/UpdateRecipeForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SingleRecipe />} />
          <Route path="/my-recipes" element={<Dashboard />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/update/:id" element={<UpdateRecipeForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
