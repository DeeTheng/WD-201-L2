const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let regContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, reg) => {
  if (err) {
      throw err;
  }
  regContent = reg;
});

let args = require("minimist")(process.argv.slice(2));
if(args["port"]) {
  console.log("server listening on port: " + args["port"]);
} else {
  console.log("server listening on default port: 8080");
}

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(regContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args["port"] ? args["port"] : 8080);