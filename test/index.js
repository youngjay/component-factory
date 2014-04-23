var ComponentFactory = require('../');
var assert = require('assert');

describe('component factory', function() {
    it('can return component', function() {
        var Component = ComponentFactory([]);

        assert.throws(function() {
            Component('a');
        }, Error)
        
    })
});