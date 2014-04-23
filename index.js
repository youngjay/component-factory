var mixin = require('mixin-class');
var _ = require('lodash');

module.exports = function(factories) {
    var Classes = {};

    factories.forEach(function(factory) {
        var exports = {};
        factory(exports);
        if (Classes[exports.path]) {
            throw new Error('duplicated component with path: "' + exports.path + '"');
        }
        Classes[exports.path] = mixin(exports.vm, {
            __view: exports.view,
            __path: exports.path
        })
        // TODO
        // insert style to document
    });

    var getClass = function(path) {
        if (!Classes[path]) {
            throw new Error('component with path: "' + path +  '" not exists');
        }
        return Classes[path];
    };

    var getInstance = function(config) {
        var instance = getClass(config.type)();
        if (config.data) {
            if (instance.setData) {
                instance.setData(config.data);
            }
        }

        if (config.mixin) {
            _.extend(instance, config.mixin);
        }

        if (config.route) {
            instance.__route = config.route;
        }

        if (config.component) {
            _.forEach(config.component, function(subConfig, key) {
                instance[key] = getInstanceOrs(subConfig);
            })
        }

        return instance;
    };

    var getInstances = function(configs) {
        return configs.map(getInstance);
    };

    var getInstanceOrs = function(config) {
        if (Array.isArray(config)) {
            return getInstances(config);
        }

        return getInstance(config);
    };

    return function(pathOrConfig) {
        if (typeof pathOrConfig === 'string') {
            return getClass(pathOrConfig);
        }
        return getInstanceOrs(pathOrConfig);
    }
};
