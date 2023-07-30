window.addEventListener("load", ()=>{
    //open header
    const button = document.getElementById('menu-button');
    const index = document.getElementById('index');
    //hide header
    const header = document.getElementById("header");
    let pos = 0;
    let lastPos = 0;
    let state = true;
    //darkmode
    const checkToggle = document.getElementById('mode-button');
    const rotateIcon = document.getElementById('rotate');
    let nowRotate = 0;

    //open header
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            index.style.display = "none";
            button.checked = false;
        };
    });
    button.addEventListener('click', () => {
        if (button.checked) {
            index.animate({opacity: [0, 1], transform: ["translateY(-20px)", "translateY(0)"]}, 300);
            index.style.display = "block";
        } else {
            index.style.display = "none";
        };
    });
    index.addEventListener('click', () => {
        index.style.display = "none";
        button.checked = false;
    });
    //hide header
    window.addEventListener("scroll", () => {
        if(!button.checked){
            pos = window.scrollY;
            if(pos < lastPos) {
                header.classList.remove('header--unpinned');
                lastPos = pos;
            }
            if(pos > lastPos + 200) { 
                header.classList.add('header--unpinned');
                lastPos = pos;
            }
        }
    });
    //darkmode
    checkToggle.addEventListener('change', function(e) {
        nowRotate += 180;
        rotateIcon.style.transform = 'rotate(' + nowRotate + 'deg)';
        if(e.target.checked) {
            document.body.classList.add('mode-light');
        } else {
            document.body.classList.remove('mode-light');
        }
    });
});