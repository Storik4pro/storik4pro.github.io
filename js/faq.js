const faqs = [
    {
        id: 1,
        title: "Permission error",
        description: "Ошибка [Errno 13] Permission error при распаковке архива",
        page: "installer_windrivert-sys/"
    },
    {
        id: 2,
        title: "[Errno 13] Permission denied",
        description: "Решение ошибки [Errno 13], возникающей на этапе скачивания архива.",
        page: "installer_permission_denied/"
    },
    {
        id: 3,
        title: "Уведомление при запуске Update assistant",
        description: "Что значит появляющееся уведомление \"No version specified for update\"",
        page: "installer_version_not_specified/"
    },
    {
        id: 4,
        title: "[Errno 2] No such file or directory",
        description: "Решение ошибки [Errno 2], возникающей на этапе скачивания архива.",
        page: "installer_errno2/"
    },
    {
        id: 5,
        title: "Update assistant error",
        description: "Решение ошибки \"Не удаётся получить корректный ответ от сервера\"",
        page: "installer_assets/"
    },
    {
        id: 5,
        title: "'NoneType' object has no attribute 'split'",
        description: "Решение ошибки, происходящей во время подготовки к скачиванию",
        page: "installer_nontype/"
    },

];

let currentPage = 1;
const itemsPerPage = 3;
let filteredFAQs = [];

document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 4;
    let currentPage = 1;

    const faqContainer = document.getElementById("faq-container");
    const totalItems = faqs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageTitle = document.getElementById("pageTitle");
    const searchResultsInfo = document.getElementById("search-results-info");
    const searchResultsCount = document.getElementById("search-results-count");
    const pagination = document.getElementById("pagination");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    const notification = document.getElementById("notification");

    function renderFaqs(filteredFaqs = faqs) {
        faqContainer.innerHTML = ""; 

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        filteredFaqs.slice(start, end).forEach(faq => {
            const faqItem = document.createElement("a");
            faqItem.className = "faq-card";
            faqItem.href = faq.page;
            faqItem.innerHTML = `
                <h2>${faq.title}</h2>
                <p>${faq.description}</p>
                <a href="${faq.page}">Подробнее</a>
            `;
            faqContainer.appendChild(faqItem);
        });

        pageInfo.textContent = `${currentPage} / ${Math.ceil(filteredFaqs.length / itemsPerPage)}`;
        pagination.style.display = filteredFaqs.length > itemsPerPage ? "flex" : "none";
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(filteredFaqs.length / itemsPerPage);
    }

    prevPageBtn.addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            renderFaqs();
        }
    });

    nextPageBtn.addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderFaqs();
        }
    });

    function showSearchResults(query) {
        const results = faqs.filter(faq => faq.title.toLowerCase().includes(query.toLowerCase()) || faq.description.toLowerCase().includes(query.toLowerCase()));
        const resultsCount = results.length;

        if (resultsCount > 0) {
            notification.style.display = "none";
            searchResultsInfo.style.display = "block";
            searchResultsCount.textContent = `Результатов найдено (${resultsCount}/${totalItems})`;
            notification.querySelector("p").textContent = `Результаты поиска: "${query}". Результатов найдено (${resultsCount}/${totalItems})`;

            currentPage = 1;
            renderFaqs(results);
        } else {
            searchResultsInfo.style.display = "none";
            notification.style.display = "block";
            notification.querySelector("p").textContent = `По запросу "${query}" ничего не найдено.`;
        }
    }

    document.querySelector('.search-bar button').addEventListener('click', function() {
        const query = document.querySelector('.search-bar input').value.trim();
        if (query) {
            showSearchResults(query);
        } else {
            notification.style.display = "block";
            notification.querySelector("p").textContent = "Введите запрос для поиска.";
        }
    });

    renderFaqs();
});





function navigateToFAQ(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        const language = block.getAttribute('data-language') || 'Копировать';
        const code = block.textContent.trim();

        const codeHeader = document.createElement('div');
        codeHeader.classList.add('code-header');

        const languageLabel = document.createElement('span');
        languageLabel.classList.add('language');
        languageLabel.textContent = language;

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Копировать';
        copyButton.onclick = () => {
            navigator.clipboard.writeText(code);
            alert('Код скопирован в буфер обмена');
        };

        codeHeader.appendChild(languageLabel);
        codeHeader.appendChild(copyButton);

        const pre = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.textContent = code;
        pre.appendChild(codeElement);

        block.innerHTML = '';
        block.appendChild(codeHeader);
        block.appendChild(pre);
    });
});
