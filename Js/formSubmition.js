function onFormSubmited(e) {
    var myFormData = new FormData();
    // ----- Cats API
    var api_url = "https://api.thecatapi.com/v1/images/upload"
    var api_key = "DEMO-API-KEY"
    e.preventDefault();
    var file_input = document.getElementById("file")
    var sub_id_input = document.getElementById("sub_id")
    myFormData.append('file', file_input.files[0]);
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function() {
        console.log(xmlhttp.responseText);
        if (xmlhttp.status == 201) {
            Swal.fire(
                'Good job!',
                'Your cat info uploaded successfully',
                'success'
            ).then(function(value) {
                if (value) {
                    window.location.href = 'homepage.html';
                }
            });
        } else if (xmlhttp.status == 400) {
            Swal.fire(
                'Cancelled',
                'the uploaded image not valid',
                'error'
            );
        } else {
            Swal.fire(
                'Cancelled',
                'Unknown error occured, please try again !',
                'error'
            );
        }

    };
    xmlhttp.onload = function() {
        updateStatusOutput("Uploaded");
    };
    xmlhttp.open('POST', api_url, true);
    xmlhttp.setRequestHeader('x-api-key', api_key);
    xmlhttp.send(myFormData);
    updateStatusOutput("Uploading...");
}

function updateStatusOutput(msg) {
    if (msg == "Uploading...") {
        $('#submit-btn').html('Please wait ..');
        $('#submit-btn').attr('disabled', true);
    } else {
        $('#submit-btn').html('Save');
        $('#submit-btn').attr('disabled', false);
    }
}

var form = document.getElementById("cat-info-form");
form.addEventListener("submit", onFormSubmited, true);