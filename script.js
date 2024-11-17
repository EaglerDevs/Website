document.addEventListener('DOMContentLoaded', () => {
    loadGitHubData('EaglerDevs');
});

// Fetch repositories from GitHub API for an organization
async function loadGitHubData(orgName) {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';  // Show loading spinner

    try {
        const response = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            displayNoProjectsMessage();
        } else {
            loadProjects(data);
        }
    } catch (error) {
        console.error('Error loading GitHub data:', error);
        displayErrorMessage(error);
    } finally {
        loadingSpinner.style.display = 'none';  // Hide loading spinner
    }
}

// Function to dynamically load repositories into the "Projects" section
function loadProjects(repositories) {
    const projectGallery = document.getElementById('project-gallery');
    
    repositories.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${repo.owner.avatar_url}" alt="${repo.name}">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank" class="highlight">View Project</a>
        `;
        projectGallery.appendChild(projectCard);
    });
}

// Display a message when no projects are found
function displayNoProjectsMessage() {
    const projectGallery = document.getElementById('project-gallery');
    projectGallery.innerHTML = '<p>No projects available at the moment.</p>';
}

// Display a general error message to the user
function displayErrorMessage(error) {
    const projectGallery = document.getElementById('project-gallery');
    projectGallery.innerHTML = `<p class="error-message">Oops! Something went wrong. Please try again later.</p>`;
    console.error(error);
}
