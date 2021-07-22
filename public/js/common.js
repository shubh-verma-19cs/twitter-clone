$("#postTextArea").keyups((event)=>{
    var textbox = $(event.target);
    var value = textbox.val().trim();
    var submitButton = $("#submitPostButton");
    if(submitButton.lenghth == 0)
        return alert("No submit button");
    if(value == ""){
        submitButton.prop("disabled", false);
        return;
    }
    submitButton.prop("disabled", false);
})

$("#submitPostButton").click(()=>{
    var button = $(event.target);
    var textbox = $("#postTextArea");
    var data = {
        content: textbox.val()
    }

    $.post("/api/post", data, (postData, status, xhr)=>{

    })
})