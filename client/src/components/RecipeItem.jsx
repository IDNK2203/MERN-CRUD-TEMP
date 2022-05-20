import { Link } from "react-router-dom";

function RecipeItem({ item }) {
  return (
    <li>
      <Link to={"/" + item._id}>
        <p> {"Dish Name " + item.dishName}</p>
        <p> {"Chef " + item.chef.firstName}</p>
      </Link>
    </li>
  );
}

export default RecipeItem;
