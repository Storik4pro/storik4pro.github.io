const wikiPages = [
    {
        title: "What do I need to do to start my journey on the Internet?",
        href: "what-i-need-to-do-for-start"
    },
    {
        title: "Beta Testing: Audio Transmission",
        href: "sound"
    }
];

const flexContainer = document.querySelector('.flex-container');
flexContainer.innerHTML = ""; 

wikiPages.forEach(page => {
    const item = document.createElement('div');
    item.className = 'flex-container-item';
    item.innerHTML = `
        <div class="help-container">
            <form class="help-container-item" action="${page.href}">
                <button class="legacy-button news-tile" type="button" onclick="location.href='${page.href}'">
                    <h2 class="legacy">${page.title}</h2>
                    <div class="link-legacy-container">
                        <a class="link-legacy" href="${page.href}">
                            Перейти<span class="font-icon">&#xE76C;</span>
                        </a>
                    </div>
                </button>
            </form>
        </div>
    `;
    flexContainer.appendChild(item);
});