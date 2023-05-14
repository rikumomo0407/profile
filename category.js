window.addEventListener('DOMContentLoaded', function(){
    var prm=[];
    var json_data, repo_data;
    prm[0] = new Promise(function(resolver){
        var xhr = new XMLHttpRequest();
        xhr.open('get',"https://raw.githubusercontent.com/rikumomo0407/profile/main/data.json");
        xhr.onload=function(){
            json_data = JSON.parse(this.responseText);
            resolver(this);
        };
        xhr.send();
    });
    prm[1] = new Promise(function(resolver){
        var xhr = new XMLHttpRequest();
        xhr.open('get', "https://api.github.com/users/rikumomo0407/repos");
        xhr.onload=function(e){
            repo_data = JSON.parse(this.responseText);
            resolver(this);
        };
        xhr.send();
    });
    Promise.all(prm).then(function(){
        let recommendList = [[null, null], [null, null], [null, null]];
        let popularList = [[null, null], [null, null], [null, null]];
        let updatedList = [[null, null], [null, null], [null, null]];
        for(let component of repo_data){
            date = new Date(component.pushed_at);
            for(let target = 0; target < 3; target++){
                if(json_data.recommend[target] == component.id){
                    recommendList[target] = [date, component.html_url, component.name, component.description, component.language];
                }
            }
            for(let target = 0; target < 3; target++){
                if(date > updatedList[target][0] || updatedList[target][0] == null){
                    updatedList.splice(target, 0, [date, component.html_url, component.name, component.description, component.language]);
                    updatedList.splice(-1, 1);
                    break;
                };
            };
            for(let target = 0; target < 3; target++){
                if(component.stargazers_count > popularList[target][0] || popularList[target][0] == null){
                    popularList.splice(target, 0, [component.stargazers_count, component.html_url, component.name, component.description, component.language]);
                    popularList.splice(-1, 1);
                    break;
                };
            };
        };
        const recommend = document.getElementById('recommend-repo');
        const popular = document.getElementById('popular-repo');
        const updated = document.getElementById('updated-repo');
        recommend.insertAdjacentHTML('beforeend', '<h2>Recommended repositories</h2><ol><li><div class="repo-title"><a href=\"' + recommendList[0][1] + '\">' + recommendList[0][2] + '</a></div><div class="repo-desc">' + recommendList[0][3] + '</div><div class="repo-lang"><span style="background-color: #f1e05a;"></span>' + recommendList[0][4] + '</div></li><li><div class="repo-title"><a href=\"' + recommendList[1][1] + '\">' + recommendList[1][2] + '</a></div><div class="repo-desc">' + recommendList[1][3] + '</div><div class="repo-lang"><span style="background-color: #f34b7d;"></span>' + recommendList[1][4] + '</div></li><li><div class="repo-title"><a href=\"' + recommendList[2][1] + '\">' + recommendList[2][2] + '</a></div><div class="repo-desc">' + recommendList[2][3] + '</div><div class="repo-lang"><span style="background-color:  #178600;"></span>' + recommendList[2][4] + '</div></li></ol>');
        popular.insertAdjacentHTML('beforeend', '<h2>Popular repositories</h2><ol><li><div class="repo-title"><a href=\"' + popularList[0][1] + '\">' + popularList[0][2] + '</a></div><div class="repo-desc">' + popularList[0][3] + '</div><div class="repo-lang"><span style="background-color: #f1e05a;"></span>' + popularList[0][4] + '</div></li><li><div class="repo-title"><a href=\"' + popularList[1][1] + '\">' + popularList[1][2] + '</a></div><div class="repo-desc">' + popularList[1][3] + '</div><div class="repo-lang"><span style="background-color: #f34b7d;"></span>' + popularList[1][4] + '</div></li><li><div class="repo-title"><a href=\"' + popularList[2][1] + '\">' + popularList[2][2] + '</a></div><div class="repo-desc">' + popularList[2][3] + '</div><div class="repo-lang"><span style="background-color:  #178600;"></span>' + popularList[2][4] + '</div></li></ol>');
        updated.insertAdjacentHTML('beforeend', '<h2>Updated repositories</h2><ol><li><div class="repo-title"><a href=\"' + updatedList[0][1] + '\">' + updatedList[0][2] + '</a></div><div class="repo-desc">' + updatedList[0][3] + '</div><div class="repo-lang"><span style="background-color: #f1e05a;"></span>' + updatedList[0][4] + '</div></li><li><div class="repo-title"><a href=\"' + updatedList[1][1] + '\">' + updatedList[1][2] + '</a></div><div class="repo-desc">' + updatedList[1][3] + '</div><div class="repo-lang"><span style="background-color: #f34b7d;"></span>' + updatedList[1][4] + '</div></li><li><div class="repo-title"><a href=\"' + updatedList[2][1] + '\">' + updatedList[2][2] + '</a></div><div class="repo-desc">' + updatedList[2][3] + '</div><div class="repo-lang"><span style="background-color:  #178600;"></span>' + updatedList[2][4] + '</div></li></ol>');
        const parent = document.querySelector('#timeline ul');
        let filter = document.querySelectorAll('input[type="radio"]');
        let icon = "";
        for(let component of json_data.timeline){
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
                    for(let component of json_data.timeline){
                        if(target.value == 'all' ||  target.value == component.category){
                            component.category == "releases" ? icon = ' 🔥' : component.category == "notes" ? icon = ' 📃' : icon = "";
                            parent.insertAdjacentHTML('beforeend', '<li><div class="dot"></div><div class="log"><time>' + component.date + '</time>' + icon + '<p class="bubble">' + component.content + '</p></div></li>');
                        };
                    };
                }
            });
        };
    });
});
