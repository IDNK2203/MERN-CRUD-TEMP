import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchMyRecipes,
  reset,
  deleteRecipe,
} from "../features/recipe/recipeSlice";

const Home = () => {
  const [delReStatus, setdelReStatus] = useState("idle");
  const [delReErrorMsg, setdelReErrorMsg] = useState("idle");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/");
    dispatch(fetchMyRecipes());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const { status, recipes, errorMsg } = useSelector((state) => state.recipes);

  const deleteRecipeHandler = async (id, e) => {
    if (delReStatus === "idle") {
      try {
        await dispatch(deleteRecipe(id)).unwrap();
      } catch (error) {
        setdelReStatus("error");
        setdelReErrorMsg(error);
      } finally {
        setdelReStatus("idle");
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div>
          {status === "pending" && <div>Spinner</div>}
          {status === "success" && recipes.length > 0 ? (
            <ul>
              {recipes.map((el) => (
                <li key={el._id}>
                  <p> {"Dish Name " + el.dishName}</p>
                  <p> {"Chef " + el.chef.firstName}</p>
                  <Link to={"/update/" + el._id}>Update</Link>
                  <button onClick={(e) => deleteRecipeHandler(el._id, e)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : status === "success" && recipes.length <= 0 ? (
            <p>
              there are no recipes currently😊, Be the first to create a recipe
            </p>
          ) : (
            ""
          )}
          {status === "error" && <div>{errorMsg}</div>}
          {/* {delReStatus === "error" && <div>{delReErrorMsg}</div>} */}
        </div>
      </main>
    </div>
  );
};

export default Home;
