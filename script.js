$( document ).ready(function() {
    
    var topics = ["skyrim", "COD", "tekken", "fallout", "assassins creed", "zelda"]

    
    function emptyUserInput() {
        alert("You must enter text!")
    }
    
    function createButton() {

        $("#button-holder").empty()

        for (i = 0; i < topics.length; i++) {
            var b = $("<button>")
            b.addClass("gif")
            b.attr("Data-Name", topics[i])
            b.text(topics[i])
            $("#button-holder").append(b)
            
          }
    }
    createButton()
    
    $("#submit").on("click", function(event) {
        event.preventDefault()
        var userInput = $("#user-input").val().trim()
        
        if (userInput === "") {
            emptyUserInput()
        }

        else {
        topics.push(userInput)
        createButton()
        console.log(topics)
        }

    })
    
    
    function displayGif() {

        var gif = $(this).attr("Data-Name")
        
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=P8Q8jrOA4Ktl6jR6fA4b72LJK4VMWsoF&limit=10"
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            for(var i = 0; i < response.data.length; i++){
        
                $("#content-holder").prepend('<div id="gif-holder"> <h1> Rating: <span id="rating"></span> <h1> </div>');
    
                var rating= response.data[i].rating
    
                $("#rating").append(rating)
                
                var g = $("<img>")
                g.attr("Data-State", "animate")
                g.addClass("giffy")
                g.attr("data-still", response.data[i].images.fixed_height_still.url)
                g.attr("data-animate", response.data[i].images.fixed_height.url)
                g.attr('src', response.data[i].images.fixed_height.url)
                
                var g2 = $("<div>").append(g)
                $("#gif-holder").append(g2)

                $(".giffy").on("click", function() {
                    var state = $("img").attr("Data-State")
                    if (state === "animate") {
                        $(this).attr("src", $(this).attr("data-still"))
                        $(this).attr("data-state", "still")
                    }

                    else {
                        $(this).attr("src", $(this).attr("data-animate"))
                        $(this).attr("data-state", "animate")
                    }

                })
        
            }
            
        });
    }

    $(document).on("click", ".gif", displayGif);

    
        
    
  
    
    // dc6zaTOxFJmzC
    // "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC"
});