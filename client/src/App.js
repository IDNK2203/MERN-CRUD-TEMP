import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RecipeForm from "./pages/Recipe";
import SingleRecipe from "./pages/SingleRecipe";
import UpdateRecipeForm from "./pages/UpdateRecipeForm";
import AuthRedir from "./components/AuthRedir";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SingleRecipe />} />
          <Route
            path="/create"
            element={<AuthRedir children={<RecipeForm />} />}
          />
          <Route
            path="/update/:id"
            element={<AuthRedir children={<RecipeForm />} />}
          />
          <Route
            path="/my-recipes"
            element={<AuthRedir children={<Dashboard />} />}
          />
          <Route
            path="/login"
            element={<AuthRedir type={"ap"} children={<Login />} />}
          />
          <Route
            path="/register"
            element={<AuthRedir type={"ap"} children={<Register />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
