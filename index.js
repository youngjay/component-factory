var mixin = require('mixin-class');

module.exports = function(factories) {
    var Classes = {};

    factories.forEach(function(factory) {
        var exports = {};
        factory(exports);
        if (Classes[exports.path]) {
            throw new Error('duplicated component for path: "' + exports.path + '"');
        }
        Classes[exports.path] = mixin(exports.vm, {
            __view: exports.view
        })
        // TODO
        // insert style to document
    });

    return function(path) {
        if (!Classes[path]) {
            throw new Error('component with path: "' + path +  '" not exists');
        }
        return Classes[path];
    }
};
