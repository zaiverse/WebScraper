$.getJSON("/scrape", function(data){
    console.log(data)
});

$.getJSON("/allArticles", function(data){
    data.forEach(element => {
        $(".placeArticles").append("<a href='https://www.gamespot.com" + element.link +"'><img src='" + element.img + "'/></a><br /><a href='https://www.gamespot.com" + element.link +"'>" + element.title + "</a><br /><p class = 'description' data-id = " + element._id + ">" + element.description + "</p><br />");
    });
});

$.getJSON("/allComments", function(data){
    data.forEach(element => {
        $(".comments").append("<div><p>Title:" + element.title + "</p><br /><p>Comment:" + element.body);
    });
});

$(document).on("click", ".description",function(){
    $("#myModal").modal("show");
    let desId = $(this).attr("data-id");
    $(document).on("click","#newComment", function(){
        $.ajax({
            method:"POST",
            url:"/allArticles/" + desId,
            data:{
                title: $("#title").val(),
                body: $("#body").val()
            }
        }).then(function(data){
            console.log(data);
        })
    })
})

// $(document).on("click","#newComment", function(){
//     let desId = $(this).attr("data-id");
//     console.log(desId)
//     $.ajax({
//         method:"POST",
//         url:"/allArticles/" + desId,
//         data:{
//             title: $("#title").val(),
//             body: $("#body").val()
//         }
//     }).then(function(data){
//         console.log(data);
//     })
// })


