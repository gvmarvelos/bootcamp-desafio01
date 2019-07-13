const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let totalRequests = 0;

function verifyProjectIDExist(req, res, next) {
  const { id } = req.params;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      return next();
    }
  }
  return res.status(400).json({
    error: "O projeto não existe!"
  });
}

function countAllRequests(req, res, next) {
  totalRequests = totalRequests + 1;
  console.log(totalRequests);

  return next();
}

server.post("/projects", countAllRequests, (req, res) => {
  const { project } = req.body;
  projects.push(project);
  return res.json(projects);
});

server.get("/projects", countAllRequests, (req, res) => {
  return res.json(projects);
});

server.put(
  "/projects/:id",
  countAllRequests,
  verifyProjectIDExist,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects[i].title = title;
        return res.json(projects);
      }
    }
  }
);

server.delete(
  "/projects/:id",
  countAllRequests,
  verifyProjectIDExist,
  (req, res) => {
    const { id } = req.params;

    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects.splice(i);
        return res.json(projects);
      }
    }
  }
);

server.post(
  "/projects/:id/tasks",
  countAllRequests,
  verifyProjectIDExist,
  (res, req) => {
    const { id } = req.params;
    const { tasks } = req.body;

    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects[i].tasks.push(tasks);
        return res.json(projects);
      }
    }
  }
);

server.listen(3000);
