/**
 * Date Module
 * Handles dynamic copyright year and last modified date updates
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in copyright
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;

    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    const lastModifiedDate = new Date(document.lastModified);
    
    // Format the date in a readable way
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const formattedDate = lastModifiedDate.toLocaleDateString('en-US', options);
    lastModifiedElement.textContent = `Last Modified: ${formattedDate}`;
});