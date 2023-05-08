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

//<div id="twitter-setting"><a class="twitter-timeline" data-lang="en" data-width="500" data-height="500" data-theme="dark" href="https://twitter.com/rikumomo0407?ref_src=twsrc%5Etfw" data-chrome="noheader nofooter noscrollbar transparent">Tweets by rikumomo0407</a></div>
