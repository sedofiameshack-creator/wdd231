// Member Container and View State
const memberContainer = document.getElementById('memberContainer');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');

let members = [];
let currentView = 'grid';

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    fetchMembers();
    setupEventListeners();
});

// ============================================
// FETCH MEMBERS FROM JSON
// ============================================
async function fetchMembers() {
    try {
        console.log('Starting to fetch members.json...');
        const response = await fetch('data/members.json');
        
        console.log('Fetch response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}. Make sure members.json exists in the chamber/data/ folder.`);
        }
        
        members = await response.json();
        console.log(`✅ Successfully loaded ${members.length} members:`, members);
        displayMembers(currentView);
    } catch (error) {
        console.error('❌ Error fetching members:', error);
        console.error('Make sure your file structure is correct:');
        console.error('  chamber/');
        console.error('    ├── directory.html');
        console.error('    ├── data/');
        console.error('    │   └── members.json  ← Check this file exists!');
        console.error('    ├── css/');
        console.error('    └── js/');
        
        memberContainer.innerHTML = `
            <div class="error">
                <p><strong>❌ Failed to load businesses</strong></p>
                <p>Error: ${error.message}</p>
                <p style="font-size: 0.9em; color: #666; margin-top: 1em;">
                    <strong>Solution:</strong> Make sure <code>members.json</code> is in the <code>chamber/data/</code> folder.
                    <br>Check the browser console (F12) for more details.
                </p>
            </div>
        `;
    }
}

// ============================================
// DISPLAY MEMBERS (GRID OR LIST)
// ============================================
function displayMembers(view) {
    memberContainer.innerHTML = ''; // Clear previous content
    
    if (members.length === 0) {
        memberContainer.innerHTML = '<p>No members found.</p>';
        return;
    }

    members.forEach(member => {
        const memberElement = createMemberElement(member, view);
        memberContainer.appendChild(memberElement);
    });
}

// ============================================
// CREATE MEMBER ELEMENT
// ============================================
function createMemberElement(member, view) {
    const article = document.createElement('article');
    
    if (view === 'grid') {
        article.className = 'member-card';
        article.innerHTML = `
            <div class="card-image">
                <img src="images/${member.image}" 
                     alt="${member.name}" 
                     loading="lazy"
                     onerror="console.error('Image failed to load: images/${member.image}')">
            </div>
            <div class="card-content">
                <h3>${member.name}</h3>
                <p class="tag-line">${member.tagLine}</p>
                <div class="member-details">
                    <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
                </div>
                <div class="membership-badge membership-${member.membershipLevel}">
                    ${getMembershipLabel(member.membershipLevel)}
                </div>
            </div>
        `;
    } else {
        article.className = 'member-list-item';
        article.innerHTML = `
            <div class="list-item-content">
                <h3>${member.name}</h3>
                <p class="tag-line">${member.tagLine}</p>
                <div class="list-details">
                    <span><strong>📧</strong> <a href="mailto:${member.email}">${member.email}</a></span>
                    <span><strong>📱</strong> ${member.phone}</span>
                    <span><strong>🌐</strong> <a href="${member.website}" target="_blank">Visit Website</a></span>
                    <span class="membership-badge membership-${member.membershipLevel}">
                        ${getMembershipLabel(member.membershipLevel)}
                    </span>
                </div>
            </div>
        `;
    }
    
    console.log(`Created card for ${member.name} with image: images/${member.image}`);
    return article;
}

// ============================================
// GET MEMBERSHIP LABEL
// ============================================
function getMembershipLabel(level) {
    switch(level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Member';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Grid/List Toggle
    gridBtn.addEventListener('click', () => {
        currentView = 'grid';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        memberContainer.className = 'member-grid';
        displayMembers('grid');
    });

    listBtn.addEventListener('click', () => {
        currentView = 'list';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        memberContainer.className = 'member-list';
        displayMembers('list');
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });
}

// ============================================
// SET CURRENT YEAR
// ============================================
function setYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ============================================
// SET LAST MODIFICATION DATE
// ============================================
function setLastModified() {
    const lastModSpan = document.getElementById('lastModified');
    if (lastModSpan) {
        const lastMod = new Date(document.lastModified);
        const formattedDate = lastMod.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        lastModSpan.textContent = formattedDate;
    }
}