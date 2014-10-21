/*!
 * AngularJS Round Progress Directive
 *
 * Copyright 2013 Stephane Begaudeau
 * Released under the MIT license
 */
angular.module('angular.directives-round-progress', []).directive('angRoundProgress', [function () {
  var compilationFunction = function (templateElement, templateAttributes, transclude) {
    if (templateElement.length === 1) {
      var node = templateElement[0];

      var width = node.getAttribute('data-round-progress-width') || '200';
      var height = node.getAttribute('data-round-progress-height') || '200';

      var canvas = document.createElement('canvas');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.setAttribute('data-round-progress-model', node.getAttribute('data-round-progress-model'));

      node.parentNode.replaceChild(canvas, node);

      var outerCircleWidth = node.getAttribute('data-round-progress-outer-circle-width') || '20';
      var innerCircleWidth = node.getAttribute('data-round-progress-inner-circle-width') || '5';

      var outerCircleBackgroundColor = node.getAttribute('data-round-progress-outer-circle-background-color') || '#A9A9A9';
      var outerCircleForegroundColor = node.getAttribute('data-round-progress-outer-circle-foreground-color') || '#56B556';
      var innerCircleColor = node.getAttribute('data-round-progress-inner-circle-color') || '#FFFFFF';
      var labelColor = node.getAttribute('data-round-progress-label-color') || '#56B556';

      var outerCircleRadius = node.getAttribute('data-round-progress-outer-circle-radius') || '85';
      var innerCircleRadius = node.getAttribute('data-round-progress-inner-circle-radius') || '60';

      var labelFont = node.getAttribute('data-round-progress-label-font') || '40pt Helvetica Neue,Helvetica,Arial,sans-serif';

      return {
        pre: function preLink(scope, instanceElement, instanceAttributes, controller) {
          var expression = canvas.getAttribute('data-round-progress-model');
          scope.$watch(expression, function (newValue, oldValue) {
            // Create the content of the canvas
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);

            // The "background" circle
            var x = width / 2;
            var y = height / 2;
            ctx.beginPath();
            ctx.arc(x, y, parseInt(outerCircleRadius), Math.PI, Math.PI * 2, false);
            ctx.lineWidth = parseInt(outerCircleWidth);
            ctx.strokeStyle = outerCircleBackgroundColor;
            ctx.stroke();

            // The inner circle
            ctx.beginPath();
            ctx.arc(x, y, parseInt(innerCircleRadius), 0, Math.PI * 2, false);
            ctx.lineWidth = parseInt(innerCircleWidth);
            ctx.strokeStyle = innerCircleColor;
            ctx.stroke();

            // The inner number
            ctx.font = labelFont;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = labelColor;
            ctx.fillText(newValue.label, x, y);

            // The "foreground" circle
            var startAngle = - (Math.PI);
            var endAngle = ((Math.PI) * newValue.percentage) - (Math.PI);
            var anticlockwise = false;
            ctx.beginPath();
            ctx.arc(x, y, parseInt(outerCircleRadius), startAngle, endAngle, anticlockwise);
            ctx.lineWidth = parseInt(outerCircleWidth);
            ctx.strokeStyle = outerCircleForegroundColor;
            ctx.stroke();
          }, true);
        },
        post: function postLink(scope, instanceElement, instanceAttributes, controller) {}
      };
    }
  };

  var roundProgress = {
    compile: compilationFunction,
    replace: true
  };
  return roundProgress;
}]);
