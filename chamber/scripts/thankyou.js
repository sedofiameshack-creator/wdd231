// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    setupNav();
    displaySubmission();
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
function setupNav() {
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');
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
// DISPLAY SUBMITTED FORM DATA FROM URL PARAMS
// ============================================
function displaySubmission() {
    const params = new URLSearchParams(window.location.search);

    const fields = {
        firstName: params.get('firstName') || 'Not provided',
        lastName: params.get('lastName') || 'Not provided',
        email: params.get('email') || 'Not provided',
        mobile: params.get('mobile') || 'Not provided',
        orgName: params.get('orgName') || 'Not provided'
    };

    Object.keys(fields).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.textContent = fields[key];
    });

    const timestampEl = document.getElementById('timestamp');
    if (timestampEl) {
        const rawTimestamp = params.get('timestamp');
        if (rawTimestamp) {
            const date = new Date(rawTimestamp);
            timestampEl.textContent = isNaN(date) ? rawTimestamp : date.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } else {
            timestampEl.textContent = 'Not provided';
        }
    }
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