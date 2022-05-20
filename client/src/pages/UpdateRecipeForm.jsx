import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRecipe } from "../features/recipe/recipeSlice";

function UpdateRecipeForm() {
  let params = useParams();
  const recipeToUpdate = useSelector((state) =>
    state.recipes.recipes.filter((el) => el._id === params.id)
  );
  const { user } = useSelector((state) => state.auth);

  const [formData, setformData] = useState({
    dishName: recipeToUpdate[0].dishName,
  });

  const [requestStatus, setrequestStatus] = useState("idle");
  const [errorMsg, seterrorMsg] = useState("idle");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handle_dishName = (e) => {
    setformData({ [e.target.name]: e.target.value });
  };

  const handleRecipeForm = async (e) => {
    e.preventDefault();
    if (requestStatus === "idle") {
      try {
        setrequestStatus("pending");
        await dispatch(updateRecipe({ formData, id: params.id })).unwrap();
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
          value={formData.dishName}
          onChange={handle_dishName}
        />
        <button type="submit">submit</button>
      </form>
      {requestStatus === "error" && <div>{errorMsg}</div>}
    </div>
  );
}

export default UpdateRecipeForm;
