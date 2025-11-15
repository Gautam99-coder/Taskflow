// ========================================
// DATA MANAGEMENT
// ========================================

// Get projects from Local Storage or use sample data
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        name: "E-commerce Website",
        client: "TechStore Inc",
        hoursWorked: 45,
        hourlyRate: 50,
        status: "active",
        description: "Building a modern online store with shopping cart"
    },
    {
        id: 2,
        name: "Logo Design",
        client: "StartupXYZ",
        hoursWorked: 8,
        hourlyRate: 60,
        status: "completed",
        description: "Created brand identity and logo variations"
    },
    {
        id: 3,
        name: "Mobile App Development",
        client: "FinanceHub",
        hoursWorked: 120,
        hourlyRate: 75,
        status: "active",
        description: "iOS and Android app for expense tracking"
    }
];

// Save projects to Local Storage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// ========================================
// UI FUNCTIONS
// ========================================

// Create a project card (improved version)
function createProjectCard(project) {
    const totalEarned = project.hoursWorked * project.hourlyRate;
    
    return `
        <div class="project-card" data-id="${project.id}">
            <h3>${project.name}</h3>
            <p><strong>Client:</strong> ${project.client}</p>
            <p><strong>Hours Worked:</strong> ${project.hoursWorked}h</p>
            <p><strong>Rate:</strong> $${project.hourlyRate}/hr</p>
            <p><strong>Total Earned:</strong> $${totalEarned.toLocaleString()}</p>
            ${project.description ? `<p class="description">${project.description}</p>` : ''}
            <span class="status-badge status-${project.status}">
                ${project.status.toUpperCase().replace('-', ' ')}
            </span>
            <div class="card-actions">
                <button class="btn-edit" onclick="editProject(${project.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteProject(${project.id})">🗑️ Delete</button>
            </div>
        </div>
    `;
}

// Display all projects
function displayProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <p style="text-align: center; color: #999; grid-column: 1/-1;">
                No projects yet. Click "Add New Project" to get started! 🚀
            </p>
        `;
        return;
    }
    
    projectsGrid.innerHTML = projects
        .map(project => createProjectCard(project))
        .join('');
}

// Update stats
function updateStats() {
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalClients = new Set(projects.map(p => p.client)).size;
    const monthlyEarnings = projects.reduce((total, p) => total + (p.hoursWorked * p.hourlyRate), 0);
    
    // Update the stats cards (we'll make these dynamic later)
    console.log('Stats:', { activeProjects, totalClients, monthlyEarnings });
}

// ========================================
// MODAL FUNCTIONS
// ========================================

const modal = document.getElementById('projectModal');
const addProjectBtn = document.getElementById('addProjectBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const projectForm = document.getElementById('projectForm');

// Open modal
function openModal() {
    modal.classList.add('active');
    projectForm.reset(); // Clear form
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
}

// Event listeners for modal
addProjectBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// ========================================
// FORM SUBMISSION
// ========================================

projectForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    
    // Get form data
    const formData = new FormData(projectForm);
    
    // Create new project object
    const newProject = {
        id: Date.now(), // Simple unique ID
        name: formData.get('projectName'),
        client: formData.get('clientName'),
        hourlyRate: parseFloat(formData.get('hourlyRate')),
        hoursWorked: parseFloat(formData.get('hoursWorked')),
        status: formData.get('status'),
        description: formData.get('description')
    };
    
    // Add to projects array
    projects.push(newProject);
    
    // Save to Local Storage
    saveProjects();
    
    // Update UI
    displayProjects();
    updateStats();
    
    // Close modal
    closeModal();
    
    // Show success message
    showNotification('✅ Project added successfully!');
});

// ========================================
// CRUD OPERATIONS
// ========================================

// Delete project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(project => project.id !== id);
        saveProjects();
        displayProjects();
        updateStats();
        showNotification('🗑️ Project deleted');
    }
}

// Edit project (we'll implement this properly tomorrow)
function editProject(id) {
    const project = projects.find(p => p.id === id);
    alert(`Edit feature coming tomorrow! Project: ${project.name}`);
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// OTHER EVENT LISTENERS
// ========================================

document.getElementById('getStartedBtn').addEventListener('click', function() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

// ========================================
// INITIALIZE APP
// ========================================

displayProjects();
updateStats();