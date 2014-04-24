var ComponentFactory = require('../');
var assert = require('assert');
var factories = require('./_factories');

describe('component factory', function() {


    it('should throw Error when duplicated path are provide', function() {
        assert.throws(function() {
            var componentFactory = ComponentFactory(factories.concat(factories));
        }, Error)
    })

    it('should throw error when component is not provide', function() {
        var componentFactory = ComponentFactory(factories);        
        assert.throws(function() {
            componentFactory('not-exists-path');
        }, Error)
    });

    it('should return mixined component with __view', function() {
        var componentFactory = ComponentFactory(factories);
        var c = new (componentFactory('index'))();

        assert.equal(c.__view, "<div class=\"name\">\n    hello\n</div>")

    })
});
