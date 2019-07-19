# load-my-modules

Load modules for an App object.

```
config = {apple: "banana"};
var folder = "module";
var app = {};
var modulesLoader = require("load-my-modules")();
modulesLoader.load(app, folder, config);
console.log(app.module);
```

Example usage:
```
app.module.design.load();
```