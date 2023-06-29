window.addEventListener('DOMContentLoaded', function(){
    const pagetop_btn = document.getElementById('rocket');;
    pagetop_btn.addEventListener("click", scroll_top);
    function scroll_top() {
        pagetop_btn.style.position = "fixed";
        window.scroll({ top: 0, behavior: "smooth" });
        pagetop_btn.animate({opacity: [1, 0], transform: ["translateY(900px)", "translateY(-1000px)"]}, 1000);
        pagetop_btn.style.height = "auto";
    }
    window.addEventListener("scroll", scroll_event);
    function scroll_event() {
        if (window.pageYOffset < 50) {
            pagetop_btn.style.position = "absolute";
            pagetop_btn.style.height = "101px";
        } 
    }
});
