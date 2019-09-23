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

var _ = require('../../../utils/under-dash');

var utils = require('../../../utils/utils');

var BaseXform = require('../base-xform');

function assign(definedName, attributes, name, defaultValue) {
  var value = attributes[name];

  if (value !== undefined) {
    definedName[name] = value;
  } else if (defaultValue !== undefined) {
    definedName[name] = defaultValue;
  }
}

function parseBool(value) {
  switch (value) {
    case '1':
    case 'true':
      return true;

    default:
      return false;
  }
}

function assignBool(definedName, attributes, name, defaultValue) {
  var value = attributes[name];

  if (value !== undefined) {
    definedName[name] = parseBool(value);
  } else if (defaultValue !== undefined) {
    definedName[name] = defaultValue;
  }
}

var DataValidationsXform =
/*#__PURE__*/
function (_BaseXform) {
  _inherits(DataValidationsXform, _BaseXform);

  function DataValidationsXform() {
    _classCallCheck(this, DataValidationsXform);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataValidationsXform).apply(this, arguments));
  }

  _createClass(DataValidationsXform, [{
    key: "render",
    value: function render(xmlStream, model) {
      var count = model && Object.keys(model).length;

      if (count) {
        xmlStream.openNode('dataValidations', {
          count: count
        });

        _.each(model, function (value, address) {
          xmlStream.openNode('dataValidation');

          if (value.type !== 'any') {
            xmlStream.addAttribute('type', value.type);

            if (value.operator && value.type !== 'list' && value.operator !== 'between') {
              xmlStream.addAttribute('operator', value.operator);
            }

            if (value.allowBlank) {
              xmlStream.addAttribute('allowBlank', '1');
            }
          }

          if (value.showInputMessage) {
            xmlStream.addAttribute('showInputMessage', '1');
          }

          if (value.promptTitle) {
            xmlStream.addAttribute('promptTitle', value.promptTitle);
          }

          if (value.prompt) {
            xmlStream.addAttribute('prompt', value.prompt);
          }

          if (value.showErrorMessage) {
            xmlStream.addAttribute('showErrorMessage', '1');
          }

          if (value.errorStyle) {
            xmlStream.addAttribute('errorStyle', value.errorStyle);
          }

          if (value.errorTitle) {
            xmlStream.addAttribute('errorTitle', value.errorTitle);
          }

          if (value.error) {
            xmlStream.addAttribute('error', value.error);
          }

          xmlStream.addAttribute('sqref', address);
          (value.formulae || []).forEach(function (formula, index) {
            xmlStream.openNode("formula".concat(index + 1));

            if (value.type === 'date') {
              xmlStream.writeText(utils.dateToExcel(formula));
            } else {
              xmlStream.writeText(formula);
            }

            xmlStream.closeNode();
          });
          xmlStream.closeNode();
        });

        xmlStream.closeNode();
      }
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      switch (node.name) {
        case 'dataValidations':
          this.model = {};
          return true;

        case 'dataValidation':
          {
            this._address = node.attributes.sqref;
            var definedName = node.attributes.type ? {
              type: node.attributes.type,
              formulae: []
            } : {
              type: 'any'
            };

            if (node.attributes.type) {
              assignBool(definedName, node.attributes, 'allowBlank');
            }

            assignBool(definedName, node.attributes, 'showInputMessage');
            assignBool(definedName, node.attributes, 'showErrorMessage');

            switch (definedName.type) {
              case 'any':
              case 'list':
              case 'custom':
                break;

              default:
                assign(definedName, node.attributes, 'operator', 'between');
                break;
            }

            assign(definedName, node.attributes, 'promptTitle');
            assign(definedName, node.attributes, 'prompt');
            assign(definedName, node.attributes, 'errorStyle');
            assign(definedName, node.attributes, 'errorTitle');
            assign(definedName, node.attributes, 'error');
            this._definedName = definedName;
            return true;
          }

        case 'formula1':
        case 'formula2':
          this._formula = [];
          return true;

        default:
          return false;
      }
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      this._formula.push(text);
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      switch (name) {
        case 'dataValidations':
          return false;

        case 'dataValidation':
          if (!this._definedName.formulae || !this._definedName.formulae.length) {
            delete this._definedName.formulae;
            delete this._definedName.operator;
          }

          this.model[this._address] = this._definedName;
          return true;

        case 'formula1':
        case 'formula2':
          {
            var formula = this._formula.join('');

            switch (this._definedName.type) {
              case 'whole':
              case 'textLength':
                formula = parseInt(formula, 10);
                break;

              case 'decimal':
                formula = parseFloat(formula);
                break;

              case 'date':
                formula = utils.excelToDate(parseFloat(formula));
                break;

              default:
                break;
            }

            this._definedName.formulae.push(formula);

            return true;
          }

        default:
          return true;
      }
    }
  }, {
    key: "tag",
    get: function get() {
      return 'dataValidations';
    }
  }]);

  return DataValidationsXform;
}(BaseXform);

module.exports = DataValidationsXform;
//# sourceMappingURL=data-validations-xform.js.map
