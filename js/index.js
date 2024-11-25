
$(document).ready(function () {
  renderDishes();

  $("#add-dish").on("click", function () {
    const name = $("#dish-name").val();
    const description = $("#dish-description").val();
    const rating = $("#dish-rating").val();
    const ingredients = $("#dish-ingredients").val().split(",");

    if (name && description && rating && ingredients) {
      const newDish = {
        name,
        description,
        rating: parseInt(rating, 10),
      
      };

      dinnerDishes.push(newDish);
      renderDishes();

      $("#dish-name, #dish-description, #dish-rating, #dish-ingredients").val("");

      $("#success-message").text("Dish successfully added!").show();
      setTimeout(() => $("#success-message").hide(), 2000);
    } 
  });

  $("#dish-list").on("click", ".view-dish", function () {
    let index = $(".view-dish").index(this);
    viewDish(index);
  });

  $("#dish-list").on("click", ".update-dish", function () {
    let index = $(".update-dish").index(this);
    enableDishEdit(index);
  });

  $("#dish-list").on("click", ".delete-dish", function () {
    let index = $(".delete-dish").index(this);
    deleteDish(index);
  });

  function renderDishes() {
    const dishList = $("#dish-list");
    dishList.html("");

    dinnerDishes.forEach((dish, index) => {
      const dishItem = $(`
        <li>
          <span class="dish-details">${dish.name} - Rating: ${dish.rating}/10</span>
          <button class="view-dish" data-index="${index}">Read</button>
          <button class="update-dish" data-index="${index}">Update</button>
          <button class="delete-dish" data-index="${index}">Delete</button>
        </li>
      `);
      dishList.append(dishItem);
    });
  }

  function viewDish(index) {
    const dish = dinnerDishes[index];
    const details = `
      Name: ${dish.name}
      Description: ${dish.description}
      Ingredients: ${dish.ingredients.join(", ")}
      Rating: ${dish.rating}/10
    `;
    alert(details);
  }

  function enableDishEdit(index) {
    const dish = dinnerDishes[index];
    const dishItem = $("#dish-list li").eq(index);

    const editForm = $(`
      <div class="edit-form">
        <label>Name: <input type="text" class="edit-name" value="${dish.name}"></label>
        <label>Description: <input type="text" class="edit-description" value="${dish.description}"></label>
        <label>Rating: <input type="number" class="edit-rating" value="${dish.rating}"></label>
        <label>Ingredients: <input type="text" class="edit-ingredients" value="${dish.ingredients}"></label>
        <button class="save-dish">Save</button>
        <button class="cancel-edit">Cancel</button>
      </div>
    `);

    dishItem.html(editForm);

    editForm.find(".save-dish").on("click", function () {
      const newName = editForm.find(".edit-name").val();
      const newDescription = editForm.find(".edit-description").val();
      const newRating = parseInt(editForm.find(".edit-rating").val(), 10);
      const newIngredients = editForm.find(".edit-ingredients").val().split(",");

      if (newName && newDescription && newRating && newIngredients.length > 0) {
        dinnerDishes[index] = {
          name: newName,
          description: newDescription,
          rating: newRating,
          ingredients: newIngredients,
        };
        renderDishes();
      }
    });

    editForm.find(".cancel-edit").on("click", function () {
      renderDishes();
    });
  }

  function deleteDish(index) {
    dinnerDishes.splice(index, 1);
    renderDishes();
    
    $("#delete-message").text("Dish successfully deleted!").show();
    setTimeout(() => $("#delete-message").hide(), 2000);
  }
});
