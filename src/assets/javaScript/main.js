//posicion 0.0
function subir() {
    $('body, html').animate({
        scrollTop: '0px'
    }, 500);
    console.log('recargo 0.0');
}

// Cargar pagina
function recarga() {
    if (location.reload(true)) {
        $('body, html').animate({
            scrollTop: '-10px'
        }, 500);
        console.log('Se recargo la pagina ');
    } else {
        console.log('no se recargo la pagina');
    }
}

//menu
var menuScroll = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (menuScroll > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        var $this = $(this),
            st = $this.scrollTop(),
            navbar = $('.menuPrincipal');

        if (st > 150) {
            if (!navbar.hasClass('scrolled')) {
                navbar.addClass('scrolled');
            }
        }
        if (st < 150) {
            if (navbar.hasClass('scrolled')) {
                navbar.removeClass('scrolled sleep');
            }
        }
        if (st > 350) {
            if (!navbar.hasClass('awake')) {
                navbar.addClass('awake');
            }
        }
        if (st < 350) {
            if (navbar.hasClass('awake')) {
                navbar.removeClass('awake');
                navbar.addClass('sleep');
            }
        }
    } else {
        document.getElementById("navbar").style.top = "-900px";
    }
    menuScroll = currentScrollPos;
}



//Extenciones
function fileValidation() {
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Solo extenciones .jpeg/.jpg/.png/.gif ');
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="' + e.target.result + '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}


//Funcion Modal automatico
$(document).ready(function() {
    $('#modalAutomatic').modal('toggle')
});


//reportes
$(document).ready(function() {
    $('[id^=detail-]').hide();
    $('.toggle').click(function() {
        $input = $(this);
        $target = $('#' + $input.attr('data-toggle'));
        $target.slideToggle();
    });
});