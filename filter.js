window.addEventListener("load", ()=>{
	fetch("https://raw.githubusercontent.com/rikumomo0407/profile/main/data.json")
		.then( response => response.json())
        .then( data => main(data));
});

function main(data){
    const recommend = document.getElementById('recommend-repo');
    const popular = document.getElementById('popular-repo');
    const updated = document.getElementById('updated-repo');
	const parent = document.querySelector('#timeline ul');
    let filter = document.querySelectorAll('input[type="radio"]');
    let icon = "";
    for(let component of data.timeline){
        component.category == "releases" ? icon = ' 🔥' : component.category == "notes" ? icon = ' 📃' : icon = "";
        parent.insertAdjacentHTML('beforeend', '<li><div class="dot"></div><div class="log"><time>' + component.date + '</time>' + icon + '<p class="bubble">' + component.content + '</p></div></li>');
    };
    for (let target of filter) {
        target.addEventListener('change', function (){
            if(target.value == 'recommend' || target.value == 'popular' || target.value == 'updated'){
                recommend.style.display = popular.style.display = updated.style.display = "none";
                target.value == 'recommend' ? recommend.style.display = "block" : target.value == 'popular' ? popular.style.display = "block" : updated.style.display = "block";
            }else{
                while(parent.firstChild){
                    parent.removeChild(parent.firstChild);
                }
                for(let component of data.timeline){
                    if(target.value == 'all' ||  target.value == component.category){
                        component.category == "releases" ? icon = ' 🔥' : component.category == "notes" ? icon = ' 📃' : icon = "";
                        parent.insertAdjacentHTML('beforeend', '<li><div class="dot"></div><div class="log"><time>' + component.date + '</time>' + icon + '<p class="bubble">' + component.content + '</p></div></li>');
                    };
                };
            }
        });
    };
};
