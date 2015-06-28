"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function timerStop() {
  this.timer.stop = new Date();
  this.timer.duration = (this.timer.stop - this.timer.start) / 1000;
}

exports["default"] = timerStop;
module.exports = exports["default"];