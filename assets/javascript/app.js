
      // Initial array of movies
     var topics = ["Cat", "Dog", "Rabbit", "Fish"];
      // Generic function for capturing the movie name from the data-attribute

      $(document).on("click", ".animals", alertMovieName); 

     function alertMovieName() {
        // YOUR CODE GOES HERE!!!


  //   var movieName = $(this).attr("data-name");

    


 //       $("#buttons-view").on("click", function() {
          // In this case, the "this" keyword refers to the button that was clicked
       var person = $(this).attr("data-name");
          console.log(person)
         

// Here we construct our URL
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=5pKOIbRkdIT0iRnqeB0UmCzQPQDFBPfq&limit=10";

// Write code between the dashes below to hit the queryURL with $ajax, then take the response data
// and display it in the div with an id of movie-view

// YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE

// =================================================================

$.ajax({
  url: queryURL,
  method: "GET"
})
  // After the data comes back from the API
  .then(function(response) {
    console.log(response)
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div for the gif
        var gifDiv = $("<div>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var animalImage = $("<img>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        animalImage.attr("src", results[i].images.fixed_height_still.url);

        animalImage.attr("data-still", results[i].images.fixed_height_still.url);

        animalImage.attr("data-animate", results[i].images.fixed_height.url);

        animalImage.attr("data-state", "still");

        animalImage.addClass("gifs");

        // Appending the paragraph and personImage we created to the "gifDiv" div we created
        
        gifDiv.append(animalImage);
        gifDiv.append(p);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  });
}


      // Function for displaying movie data
     function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
       for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
          // Adding a class
         a.addClass("animals");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the HTML
         $("#buttons-view").append(a);
       }
    }
      // This function handles events where one button is clicked
      $("#add-animals").on("click", function(event) {
       event.preventDefault();
        // This line grabs the input from the textbox
       var animal = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(animal);
        // Calling renderButtons which handles the processing of our movie array
       renderButtons();
      });
      // Function for displaying the movie info
      // We're adding a click event listener to all elements with the class "movie"
      // We're adding the event listener to the document itself because it willn  
      // work for dynamically generated elements
    // $(".movies").on("click") will only add listeners to elements that are on the page at that time
  
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(document).on("click", ".gifs", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");

        console.log(state)
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
