function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
    }
    return "";
}

document.addEventListener('click', (event) => {
    const projectLink = event.target.closest('.project-page-button');
    if (projectLink) {
        event.preventDefault();
        const savedLang = getCookie('preferredLang');
        if (savedLang) {
        const prefix = savedLang === 'en' ? '/en-US/' : '/ru-RU/';
        window.location.href = prefix + projectLink.getAttribute('href');
        return;
        }
        const modal = document.getElementById('lang-modal');
        modal.dataset.targetHref = projectLink.getAttribute('href');
        modal.style.display = 'flex';
        return;
    }

    if (event.target.matches('.modal-close') ||
        (event.target.classList.contains('modal') && event.target.id === 'lang-modal')) {
        document.getElementById('lang-modal').style.display = 'none';
        return;
    }

    if (event.target.id === 'lang-confirm') {
        const modal = document.getElementById('lang-modal');
        const lang = modal.querySelector('#lang-select').value;
        const href = modal.dataset.targetHref;
        const prefix = lang === 'en' ? '/en-US/' : '/ru-RU/';

        if (modal.querySelector('#lang-remember').checked) {
        setCookie('preferredLang', lang, 365);
        }

        window.location.href = prefix + href;
    }
});

