async function fetchRSS(targetUrl) {
    const fetchUrl = `https://cors.io/?url=${encodeURIComponent(targetUrl)}`;
    
    try {
        const response = await fetch(fetchUrl);
        const data = JSON.parse(await response.text());
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.body, "application/xml");

        const items = xmlDoc.querySelectorAll("entry");
        const scrollContainer = document.querySelector('.news-container');
        scrollContainer.innerHTML = '';

        items.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("content").textContent;

            const re = /(?:<h2>Что нового в этом обновлении<\/h2>)(.*?)(?:(?:<h2>.*?)|$)/gs;
            let innerDescription = Array.from(String(description).matchAll(re))[0]
            innerDescription = innerDescription === undefined ? "There is no new features in this release" : innerDescription[1]
            console.log(innerDescription)

            CreateNewsTile(scrollContainer, link, title, innerDescription);

        });
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
    }
}