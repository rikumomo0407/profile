window.addEventListener('DOMContentLoaded', function(){

    //load json file from github server
    var prm=[];
    var json_data;
    prm[0] = new Promise(function(resolver){ //load data.json to "json_data"
        var xhr = new XMLHttpRequest();
        xhr.open('get',"https://raw.githubusercontent.com/rikumomo0407/profile/main/data.json");
        xhr.onload=function(){
            json_data = JSON.parse(this.responseText);
            resolver(this);
        };
        xhr.send();
    });

    //extract obective data from "repo_data" to 3 lists
    Promise.all(prm).then(function(){
        //define variables
        const parent = document.querySelector('#timeline div');
        let filter = document.querySelectorAll('input[type="radio"]');
        let icon = '';
        let days = 10;

        //define function
        function sortTimeline(value){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }
            year = '';
            date = '';
            let index = 0
            for(let component of json_data.timeline){
                if(value == 'all' || value == component.category){
                    component.category == "releases" ? icon = 'images/png/partying_face_3d.png' : component.category == "notes" ? icon = 'images/png/memo_3d.png' : icon = '';
                    if(component.date.slice(0, 4) != year){
                        year = component.date.slice(0, 4);
                        parent.insertAdjacentHTML('beforeend', '<section id=\"year-' + year + '\"><h2>' + year + '</h2><ul></ul></section>');
                        child = document.querySelector('#timeline #year-' + year + ' ul');
                    };
                    if(date != component.date.slice(5, 10)){
                        index += 1;
                        if(index > days){
                            break;
                        }
                        child.insertAdjacentHTML('beforeend', '<li><div class=\"dot\"></div><div class=\"log\"><div class=\"date\"><time>' + component.date + '</time></div><div class=\"bubble\">' + (icon != "" ? '<div class=\"icon\"><img src=\"' + icon + '\" width="22px"></div>' : '') + component.content + '</div></div></li>');
                    }else{
                        child.insertAdjacentHTML('beforeend', '<li><div class=\"log\"><div class=\"bubble\">' + (icon != "" ? '<div class=\"icon\"><img src=\"' + icon + '\" width="22px"></div>' : '') + component.content + '</div></div></li>');
                    }
                    date = component.date.slice(5, 10);
                };
            };
        };

        //operate filter
        sortTimeline('all')
        for(let target of filter){
            target.addEventListener('change', function (){
                console.log(target.value);
                if(target.value == 'recommend' || target.value == 'popular' || target.value == 'updated'){
                    recommend.style.display = popular.style.display = updated.style.display = "none";
                    target.value == 'recommend' ? recommend.style.display = "block" : target.value == 'popular' ? popular.style.display = "block" : updated.style.display = "block";
                }else{
                    sortTimeline(target.value)
                }
            });
        };
        for(let clicked of document.querySelectorAll('input[type="button"]')){
            clicked.addEventListener('change', function (){
                console.log("clicked!!");
                // days += 1;
            });
        };
    });
});