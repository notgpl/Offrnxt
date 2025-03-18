document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    form?.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {
            var formData = new FormData(form);
            fetch("contact.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(result => {
                    if (result === "Success") {
                        showNotification("Message sent successfully", "success");
                        form?.reset();
                    } else {
                        showNotification("Message sent successfully", "success");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showNotification("Message sent successfully", "success");
                });
        }
    });

    function validateForm() {
        var isValid = true;
        var inputs = form?.querySelectorAll('input, textarea');

        inputs.forEach(function (input) {
            var errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }

            var errorMessage = getErrorMessage(input);
            if (errorMessage) {
                isValid = false;
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });

        return isValid;
    }

    function getErrorMessage(input) {
        if (input.value.trim() === '') {
            switch (input.id) {
                case 'name':
                    return 'Please enter your name.';
                case 'subject':
                    return 'Please enter a subject.';
                case 'email':
                    return 'Please enter your email address.';
                case 'message':
                    return 'Please enter your message.';
                default:
                    return 'This field is required.';
            }
        } else if (input.id === 'email' && !isValidEmail(input.value)) {
            return 'Please enter a valid email address.';
        }
        return null;
    }

    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message, type) {
        toastr.options = {
            closeButton: false,
            progressBar: true,
            positionClass: "toast-bottom-right",
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
        };
        toastr.clear();
        if (type === "success") {
            toastr.success(message, "", { className: "toast-success" });
        } else {
            toastr.error(message, "", { className: "toast-error" });
        }
    }

    // Add input event listeners for real-time validation
    form?.querySelectorAll('input, textarea').forEach(function (input) {
        input.addEventListener('input', function () {
            validateForm();
        });
    });
});

// ---------------- preloader -------------------- //

gsap.config({ trialWarn: false });
gsap.set('svg', {
    visibility: 'visible'
})

let tl = gsap.timeline({
    repeat: -1, yoyo: true, defaults: {
        ease: 'sine.inOut',
        duration: 1.2
    }
});
tl.fromTo('#gradDot', {
    x: 90
}, {
    x: -90
})
    .fromTo('#fillDot', {
        x: -90
    }, {
        x: 90
    }, 0)
    .fromTo('#mainGrad', {
        attr: {
            cx: 230,
            fx: 230
        }
    }, {
        attr: {
            cx: 570,
            fx: 570
        }
    }, 0)

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
})


//   ------------- numbers counter -----------------//

$(document).ready(function () {
    $(".counter").counterUp({
        delay: 10,
        time: 1200,
    });
});

// ---------------------- aos (animation on scroll) --------------------//

window.addEventListener('load', () => {
    AOS.init({
        duration: 500,
        easing: 'fade-up',
        once: true,
        mirror: false
    })
});

//---------------------- jquery fancybox plugin -------------------------// 

$(document).ready(function () {
    $("a.gallery-item").fancybox({
        // Options for the Fancybox plugin
        loop: true
    });
});

// ------------- sticky navbar on scroll ---------------- //

$(window).scroll(function () {
    if ($(window).scrollTop()) {
        $(".navbar").addClass("sticky")
    }
    else {
        $(".navbar").removeClass("sticky")
    }
})


// ================== portfolio filter ====================== //

$(document).ready(function () {

    // initialize Isotope
    var $grid = $('.row.portfolio-row').isotope({
        itemSelector: '.col-lg-4',
        layoutMode: 'fitRows'
    });

    // filter items on button click
    $('.filters').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

});

function rotateIcon(iconId) {
    const icon = document.getElementById(iconId);
    icon.classList.toggle('rotated');
}

// ---------------- back to top button -------------------- //

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    if (!scrollProgress) {
        // If the progress element doesn't exist, exit the function
        return;
    }

    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.style.background = `conic-gradient(#1FA84F ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

// Only add the click event listener if the element exists
let scrollProgress = document.getElementById("progress");
if (scrollProgress) {
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
}

// Only add scroll and load event listeners if the progress element exists
if (document.getElementById("progress")) {
    window.addEventListener("scroll", calcScrollValue);
    window.addEventListener("load", calcScrollValue);
}

// ---------------- particles  -------------------- //
document.addEventListener("DOMContentLoaded", function () {
    const particlesContainer = document.getElementById("particles-js");
    if (particlesContainer) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#999"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#999"
                    },
                    "polygon": {
                        "nb_sides": 3
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 100,
                    "color": "#999",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            }
        });
    }
});
// ---------------- tilt.js init -------------------- //

// Check if VanillaTilt is defined before using it
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 20,
        speed: 300,
        glare: true,
        "max-glare": 0.1
    });
}