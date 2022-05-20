import useFetch from "../hooks/useFetch";
import RecipeItem from "./RecipeItem";

const RecipeList = () => {
  const { data, status, errMsg } = useFetch(
    "http://localhost:4000/api/v1/recipe/"
  );

  return (
    <div>
      {status === "pending" && <div>Spinner</div>}
      {status === "success" && data.recipes.length > 0 ? (
        <ul>
          {data.recipes.map((el) => (
            <RecipeItem key={el._id} item={el} />
          ))}
        </ul>
      ) : status === "success" && data.recipes.length <= 0 ? (
        <p>there are no recipes currently😊, Be the first to create a recipe</p>
      ) : (
        ""
      )}
      {status === "error" && <div>{errMsg}</div>}
    </div>
  );
};

export default RecipeList;
