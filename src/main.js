/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
var Transitionable = famous.transitions.Transitionable;
var SpringTransition = famous.transitions.SpringTransition;

Transitionable.registerMethod('spring', SpringTransition);

var spring = {
  method: 'spring',
  period: 300,
  dampingRatio: 0.3
};

var spring2 = {
  method: 'spring',
  period: 100,
  dampingRatio: 0.8
};

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
    size: [200, 200],
    content: 'http://www.getdeepapp.com/img/logo@2x.png',
    classes: ['double-sided']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform : function () {
        return Transform.rotateY(.002 * (Date.now() - initialTime));
    }
});

var stateModifier = new StateModifier();
var scaleModifier = new Modifier();

mainContext.add(centerSpinModifier).add(stateModifier).add(logo);

logo.on('click', function(){
  console.log('click');
  stateModifier.setTransform(
    Transform.scale(1.5, 1.5, 0),
    spring2
  );

  stateModifier.setTransform(
    Transform.scale(1, 1, 0),
    spring,
    function() {
      stateModifier.setTransform(Transform.identity);
    }
  );
});
