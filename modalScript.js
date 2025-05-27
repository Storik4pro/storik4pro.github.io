document.addEventListener('click', (event) => {
    const openBtn = event.target.closest('[data-modal-target]');
    if (openBtn) {
        const modalSelector = openBtn.dataset.modalTarget;
        const modal = document.querySelector(modalSelector);
        if (modal) {
        modal.style.display = 'flex';
        }
        return;
    }

    if (event.target.matches('.modal-close')) {
        const modal = event.target.closest('.modal');
        if (modal) {
        modal.style.display = 'none';
        }
        return;
    }

    const clickedModal = event.target.closest('.modal');
    if (clickedModal && event.target === clickedModal) {
        clickedModal.style.display = 'none';
    }
});
