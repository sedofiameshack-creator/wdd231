console.log('📚 Course.js loaded');

/**
 * Course Module
 * Manages course data, filtering, and dynamic rendering of course cards
 */

// Official Course data array for Web and Computer Programming Certificate
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

console.log('✅ Courses loaded:', courses.length, 'courses');

// State management
let currentFilter = 'all';
let filteredCourses = [...courses];

/**
 * Filter courses based on subject
 * @param {string} filter - 'all', 'wdd', or 'cse'
 */
function filterCourses(filter) {
    currentFilter = filter;
    
    if (filter === 'all') {
        filteredCourses = [...courses];
    } else if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject.toLowerCase() === 'wdd');
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject.toLowerCase() === 'cse');
    }
    
    renderCourses();
    updateFilterButtons();
    updateTotalCredits();
}

/**
 * Create HTML for a single course card
 * @param {object} course - Course object
 * @returns {string} HTML string for course card
 */
function createCourseCard(course) {
    const completedClass = course.completed ? 'completed' : '';
    const completionBadge = course.completed ? '<span class="completion-badge">✓ Completed</span>' : '';
    const courseCode = `${course.subject} ${course.number}`;
    const techStack = course.technology ? course.technology.join(', ') : 'N/A';
    
    return `
        <div class="course-card ${completedClass}">
            <h3>${courseCode}: ${course.title}</h3>
            <p class="course-description">${course.description.substring(0, 100)}...</p>
            <div class="course-info">
                <span class="course-credits">${course.credits} Credits</span>
                ${completionBadge}
            </div>
            <div class="course-tech">
                <small>Tech: ${techStack}</small>
            </div>
        </div>
    `;
}

/**
 * Render all filtered courses to the DOM
 */
function renderCourses() {
    console.log('📝 renderCourses() called');
    const container = document.getElementById('courses-container');
    
    if (!container) {
        console.error('❌ Container not found in renderCourses!');
        return;
    }
    
    console.log('  Clearing container...');
    container.innerHTML = '';
    
    console.log('  Creating', filteredCourses.length, 'course cards...');
    filteredCourses.forEach((course, index) => {
        const cardHTML = createCourseCard(course);
        container.insertAdjacentHTML('beforeend', cardHTML);
        console.log(`    ✅ Card ${index + 1}: ${course.subject} ${course.number}`);
    });
    
    console.log('✅ All courses rendered to page');
}

/**
 * Calculate total credits for currently displayed courses
 * @returns {number} Total credits
 */
function calculateTotalCredits() {
    return filteredCourses.reduce((total, course) => total + course.credits, 0);
}

/**
 * Update the total credits display
 */
function updateTotalCredits() {
    const creditsElement = document.getElementById('total-credits');
    if (creditsElement) {
        creditsElement.textContent = calculateTotalCredits();
    }
}

/**
 * Update filter button states
 */
function updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-filter') === currentFilter) {
            button.classList.add('active');
        }
    });
}

/**
 * Initialize course module and set up event listeners
 */
function initializeCourses() {
    console.log('🚀 initializeCourses() called');
    
    // Check if courses exist
    if (!courses || courses.length === 0) {
        console.error('❌ ERROR: No courses in array!');
        return;
    }
    console.log('✅ Courses found:', courses.length);
    
    // Set up filtered courses
    filteredCourses = [...courses];
    console.log('✅ Filtered courses set:', filteredCourses.length);
    
    // Find and render container
    const container = document.getElementById('courses-container');
    if (!container) {
        console.error('❌ ERROR: #courses-container not found in HTML!');
        return;
    }
    console.log('✅ Container found');
    
    // Render courses to page
    console.log('📝 Rendering courses...');
    renderCourses();
    console.log('✅ Courses rendered');
    
    // Update credits
    updateTotalCredits();
    console.log('✅ Credits updated');
    
    // Add click listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('✅ Filter buttons found:', filterButtons.length);
    
    if (filterButtons.length === 0) {
        console.error('❌ ERROR: No filter buttons found!');
        return;
    }
    
    filterButtons.forEach((button, index) => {
        const filter = button.getAttribute('data-filter');
        console.log(`  Button ${index}: filter="${filter}"`);
        
        button.addEventListener('click', function(e) {
            console.log('🔘 Button clicked, filter:', filter);
            filterCourses(filter);
        });
    });
    
    console.log('🎉 Course module fully initialized!');
}

// Run immediately - check if DOM is ready
console.log('📋 Checking DOM state:', document.readyState);

if (document.readyState === 'loading') {
    console.log('⏳ DOM still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOMContentLoaded fired');
        setTimeout(initializeCourses, 100);
    });
} else {
    console.log('✅ DOM already loaded, running init...');
    setTimeout(initializeCourses, 100);
}

/**
 * Export for testing (optional)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courses, filterCourses, calculateTotalCredits };
}