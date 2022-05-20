import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const SingleRecipe = () => {
  const [recipe, setrecipe] = useState([]);
  const [status, setstatus] = useState("pending");
  const [errMsg, seterrMsg] = useState("");

  let params = useParams();

  useEffect(() => {
    const baserUrl = "http://localhost:4000/api/v1/recipe/" + params.id;
    const getSingleRecipe = async () => {
      try {
        const response = await axios.get(baserUrl);
        setstatus("success");
        setrecipe(response.data.recipe);
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
    getSingleRecipe();
  }, [params.id]);

  return (
    <div>
      <Header />
      <main>
        {status === "pending" && <div>Spinner</div>}
        {status === "success" && (
          <li>
            <p> {"Dish Name " + recipe.dishName}</p>
            <p> {"Chef " + recipe.chef.firstName}</p>
          </li>
        )}
        {status === "error" && <div>{errMsg}</div>}
      </main>
    </div>
  );
};

export default SingleRecipe;
