import { places } from '../data/discover.mjs';

// ============================================
// ELEMENT REFERENCES
// ============================================
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');
const grid = document.getElementById('discoverGrid');
const visitMessage = document.getElementById('visitMessage');
const visitText = document.getElementById('visitText');
const visitClose = document.getElementById('visitClose');
const dialog = document.getElementById('placeDialog');
const dialogClose = document.getElementById('dialogClose');

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// ============================================
// INITIALIZE (module scripts are deferred)
// ============================================
setYear();
setLastModified();
setupNav();
displayVisitMessage();
buildCards();
setupDialog();

// ============================================
// BUILD CARDS
// ============================================
function buildCards() {
    places.forEach((place, index) => {
        const card = document.createElement('article');
        card.className = 'place-card';

        const title = document.createElement('h2');
        title.textContent = place.name;

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = place.image;
        img.alt = place.alt;
        img.width = 300;
        img.height = 200;
        // First card is likely above the fold; lazy load the rest
        if (index > 0) img.loading = 'lazy';
        figure.appendChild(img);

        const address = document.createElement('address');
        address.textContent = place.address;

        const description = document.createElement('p');
        description.textContent = place.description;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Learn More';
        button.setAttribute('aria-label', `Learn more about ${place.name}`);
        button.addEventListener('click', () => openDialog(place));

        card.append(title, figure, address, description, button);
        grid.appendChild(card);
    });
}

// ============================================
// LEARN MORE DIALOG
// ============================================
function openDialog(place) {
    document.getElementById('dialogTitle').textContent = place.name;
    const img = document.getElementById('dialogImage');
    img.src = place.image;
    img.alt = place.alt;
    document.getElementById('dialogAddress').textContent = place.address;
    document.getElementById('dialogDescription').textContent = place.description;
    document.getElementById('dialogMap').href =
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(`${place.name}, ${place.address}`);
    dialog.showModal();
}

function setupDialog() {
    dialogClose.addEventListener('click', () => dialog.close());
    // Close when clicking the backdrop (outside the dialog box)
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
}

// ============================================
// VISIT MESSAGE (localStorage)
// ============================================
function displayVisitMessage() {
    const now = Date.now();
    let lastVisit = null;

    try {
        lastVisit = Number(localStorage.getItem('lastVisit')) || null;
        localStorage.setItem('lastVisit', String(now));
    } catch (error) {
        console.warn('localStorage unavailable:', error);
    }

    if (!lastVisit) {
        visitText.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const elapsed = now - lastVisit;
        if (elapsed < MS_PER_DAY) {
            visitText.textContent = 'Back so soon! Awesome!';
        } else {
            const days = Math.floor(elapsed / MS_PER_DAY);
            visitText.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
        }
    }

    visitClose.addEventListener('click', () => {
        visitMessage.hidden = true;
    });
}

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
// FOOTER DATE HELPERS
// ============================================
function setYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function setLastModified() {
    const lastModSpan = document.getElementById('lastModified');
    if (lastModSpan) {
        const lastMod = new Date(document.lastModified);
        lastModSpan.textContent = lastMod.toLocaleString('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }
}