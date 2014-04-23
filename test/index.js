var ComponentFactory = require('../');
var assert = require('assert');
var factories = require('./_factories');

describe('component factory', function() {


    it('should throw Error when duplicated path are provide', function() {
        assert.throws(function() {
            var Component = ComponentFactory(factories.concat(factories));
        }, Error)
    })

    it('should throw error when component is not provide', function() {
        var Component = ComponentFactory(factories);        
        assert.throws(function() {
            Component('not-exists-path');
        }, Error)
    });

    it('should return mixined component with __view', function() {
        var Component = ComponentFactory(factories);
        var c = Component('index')();

        assert.equal(c.__view, "<div class=\"name\">\n    hello\n</div>")

    })
});

describe('component create instance', function() {
    var Component = ComponentFactory(factories);

    it('should create instance', function() {
        var c = Component({
            type: 'index',
            mixin: {
                a: 1
            },
            component: {
                one: {
                    type: 'index'
                },
                two: [{type:'index'},{type:'shop/header'}]
            }
        });

        assert.equal(c.__path, 'index')
        assert.equal(c.a, 1)
        assert.equal(c.one.__path, 'index')
        assert.equal(c.two.length, 2)
        assert.equal(c.two[0].__path, 'index')
        assert.equal(c.two[1].__path, 'shop/header')
    })

})