/*====================================*
    01. INTERNATIONAL TELPHONE JS
*=====================================*/


var telInput = $("#phone");

telInput.intlTelInput({

    // allowExtensions: true,
    // formatOnDisplay: true,
    // autoFormat: true,
    // autoHideDialCode: true,
    // autoPlaceholder: true,
    // defaultCountry: "auto",
    // ipinfoToken: "yolo",

    // nationalMode: false,
    numberType: "MOBILE",
    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    preferredCountries: ['sa', 'ae', 'qa', 'om', 'bh', 'kw', 'ma'],
    preventInvalidNumbers: true,
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function(callback) {
        $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

/*====================================*
    02.PASSWORD VISIBILITY JS
*=====================================*/

$(".toggle-password").click(function() {
    $(".toggle-password i").toggleClass("fa-eye-slash");
    input = $(this).parent().find("input");
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});


/*====================================*
    03.CUSTOM SELECT JS
*=====================================*/


$('select').each(function() {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;
    // $('.reason').addClass('visibility-hidden');


    console.log($(this));
    $this.addClass('d-none');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function() {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();

    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $styledSelect.parent('.select').addClass('selected');
        $this.val($(this).attr('rel'));
        $(this).addClass('select_li');
        $(this).siblings().removeClass('select_li');
        $list.hide();
        // $('.reason').removeClass('visibility-hidden');
        if ($this.attr('class') == "role d-none") {
            $('.second_select, .first-text').removeClass('invisible');
        }

        if ($this.attr('class') == "size d-none") {
            $('.four_select, .third-text').removeClass('invisible');
        } else if ($this.attr('class') == "country d-none") {
            $('.five_select, .fourth-text').removeClass('invisible');
        } else if ($this.attr('class') == "countries d-none") {
            $('.fifth-text').removeClass('invisible');
        }
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});


/*====================================*
    03.DARG AND DROP FILE JS
*=====================================*/

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}






// Vivek


//TOGGLING NESTED ul
$(".custom_drop_down .selected").click(function() {
    $(this).next().children().toggle();
});

//SELECT OPTIONS AND HIDE OPTION AFTER SELECTION
$(".custom_drop_down .options ul li").click(function() {
    var text = $(this).html();
    $(".custom_drop_down .selected span").html(text);
    $(".custom_drop_down .options ul").hide();
});

//HIDE OPTIONS IF CLICKED ANYWHERE ELSE ON PAGE
$(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("custom_drop_down"))
        $(".custom_drop_down .options ul").hide();
});

$("#addRow").click(function() {
    var html = '';
    html += '<div class="row mt-3">';
    html += '<div class="col-md-8">';
    html += '<div class="form-group">';
    html += '<input type="email" placeholder="name@company.com" class="form-control">';
    html += '</div>';
    html += '</div>';
    html += '<div class="col-md-4">';
    html += '<div class="custom_drop_down">';
    html += '<div class="selected">';
    html += '<span>Role</span>';
    html += '</div>';
    html += '<div class="options">';
    html += '<ul>';
    html += '<li>';
    html += '<label>Admin</label>';
    html += '<span class="value">Can invite and manage new users</span>';
    html += '</li>';
    html += '<li>';
    html += '<label>Member</label>';
    html += '<span class="value">Can nominate & engage</span>';
    html += '</li>';
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $('#newRow').append(html);
    $(".custom_drop_down .selected").click(function() {
        $(this).next().children().toggle();
    });

    $(".custom_drop_down .options ul li").click(function() {
        var text = $(this).html();
        $(".custom_drop_down .selected span").html(text);
        $(".custom_drop_down .options ul").hide();
    });

});

// remove row
$(document).on('click', '#removeRow', function() {
    $(this).closest('#inputFormRow').remove();
});


var $fileInput = $('.file-input');
var $droparea = $('.file-drop-area');
$fileInput.on('change', function() {
    var filesCount = $(this)[0].files.length;
    var $textContainer = $(this).prev();

    if (filesCount === 1) {
        var fileName = $(this).val().split('\\').pop();
        $textContainer.text(fileName);
    } else {
        $textContainer.text(filesCount + ' files selected');
    }
});




// function gotoStep(step_number) {
//     $('#login_step' + (step_number - 1) + ' .transition5s,#login_step' + (step_number - 1) + ' .transition3s').addClass("hideOut");
//     setTimeout(function () {
//         $('#login_step' + (step_number - 1)).hide();
//         $('#login_step' + (step_number)).show();
//     }, 500);
//     setTimeout(function () {
//         $('#login_step' + (step_number) + ' .transition5s,#login_step' + (step_number) + ' .transition3s').removeClass("showIn");
//     }, 800);

// }
// function gotoBackStep(bstep_number) {
//     $('#login_step' + (bstep_number + 1) + ' .transition5s,#login_step' + (bstep_number + 1) + ' .transition3s').addClass("showIn");
//     setTimeout(function () {
//         $('#login_step' + (bstep_number + 1)).hide();
//         $('#login_step' + (bstep_number)).show();
//     }, 500);
//     setTimeout(function () {
//         $('#login_step' + (bstep_number) + ' .transition5s,#login_step' + (bstep_number) + ' .transition3s').removeClass("hideOut");
//     }, 800);

// }
// $(document).ready(function () {
//     $('.fancy_radio_wrap .fancy_radio').click(function () {
//         $(this).parents(".fancy_radio_wrap").find(".fancy_radio").removeClass("active");
//         $(this).addClass("active");
//         $('.upload_doc_wrap.img_doc').hide();
//         value = $(this).attr("data-value");
//         $('#' + value + "_pic_upload_wrap").show();
//     });
// });