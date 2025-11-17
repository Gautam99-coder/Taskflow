// ========================================
// IMPORTS
// ========================================
const express = require('express');
const cors = require('cors');

// ========================================
// APP SETUP
// ========================================
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data

// ========================================
// IN-MEMORY DATABASE (temporary)
// ========================================
let projects = [
    {
        id: 1,
        name: "E-commerce Website",
        client: "TechStore Inc",
        hoursWorked: 45,
        hourlyRate: 50,
        status: "active",
        description: "Building a modern online store",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Logo Design",
        client: "StartupXYZ",
        hoursWorked: 8,
        hourlyRate: 60,
        status: "completed",
        description: "Brand identity design",
        createdAt: new Date().toISOString()
    }
];

let nextId = 3; // For generating new IDs

// ========================================
// API ROUTES
// ========================================

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: '🚀 TaskFlow API is running!',
        endpoints: {
            'GET /api/projects': 'Get all projects',
            'GET /api/projects/:id': 'Get one project',
            'POST /api/projects': 'Create new project',
            'PUT /api/projects/:id': 'Update project',
            'DELETE /api/projects/:id': 'Delete project'
        }
    });
});

// GET all projects
app.get('/api/projects', (req, res) => {
    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
});

// GET single project by ID
app.get('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        return res.status(404).json({
            success: false,
            error: 'Project not found'
        });
    }
    
    res.json({
        success: true,
        data: project
    });
});

// POST - Create new project
app.post('/api/projects', (req, res) => {
    const { name, client, hourlyRate, hoursWorked, status, description } = req.body;
    
    // Validation
    if (!name || !client) {
        return res.status(400).json({
            success: false,
            error: 'Please provide name and client'
        });
    }
    
    // Create new project
    const newProject = {
        id: nextId++,
        name,
        client,
        hourlyRate: hourlyRate || 50,
        hoursWorked: hoursWorked || 0,
        status: status || 'active',
        description: description || '',
        createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    
    res.status(201).json({
        success: true,
        data: newProject
    });
});

// PUT - Update project
app.put('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Project not found'
        });
    }
    
    // Update project
    projects[projectIndex] = {
        ...projects[projectIndex],
        ...req.body,
        id: projectId, // Keep original ID
        updatedAt: new Date().toISOString()
    };
    
    res.json({
        success: true,
        data: projects[projectIndex]
    });
});

// DELETE project
app.delete('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Project not found'
        });
    }
    
    const deletedProject = projects.splice(projectIndex, 1)[0];
    
    res.json({
        success: true,
        data: deletedProject
    });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log(`
    ========================================
    🚀 Server running on http://localhost:${PORT}
    📡 API ready at http://localhost:${PORT}/api/projects
    ========================================
    `);
});