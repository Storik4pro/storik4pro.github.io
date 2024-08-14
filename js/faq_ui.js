const faqs = [
    {
        id: 1,
        title: "[WinError 1021] Невозможно создать статический параметр",
        description: "Решение ошибки \"Невозможно создать статический подпараметр для временного родительского параметра\"",
        page: "ui-issues/ui_reg_error"
    },
    {
        id: 2,
        title: "Иконки в трее",
        description: "При появлении уведомления в трее показывается несколько иконок приложения",
        page: "ui-issues/ui_trey_icons/"
    },
    {
        id: 3,
        title: "Ошибка: множество иконок в трее",
        description: "После запуска программы через галочку \"запустить после завершения\" в установщике появляется множество иконок",
        page: "ui-issues/ui_trey_error/"
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