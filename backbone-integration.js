// R.Class <-> Backbone integration

var R = (function (my) {
  var wrapBackboneClass = function(className) {
    var backboneWrapped = Backbone[className],
        F = function() {},
        K = function() {};
    F.prototype = backboneWrapped.prototype;
    K.prototype = new F();
    _.extend(K, R.Class, {constructor: backboneWrapped});
    _.extend(K.prototype, R.Class.prototype);
    K.prototype.init = function() {
      return backboneWrapped.apply(this, arguments);
    };
    return K;
  };

  my.Model = wrapBackboneClass('Model');
  my.View = wrapBackboneClass('View');
  my.Collection = wrapBackboneClass('Collection');
  my.Router = wrapBackboneClass('Router');

  /* Extending a Model inherits his defaults: */
  var extFn = my.Model.extend;
  my.Model.extend = function(options) {
    var super_defaults = this.prototype.defaults;
    if (super_defaults && options.defaults) {
      options.defaults = _.extend({}, super_defaults, options.defaults);
    }
    return extFn.call(this, options);
  };

  return my;
}(R || {}));
