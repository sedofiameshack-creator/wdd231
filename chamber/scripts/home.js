// ============================================
// CONFIG
// ============================================
// Get a free API key at https://openweathermap.org/api
// then paste it below. Without a valid key the weather
// section will show a friendly error instead of crashing.
const WEATHER_API_KEY = '316fcb2ba9687b25e9e0ad75b101b70c';
const WEATHER_CITY = 'Ho,GH';
const WEATHER_UNITS = 'metric';

// ============================================
// ELEMENT REFERENCES
// ============================================
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');
const weatherContainer = document.getElementById('weatherContainer');
const spotlightContainer = document.getElementById('spotlightContainer');

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    setupNav();
    loadWeather();
    loadSpotlights();
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

// ============================================
// WEATHER
// ============================================
async function loadWeather() {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        weatherContainer.innerHTML = `
            <div class="error">
                <p><strong>Weather is not configured yet.</strong></p>
                <p style="font-size: 0.9em;">Add a free OpenWeatherMap API key to
                <code>scripts/home.js</code> (WEATHER_API_KEY) to enable this section.</p>
            </div>
        `;
        return;
    }

    try {
        const [current, forecast] = await Promise.all([
            fetchCurrentWeather(),
            fetchForecast()
        ]);
        displayWeather(current, forecast);
    } catch (error) {
        console.error('❌ Error fetching weather:', error);
        weatherContainer.innerHTML = `
            <div class="error">
                <p><strong>❌ Failed to load weather</strong></p>
                <p style="font-size: 0.9em;">${error.message}</p>
            </div>
        `;
    }
}

async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Current weather request failed (status ${response.status}). Check your API key and city name.`);
    }
    return response.json();
}

async function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CITY}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Forecast request failed (status ${response.status}). Check your API key and city name.`);
    }
    const data = await response.json();
    return buildThreeDayForecast(data.list);
}

// The 5-day/3-hour forecast endpoint returns 40 entries (8 per day).
// Pick the entry closest to midday for each of the next 3 distinct days.
function buildThreeDayForecast(list) {
    const today = new Date().toDateString();
    const seenDays = new Set([today]);
    const days = [];

    for (const entry of list) {
        const entryDate = new Date(entry.dt * 1000);
        const dayKey = entryDate.toDateString();
        const isMidday = entry.dt_txt.includes('12:00:00');

        if (!seenDays.has(dayKey) && isMidday) {
            seenDays.add(dayKey);
            days.push({
                label: entryDate.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(entry.main.temp),
                description: entry.weather[0].description
            });
        }

        if (days.length === 3) break;
    }

    return days;
}

function displayWeather(current, forecastDays) {
    const temp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    const icon = current.weather[0].icon;

    const forecastHTML = forecastDays.map(day => `
        <div class="forecast-day">
            <p class="forecast-label">${day.label}</p>
            <p class="forecast-temp">${day.temp}&deg;C</p>
            <p class="forecast-desc">${day.description}</p>
        </div>
    `).join('');

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                 alt="${description}" class="weather-icon" width="60" height="60">
            <div>
                <p class="current-temp">${temp}&deg;C</p>
                <p class="current-desc">${description}</p>
            </div>
        </div>
        <div class="forecast-row">
            ${forecastHTML}
        </div>
    `;
}

// ============================================
// MEMBER SPOTLIGHTS
// ============================================
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('❌ Error fetching spotlight members:', error);
        spotlightContainer.innerHTML = `
            <div class="error">
                <p><strong>❌ Failed to load member spotlights</strong></p>
                <p style="font-size: 0.9em;">${error.message}</p>
            </div>
        `;
    }
}

function displaySpotlights(members) {
    // Gold (3) and Silver (2) members only
    const eligible = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    if (eligible.length === 0) {
        spotlightContainer.innerHTML = '<p>No spotlight members available.</p>';
        return;
    }

    const spotlightCount = Math.min(eligible.length, Math.random() < 0.5 ? 2 : 3);
    const chosen = shuffleArray(eligible).slice(0, spotlightCount);

    spotlightContainer.innerHTML = chosen.map(member => `
        <article class="spotlight-card">
            <img src="images/${member.image}" alt="${member.name} logo" class="spotlight-logo" loading="lazy">
            <div class="spotlight-content">
                <h3>${member.name}</h3>
                <p class="tag-line">${member.tagLine}</p>
                <p>${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                <div class="membership-badge membership-${member.membershipLevel}">
                    ${getMembershipLabel(member.membershipLevel)}
                </div>
            </div>
        </article>
    `).join('');
}

function getMembershipLabel(level) {
    switch (level) {
        case 3: return 'Gold';
        case 2: return 'Silver';
        default: return 'Member';
    }
}

// Fisher-Yates shuffle so spotlight order/selection varies on each load
function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}