function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

const flexContainer = document.querySelector('.flex-container');
flexContainer.innerHTML = ""; 

const wikiPages = readTextFile("/en-US/cdpiui/wiki/data.json", function(text){
    data = JSON.parse(text);

    data.data.forEach(group => {
        const pages = group.pages
        
        const header = document.createElement('h3');
        header.textContent = group.name;
        header.classList.add("selection-header");

        if (group.name != ".") flexContainer.appendChild(header);

        pages.forEach(page => {
            page.href = page.href.replace("\\", "\\\\")
            const item = document.createElement('div');
            item.className = 'flex-container-item';
            item.innerHTML = `
                <div class="help-container">
                    <form class="help-container-item" action="${page.href}">
                        <button class="legacy-button news-tile" type="button" onclick="location.href='${page.href}'">
                            <h2 class="legacy">${page.title}</h2>
                            <div class="link-legacy-container">
                                <a class="link-legacy" href="${page.href}">
                                    Visit page<span class="font-icon">&#xE76C;</span>
                                </a>
                            </div>
                        </button>
                    </form>
                </div>
            `;
            flexContainer.appendChild(item);
        });
    });
});



