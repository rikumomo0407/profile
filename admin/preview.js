window.addEventListener("load", ()=>{
    let state = false;
    let change = false;
    const cms = document.getElementById('cms');
    const bar = document.getElementById('bar');
    const preview = document.getElementById('preview');
    const selectElement = document.getElementById('preview-selection');

    selectElement.addEventListener('change', () => {
        const index = selectElement.selectedIndex;
        if (index == 0) {
            cms.style.display = 'block';
            bar.style.display = 'none';
            preview.style.display = 'none';
        } else if (index == 1) {
            cms.style.display = 'none';
            bar.style.display = 'none';
            preview.style.display = 'block';
            preview.style.width = '100%';
            preview.style.height = '100%';
        } else if (index == 2) {
            cms.style.display = 'block';
            bar.style.display = 'block';
            preview.style.display = 'block';
        }
    });
    bar.addEventListener('pointerdown', () => {
        state = true;
    })
    document.addEventListener('pointerup', () => {
        state = false;
    });
    onmousemove = function(e) {
        if (document.body.scrollWidth >= 610){
            if (change) {
                change = false;
                preview.style.height = '100%';
            }
            if(state && e.clientX > 300 && (document.body.scrollWidth - e.clientX) > 300){
                preview.style.width = e.clientX + "px";
            }
        } else {
            if (!change) {
                change = true;
            }
            if(state && e.clientY > 300 && (document.body.scrollHeight - e.clientY) > 300){
                preview.style.height = e.clientY + "px";
            }
        }
    }
    bar.addEventListener('touchstart', () => {
        state = true;
    })
    document.addEventListener('touchend', () => {
        state = false;
    });
    ontouchmove = function(e) {
        if (document.body.scrollWidth >= 610){
            if (change) {
                change = false;
                preview.style.height = '100%';
            }
            if(state && e.touches[0].pageX > 300 && (document.body.scrollWidth - e.touches[0].pageX) > 300){
                preview.style.width = e.touches[0].pageX + "px";
            }
        } else {
            if (!change) {
                change = true;
            }
            if(state && e.touches[0].pageY > 300 && (document.body.scrollHeight - e.touches[0].pageY) > 300){
                preview.style.height = e.touches[0].pageY + "px";
            }
        }
    }
});