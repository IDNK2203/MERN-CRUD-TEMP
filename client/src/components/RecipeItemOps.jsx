import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteRecipe } from "../features/recipe/recipeSlice";
import RecipeItem from "./RecipeItem";

function RecipeItemOps({ item }) {
  const [status, setstatus] = useState("idle");
  const [errMsg, seterrMsg] = useState("");

  const dispatch = useDispatch();

  const deleteRecipeHandler = async (id, e) => {
    try {
      await dispatch(deleteRecipe(id)).unwrap();
    } catch (error) {
      setstatus("error");
      seterrMsg(error);
    }
  };

  return (
    <RecipeItem item={item}>
      <Link to={"/update/" + item._id}>Update</Link>
      <button onClick={(e) => deleteRecipeHandler(item._id, e)}>Delete</button>
      <div>{status === "error" && errMsg}</div>
    </RecipeItem>
  );
}

export default RecipeItemOps;
