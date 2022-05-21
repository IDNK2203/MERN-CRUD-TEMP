const RecipeList = ({ ListData, RecipeItem }) => {
  const { data, status, errMsg } = ListData;

  return (
    <div>
      {status === "pending" && <div>Spinner</div>}
      {status === "success" && data.length > 0 ? (
        <ul>
          {data.map((el) => (
            <RecipeItem key={el._id} item={el} />
          ))}
        </ul>
      ) : status === "success" && data.length <= 0 ? (
        <p>there are no recipes currently😊, Be the first to create a recipe</p>
      ) : (
        ""
      )}
      {status === "error" && <div>{errMsg}</div>}
    </div>
  );
};

export default RecipeList;

// different data source mechanisms
// fix create a hook for redux fetch action
// and pass as a variabe to recipelist componenet
// pass recipeitem component as a cheil prop

// fix 011 keep data fetch function inside component
//
