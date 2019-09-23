"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sax = require('sax');

var XmlStream = require('../../utils/xml-stream');
/* 'virtual' methods used as a form of documentation */

/* eslint-disable class-methods-use-this */
// Base class for Xforms


var BaseXform =
/*#__PURE__*/
function () {
  function BaseXform() {
    _classCallCheck(this, BaseXform);
  }

  _createClass(BaseXform, [{
    key: "prepare",
    // constructor(/* model, name */) {}
    // ============================================================
    // Virtual Interface
    value: function prepare()
    /* model, options */
    {// optional preparation (mutation) of model so it is ready for write
    }
  }, {
    key: "render",
    value: function render()
    /* xmlStream, model */
    {// convert model to xml
    }
  }, {
    key: "parseOpen",
    value: function parseOpen()
    /* node */
    {// Sax Open Node event
    }
  }, {
    key: "parseText",
    value: function parseText()
    /* node */
    {// Sax Text event
    }
  }, {
    key: "parseClose",
    value: function parseClose()
    /* name */
    {// Sax Close Node event
    }
  }, {
    key: "reconcile",
    value: function reconcile()
    /* model, options */
    {} // optional post-parse step (opposite to prepare)
    // ============================================================

  }, {
    key: "reset",
    value: function reset() {
      // to make sure parses don't bleed to next iteration
      this.model = null; // if we have a map - reset them too

      if (this.map) {
        var keys = Object.keys(this.map);

        for (var i = 0; i < keys.length; i++) {
          this.map[keys[i]].reset();
        }
      }
    }
  }, {
    key: "mergeModel",
    value: function mergeModel(obj) {
      // set obj's props to this.model
      this.model = Object.assign(this.model || {}, obj);
    }
  }, {
    key: "parse",
    value: function parse(parser, stream) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var abort = function abort(error) {
          // Abandon ship! Prevent the parser from consuming any more resources
          parser.removeAllListeners();
          parser.on('error', function () {}); // Ignore any parse errors from the chunk being processed

          stream.unpipe(parser);
          reject(error);
        };

        parser.on('opentag', function (node) {
          try {
            _this.parseOpen(node);
          } catch (error) {
            abort(error);
          }
        });
        parser.on('text', function (text) {
          try {
            _this.parseText(text);
          } catch (error) {
            abort(error);
          }
        });
        parser.on('closetag', function (name) {
          try {
            if (!_this.parseClose(name)) {
              resolve(_this.model);
            }
          } catch (error) {
            abort(error);
          }
        });
        parser.on('end', function () {
          resolve(_this.model);
        });
        parser.on('error', function (error) {
          abort(error);
        });
      });
    }
  }, {
    key: "parseStream",
    value: function parseStream(stream) {
      var parser = Sax.createStream(true, {});
      var promise = this.parse(parser, stream);
      stream.pipe(parser);
      return promise;
    }
  }, {
    key: "toXml",
    value: function toXml(model) {
      var xmlStream = new XmlStream();
      this.render(xmlStream, model);
      return xmlStream.xml;
    }
  }, {
    key: "xml",
    get: function get() {
      // convenience function to get the xml of this.model
      // useful for manager types that are built during the prepare phase
      return this.toXml(this.model);
    }
  }]);

  return BaseXform;
}();

module.exports = BaseXform;
//# sourceMappingURL=base-xform.js.map
