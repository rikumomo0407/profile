window.addEventListener("load", ()=>{
	fetch("https://raw.githubusercontent.com/rikumomo0407/profile/main/data.json")
		.then( response => response.json())
        .then( data => main(data));
});

function main(data){
	const parent = document.querySelector('#timeline ul');
    let filter = document.querySelectorAll('input[type="radio"]');
    let icon = "";
    for(let component of data.timeline){
        component.category == "releases" ? icon = ' 🔥' : component.category == "notes" ? icon = ' 📃' : icon = "";
        parent.insertAdjacentHTML('beforeend', '<li data-category=' + component.category + '><div class="dot"></div><div class="log"><time>' + component.date + '</time>' + icon + '<p class="bubble">' + component.content + '</p></div></li>');
    };
    for (let target of filter) {
        target.addEventListener('change', function (){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }
            for(let component of data.timeline){
                if (target.value == 'all' ||  target.value == component.category) {
                    component.category == "releases" ? icon = ' 🔥' : component.category == "notes" ? icon = ' 📃' : icon = "";
                    parent.insertAdjacentHTML('beforeend', '<li data-category=' + component.category + '><div class="dot"></div><div class="log"><time>' + component.date + '</time>' + icon + '<p class="bubble">' + component.content + '</p></div></li>');
                };
            };
        });
    };
};