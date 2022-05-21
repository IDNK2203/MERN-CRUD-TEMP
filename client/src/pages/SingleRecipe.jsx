import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";

const SingleRecipe = () => {
  let params = useParams();
  const { data, status, errMsg } = useFetch(
    "http://localhost:4000/api/v1/recipe/" + params.id
  );

  return (
    <div>
      <Header />
      <main>
        {status === "pending" && <div className="spinner">Spinner</div>}
        {status === "success" && (
          <li>
            <p> {"Dish Name " + data.recipe.dishName}</p>
            <p> {"Chef " + data.recipe.chef.firstName}</p>
          </li>
        )}
        {status === "error" && <div>{errMsg}</div>}
      </main>
    </div>
  );
};

export default SingleRecipe;
