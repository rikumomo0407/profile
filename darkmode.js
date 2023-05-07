window.addEventListener('DOMContentLoaded', ()=>{
    const checkToggle = document.getElementById('mode-button');
    const rotateIcon = document.getElementById('rotate');
    let nowRotate = 0;
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
