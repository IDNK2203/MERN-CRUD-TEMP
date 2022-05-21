import Header from "../components/Header";
import RecipeList from "../components/RecipeList";
import useFetch from "../hooks/useFetch";
import RecipeItem from "../components/RecipeItem";

const Home = () => {
  const { data, status, errMsg } = useFetch(
    "http://localhost:4000/api/v1/recipe/"
  );
  const ListData = { data: data.recipes, status, errMsg };
  return (
    <div>
      <Header />
      <main>
        <RecipeList ListData={ListData} RecipeItem={RecipeItem}></RecipeList>
      </main>
    </div>
  );
};

export default Home;
