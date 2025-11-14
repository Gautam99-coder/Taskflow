// Sample project data (later we'll get this from database)
const sampleProjects = [
    {
        id: 1,
        name: "E-commerce Website",
        client: "TechStore Inc",
        hoursWorked: 45,
        hourlyRate: 50,
        status: "active",
        deadline: "2024-08-15"
    },
    {
        id: 2,
        name: "Logo Design",
        client: "StartupXYZ",
        hoursWorked: 8,
        hourlyRate: 60,
        status: "completed",
        deadline: "2024-06-30"
    },
    {
        id: 3,
        name: "Mobile App Development",
        client: "FinanceHub",
        hoursWorked: 120,
        hourlyRate: 75,
        status: "active",
        deadline: "2024-12-01"
    }
];

// Function to create a project card
function createProjectCard(project) {
    const totalEarned = project.hoursWorked * project.hourlyRate;
    
    return `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p><strong>Client:</strong> ${project.client}</p>
            <p><strong>Hours Worked:</strong> ${project.hoursWorked}h</p>
            <p><strong>Rate:</strong> $${project.hourlyRate}/hr</p>
            <p><strong>Deadline: </strong>${project.deadline}</p>
            <p><strong>Total Earned:</strong> $${totalEarned}</p>
            <span class="status-badge status-${project.status}">
                ${project.status.toUpperCase()}
            </span>
        </div>
    `;
}

// Function to display all projects
function displayProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = sampleProjects.map(project => 
        createProjectCard(project)
    ).join('');
}

// Button click events
document.getElementById('getStartedBtn').addEventListener('click', function() {
    alert('🎉 Welcome to TaskFlow! Let\'s manage your projects.');
    // Scroll to projects section
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('addProjectBtn').addEventListener('click', function() {
    const projectName = prompt('Enter project name:');
    const clientName = prompt('Enter client name:');
    
    if (projectName && clientName) {
        const newProject = {
            id: sampleProjects.length + 1,
            name: projectName,
            client: clientName,
            hoursWorked: 0,
            hourlyRate: 50,
            status: 'active'
        };
        
        sampleProjects.push(newProject);
        displayProjects();
        alert('✅ Project added successfully!');
    }
});

// Load projects when page loads
displayProjects();