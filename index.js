const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function verifyProjectIDExist() {}

function countAllRequests() {}

server.post(
  "/projects",
  verifyProjectIDExist,
  countAllRequests,
  (req, res) => {}
);

server.get("/projects", countAllRequests, (req, res) => {
  return res.json(projects);
});

server.put(
  "/projects/:id",
  countAllRequests,
  verifyProjectIDExist,
  (req, res) => {}
);

server.delete(
  "/projects/:id",
  countAllRequests,
  verifyProjectIDExist,
  (req, res) => {}
);

server.post(
  "/projects/:id/tasks",
  countAllRequests,
  verifyProjectIDExist,
  (res, req) => {}
);
