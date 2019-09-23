"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaseXform = require('./base-xform');

var CompositeXform =
/*#__PURE__*/
function (_BaseXform) {
  _inherits(CompositeXform, _BaseXform);

  function CompositeXform(options) {
    var _this;

    _classCallCheck(this, CompositeXform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CompositeXform).call(this));
    _this.tag = options.tag;
    _this.attrs = options.attrs;
    _this.children = options.children;
    _this.map = _this.children.reduce(function (map, child) {
      var name = child.name || child.tag;
      var tag = child.tag || child.name;
      map[tag] = child;
      child.name = name;
      child.tag = tag;
      return map;
    }, {});
    return _this;
  }

  _createClass(CompositeXform, [{
    key: "prepare",
    value: function prepare(model, options) {
      this.children.forEach(function (child) {
        child.xform.prepare(model[child.tag], options);
      });
    }
  }, {
    key: "render",
    value: function render(xmlStream, model) {
      xmlStream.openNode(this.tag, this.attrs);
      this.children.forEach(function (child) {
        child.xform.render(xmlStream, model[child.name]);
      });
      xmlStream.closeNode();
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      if (this.parser) {
        this.parser.xform.parseOpen(node);
        return true;
      }

      switch (node.name) {
        case this.tag:
          this.model = {};
          return true;

        default:
          this.parser = this.map[node.name];

          if (this.parser) {
            this.parser.xform.parseOpen(node);
            return true;
          }

      }

      return false;
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      if (this.parser) {
        this.parser.xform.parseText(text);
      }
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      if (this.parser) {
        if (!this.parser.xform.parseClose(name)) {
          this.model[this.parser.name] = this.parser.xform.model;
          this.parser = undefined;
        }

        return true;
      }

      return false;
    }
  }, {
    key: "reconcile",
    value: function reconcile(model, options) {
      this.children.forEach(function (child) {
        child.xform.prepare(model[child.tag], options);
      });
    }
  }]);

  return CompositeXform;
}(BaseXform);

module.exports = CompositeXform;
//# sourceMappingURL=composite-xform.js.map
