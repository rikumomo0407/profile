window.addEventListener("scroll", function () {
    const arrow = document.getElementById("scroll");
    const scroll = window.pageYOffset;
    if (scroll > 100 && getComputedStyle(arrow, null).getPropertyValue('opacity') == 1) {
        arrow.animate([{opacity: '1'}, {opacity: '0'}], 500);
        arrow.style.opacity = "0";
    }
});
