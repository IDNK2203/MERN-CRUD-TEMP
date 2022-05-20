import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../features/recipe/recipeSlice";

function RecipeForm() {
  const [requestStatus, setrequestStatus] = useState("idle");
  const [errorMsg, seterrorMsg] = useState("idle");

  const [dishName, setdishName] = useState({ dishName: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handle_dishName = (e) => {
    setdishName({ dishName: e.target.value });
  };

  const handleRecipeForm = async (e) => {
    e.preventDefault();
    if (requestStatus === "idle") {
      try {
        setrequestStatus("pending");
        await dispatch(createRecipe(dishName)).unwrap();
        setrequestStatus("success");
        navigate("/my-recipes");
      } catch (error) {
        setrequestStatus("error");
        seterrorMsg(error);
      }
    }
  };

  return (
    <div>
      {requestStatus === "pending" && <div>Spinner</div>}

      <form onSubmit={handleRecipeForm}>
        <input
          type="text"
          name="dishName"
          id="dishName"
          placeholder="Your Fav Dish"
          value={dishName.dishName}
          onChange={handle_dishName}
        />
        <button type="submit">submit</button>
      </form>
      {requestStatus === "error" && <div>{errorMsg}</div>}
    </div>
  );
}

export default RecipeForm;
