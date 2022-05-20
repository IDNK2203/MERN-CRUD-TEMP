import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setrecipes] = useState([]);
  const [status, setstatus] = useState("pending");
  const [errMsg, seterrMsg] = useState("");

  useEffect(() => {
    const baserUrl = "http://localhost:4000/api/v1/recipe/";
    const AllRecipes = async () => {
      try {
        const response = await axios.get(baserUrl);
        setTimeout(() => {
          setstatus("success");
        }, 1000);
        setrecipes(response.data.recipes);
        seterrMsg("");
      } catch (error) {
        setstatus("error");
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        seterrMsg(message);
      }
    };
    AllRecipes();
  }, []);

  return (
    <div>
      {status === "pending" && <div>Spinner</div>}
      {status === "success" && recipes.length > 0 ? (
        <ul>
          {recipes.map((el) => (
            <li key={el._id}>
              <Link to={"/" + el._id}>
                <p> {"Dish Name " + el.dishName}</p>
                <p> {"Chef " + el.chef.firstName}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : status === "success" && recipes.length <= 0 ? (
        <p>there are no recipes currently😊, Be the first to create a recipe</p>
      ) : (
        ""
      )}
      {status === "error" && <div>{errMsg}</div>}
    </div>
  );
};

export default RecipeList;
