const Profile = require("./profile.js");
const renderer = require("./renderer.js");

var commonHeaders = { "Content-type": "text/html" };
var queryString = require("querystring");

// Handle HTTP route GET / and POST / i.e. Home
function home(req, res) {
  // if url === "/" && GET
  // show search
  if (req.url === "/" && req.method === "GET") {
    // res.statusCode = 200;
    res.writeHead(200, commonHeaders);
    renderer.view("header", {}, res);
    renderer.view("search", {}, res);
    renderer.view("footer", {}, res);
    res.end();
  }

  // if url === "/" && POST
  if (req.url === "/" && req.method === "POST") {
    // get the post body
    req.on("data", function (postBody) {
      // get the username
      var query = queryString.parse(postBody.toString());
      res.writeHead(303, { Location: "/" + query.username });
      res.end();
    });
    // redirect to /:username
  }
}

// Handle HTTP route GET /:username i.e. /timoltman
function user(req, res) {
  // if url === "/..."
  var username = req.url.replace("/", "");
  if (username.length > 0) {
    res.writeHead(200, commonHeaders);
    renderer.view("header", {}, res);

    // get json from treehouse
    var studentProfile = new Profile(username);

    // on "end"
    studentProfile.on("end", function (profileJSON) {
      // show profile

      // Store the values that we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript,
      };
      // Simple response
      renderer.view("profile", values, res);
      renderer.view("footer", {}, res);
      res.end();
    });

    // on "error"
    studentProfile.on("error", function (error) {
      // show error
      renderer.view("error", { errorMessage: error.message }, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
