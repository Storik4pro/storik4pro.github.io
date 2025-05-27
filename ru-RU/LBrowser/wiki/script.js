const wikiPages = [
    {
        title: "Что мне нужно сделать, чтобы начать путешествие в сети Интернет?",
        href: "what-i-need-to-do-for-start"
    },
    {
        title: "Предварительное тестирование: Передача звука",
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