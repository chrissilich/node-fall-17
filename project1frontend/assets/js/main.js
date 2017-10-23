console.log("Hello World from main.js!");


var BACKEND_URL = "http://localhost:1337/";


var createItemInDOM = function(data) {
	$("<li>")
		.attr("data-id", data.id)
		.append("<input type='checkbox'>")
		.append(data.task)
		.append(" <button class='delete'>Delete</button>")
		.appendTo(".items");

	// var $li = document.createElement("li");
	// 	$li.setAttribute("data-id", data.id);

	// var $checkbox = document.createElement("input");
	// 	$checkbox.setAttribute("type", "checkbox");
}



$.ajax(BACKEND_URL + "item", {
	method: "GET"
}).done(function(data) {
	$(data).each(function(i,e) {
		createItemInDOM(e);
	})
})



$(".new-task-form").on("submit", function(e) {
	console.log("form submitted");
	e.preventDefault();

	$.ajax(BACKEND_URL + "item", {
		method: "POST",
		data: { 
			task: $('[name="task"]').val()
		}
	}).done(function(data) {
		createItemInDOM(data);
	})
})


$("body").on("click", ".delete", function(e) {
	console.log("do delete");

	// DELETE /item/1

	var $li = $(this).parents("li");

	var id = $li.attr("data-id");

	$.ajax(BACKEND_URL + "item/" + id, {
		method: "DELETE"
	}).done(function(data) {
		if (data.deleted) {
			$li.remove();
		}
	})

})

