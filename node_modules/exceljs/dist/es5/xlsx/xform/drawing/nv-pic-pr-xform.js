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

var BaseXform = require('../base-xform');

var StaticXform = require('../static-xform');

var NvPicPrXform =
/*#__PURE__*/
function (_BaseXform) {
  _inherits(NvPicPrXform, _BaseXform);

  function NvPicPrXform() {
    _classCallCheck(this, NvPicPrXform);

    return _possibleConstructorReturn(this, _getPrototypeOf(NvPicPrXform).apply(this, arguments));
  }

  _createClass(NvPicPrXform, [{
    key: "render",
    value: function render(xmlStream, model) {
      var xform = new StaticXform({
        tag: this.tag,
        c: [{
          tag: 'xdr:cNvPr',
          $: {
            id: model.index,
            name: "Picture ".concat(model.index)
          },
          c: [{
            tag: 'a:extLst',
            c: [{
              tag: 'a:ext',
              $: {
                uri: '{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}'
              },
              c: [{
                tag: 'a16:creationId',
                $: {
                  'xmlns:a16': 'http://schemas.microsoft.com/office/drawing/2014/main',
                  id: '{00000000-0008-0000-0000-000002000000}'
                }
              }]
            }]
          }]
        }, {
          tag: 'xdr:cNvPicPr',
          c: [{
            tag: 'a:picLocks',
            $: {
              noChangeAspect: '1'
            }
          }]
        }]
      });
      xform.render(xmlStream);
    }
  }, {
    key: "tag",
    get: function get() {
      return 'xdr:nvPicPr';
    }
  }]);

  return NvPicPrXform;
}(BaseXform);

module.exports = NvPicPrXform;
//# sourceMappingURL=nv-pic-pr-xform.js.map
