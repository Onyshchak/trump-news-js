function AjaxFileLoad(filepath) {
    var promiseObj = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", filepath, true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var resp = xhr.responseText;
                    var respJson = JSON.parse(resp);
                    resolve(respJson);
                } else {
                    reject(xhr.status);
                    console.log("xhr failed");
                }
            } else {
                console.log("xhr processing going on");
            }
        };
    });
    return promiseObj;
}

function process_resp(data) {
    data.forEach( (item) => {
        var img = (item.img == undefined) ? '' : ('<img class="news-component--image" src="img/' + item.img + '">');
        document.getElementById("listNews").innerHTML += `
        <div class="news-component">
            ${img}
            <div class="news-component--content">
                <div class="news-component--date">${item.date || "no date"}</div>
                <h1 ${(item.title == undefined) ? 'style="display: none"' : ''} class="news-component--title">${item.title}</h1>
                <div ${(item.description == undefined) ? 'style="display: none"' : ''} class="news-component--text">${item.description}</div>
                <iframe class="news-component--video" src="https://www.youtube.com/embed/R8Wde1fFvPg"></iframe>
             </div>
        </div>`;
    })
}

function error_handler(statusCode){
    document.getElementById("listNews").innerHTML += `
        <div class="news-component">
            <h1 class="news-component--title">No news found</h1>
        </div>`;
}

function loadDoc() {
    AjaxFileLoad("assets/db.json").then(process_resp, error_handler);
}

function scrollToShare() {
    document.getElementById('share-menu').scrollIntoView({ block: 'end',  behavior: 'smooth' });
}
