const express = require('express');

const server = express();

server.use(express.json());

const projects = [
    {
        id : "1",
        title : "Projeto 1",
        tasks : [
            "desenvolver api",
            "desenvolver app",
            "desenvolver web app"
        ]
    },
    {
        id : "2",
        title : "Projeto 2",
        tasks : [
            "desenvolver api",
            "desenvolver app",
            "desenvolver web app"
        ]
    }
];

function checkProjectExists (req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if(!project){
        return res.status(400).json({ error : "Project does not exists" });
    }

    next();
}

server.get('/projects', (req, res) => {
    return res.json({projects});
});

server.post('/projects', (req, res) => {
    const { project } = req.body;

    projects.push(project);

    return res.send(201);
});
 
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const index = projects.findIndex(p => p.id == id);

    projects[index].tasks.push(title);

    res.json({ project : projects[index] });
})

server.put('/projects/:id', checkProjectExists, (req,res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(x => x.id == id);

    project.title = title;

    return res.json({projects});
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send(200);
});

server.listen(3000);