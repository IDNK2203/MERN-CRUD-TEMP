import useRecipeForm from "../hooks/useRecipeForm";
function Recipe() {
  const { reqStatus, errorMsg, handle_dishName, handleRecipeForm, formData } =
    useRecipeForm();
  return (
    <div>
      {reqStatus === "pending" && <div>Spinner</div>}
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
      {reqStatus === "error" && <div>{errorMsg}</div>}
    </div>
  );
}

export default Recipe;
