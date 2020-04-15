const fs = require("fs");

function mergeValues(values, content) {
  // Cycle over the keys
  // Replace all {{key}} with the value from the values object
  Object.keys(values).forEach((key) => {
    content = content.replace(`{{${key}}}`, values[key]);
  });
  return content;
}

function view(templateName, values, response) {
  // Read from the template file
  var fileContents = fs.readFileSync(`./views/${templateName}.html`, {
    encoding: "utf8",
  });

  // Insert values into the content
  fileContents = mergeValues(values, fileContents);

  // Write out to the response
  response.write(fileContents);
}

module.exports.view = view;
