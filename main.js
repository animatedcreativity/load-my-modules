exports = module.exports = function() {
  var fs = require("fs");
  var path = require("path");
  var started = {};
  var mod = {
    load: function(app, moduleConfig, folder) {
      if (typeof folder === "undefined") folder = "module";
      if (typeof moduleConfig === "undefined") moduleConfig = {};
      if (fs.existsSync(folder) === true) {
        var files = fs.readdirSync(folder + "/");
        for (var i=0; i<=files.length-1; i++) {
          var fileName = files[i];
          var file = folder + "/" + fileName;
          if (typeof app.module === "undefined") app.module = {};
          app.module[fileName.split(".").shift()] = require(path.resolve(file))(app, moduleConfig);
        }
        for (var key in app.module) {
          var module = app.module[key];
          if (typeof module["start"] === "function" && started[key] !== true) {
            started[key] = true;
            module["start"]();
          }
        }
      } else {
        console.log("No module folder: " + folder);
      }
    }
  };
  return mod;
};