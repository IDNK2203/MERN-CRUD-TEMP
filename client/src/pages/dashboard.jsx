import Header from "../components/Header";
import RecipeItemOps from "../components/RecipeItemOps";
import RecipeList from "../components/RecipeList";
import useFetchMyRecipe from "../hooks/useFetchMyRecipe";

const Home = () => {
  const { status, recipes: data, errorMsg: errMsg } = useFetchMyRecipe();
  // const ListData = { data, status, errMsg };

  return (
    <div>
      <Header />
      <main>
        <RecipeList
          ListData={{ data, status, errMsg }}
          RecipeItem={RecipeItemOps}
        ></RecipeList>
      </main>
    </div>
  );
};

export default Home;
