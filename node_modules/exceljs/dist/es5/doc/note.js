"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Note =
/*#__PURE__*/
function () {
  function Note(note) {
    _classCallCheck(this, Note);

    if (typeof note === 'string') {
      this.note = {
        texts: [{
          text: note
        }]
      };
    } else {
      this.note = note;
    }
  }

  _createClass(Note, [{
    key: "model",
    get: function get() {
      return {
        type: 'note',
        note: this.note
      };
    },
    set: function set(value) {
      this.note = value.note;
    }
  }]);

  return Note;
}();

module.exports = Note;
//# sourceMappingURL=note.js.map
