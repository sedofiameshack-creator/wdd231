// ============================================
// ELEMENT REFERENCES
// ============================================
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');
const timestampField = document.getElementById('timestamp');
const modalLinks = document.querySelectorAll('.modal-link');
const modalOverlays = document.querySelectorAll('.modal-overlay');

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    setupNav();
    setTimestamp();
    setupModals();
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
function setupNav() {
    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });

    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });
}

// ============================================
// HIDDEN TIMESTAMP FIELD
// ============================================
function setTimestamp() {
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
}

// ============================================
// MEMBERSHIP LEVEL MODALS
// ============================================
function setupModals() {
    modalLinks.forEach(link => {
        link.addEventListener('click', () => {
            const modal = document.getElementById(link.dataset.modal);
            if (modal) {
                modal.classList.add('open');
            }
        });
    });

    modalOverlays.forEach(overlay => {
        // Close on the X button
        const closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
        }

        // Close when clicking outside the modal box
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                overlay.classList.remove('open');
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modalOverlays.forEach(overlay => overlay.classList.remove('open'));
        }
    });
}

// ============================================
// FOOTER DATE HELPERS
// ============================================
function setYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function setLastModified() {
    const lastModSpan = document.getElementById('lastModified');
    if (lastModSpan) {
        const lastMod = new Date(document.lastModified);
        lastModSpan.textContent = lastMod.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}