// httpMockBackend.js

// Define some initial variables.
var applicationRoot = __dirname.replace(/\\/g,"/"),
  ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  port = process.env.OPENSHIFT_NODEJS_PORT || 5001;
  mockRoot = applicationRoot + '/test/mocks/api',
  mockFilePattern = '.json',
  mockRootPattern = mockRoot + '/**/*' + mockFilePattern,
  apiRoot = '/api',
  fs = require("fs"),
  glob = require("glob");
// Create Express application
var express = require("express");
var app = express();
// Read the directory tree according to the pattern specified above.
var files = glob.sync(mockRootPattern);
// Register mappings for each file found in the directory tree.
if(files && files.length > 0) {
  files.forEach(function(filePath) {
    var mapping = apiRoot + filePath.replace(mockRoot, '').replace(mockFilePattern,'')
      , fileName = filePath.replace(/^.*[\\\/]/, '');
    // set CORS headers so this can be used with local AJAX
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    // any HTTP verbs you might need
    [/^GET/, /^POST/, /^PUT/, /^PATCH/, /^DELETE/].forEach(
      function(httpVerbRegex) {
        // perform the initial regex of the HTTP verb against the filename
        var match = fileName.match(httpVerbRegex);
        if (match != null) {
          // remove the HTTP verb prefix from the filename
          mapping = mapping.replace(match[0]+"_", "");
          // create the endpoint
          app[match[0].toLowerCase()](mapping, function (req, res) {
            // handle the request by responding with the JSON contents of the file
            var data =  fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
            res.end();
          });
        }
      }
    );
    console.log('Registered mapping: %s -> %s', mapping, filePath);
  })
} else {
    console.log('No mappings found! Please check the configuration.');
}
// Start the API mock server.
console.log('Application root directory: [' + applicationRoot +']');
console.log('Mock Api Server listening: [http://' + ipaddress + ':' + port + ']');
app.listen(port, ipaddress);