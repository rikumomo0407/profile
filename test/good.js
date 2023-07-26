window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("good").addEventListener("change", function (e) {
        if(e.target.checked){
            party.confetti(document.getElementById("good-button"));
        }
    });
});