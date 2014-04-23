module.exports = [
function(exports) {
var a = 1; 

exports.vm = {
    a: function() {
        a++;
    }
}
exports.style = "\n.name {\n        color: red;\n    }"
exports.view = "<div class=\"name\">\n    hello\n</div>"
exports.path = "index"
},
function(exports) {
exports.view = "<div>\n    hello world\n</div>"
exports.path = "shop/header"
}]