$('.file-input').on('change', function() {
    if ($(this)[0].files.length === 1) {
        var fileName = $(this).val().split('\\').pop();
        $(this).prev().text(fileName);
    }
});

$(document).ready(function() {
    loadImages(9);
});

$("#show-other-btn").on('click', function() {
    loadImages(9);
});

function loadImages(iterationNeeded) {
    $.ajax({
        type: 'get',
        url: 'https://api.thecatapi.com/v1/images/search?size=full',
        success: function(res) {
            $('.images-container').append(`<div class="image-container">
                <img src="` + res[0].url + `" class="cat-image">
            </div>`);
            var allAvailableWidth = $('#card-dynamic').width();
            var singleImageWidth = (allAvailableWidth / 3) - 3;
            $(".image-container").css('width', singleImageWidth);
            $(".image-container").css('height', singleImageWidth);
            $('.cat-image').attr({ 'width': singleImageWidth });
            $('.cat-image').attr({ 'height': singleImageWidth });
            if (iterationNeeded > 1) {
                loadImages(iterationNeeded - 1);
            }
        },
        error: function(err) {
            console.log(err);
            loadImage(iterationNeeded);
        }
    });
}
$('.images-container').delegate('.image-container', 'mouseenter', function() {
    $(this).addClass('Blured');
});
$('.images-container').delegate('.image-container', 'mouseleave', function() {
    $(this).removeClass('Blured');
});
$('.images-container').delegate('.image-container', 'click', function() {
    $("#clicked-img").attr('src', $(this).find('img').attr('src'));
    $('#full-image').modal('show');
});