/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
var Transitionable = famous.transitions.Transitionable;
var SpringTransition = famous.transitions.SpringTransition;

Transitionable.registerMethod('spring', SpringTransition);

var spring = {
  method: 'spring',
  period: 400,
  dampingRatio: 0.3
};

var spring2 = {
  method: 'spring',
  period: 150,
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

var tapMe = new Surface({
  content: 'Tap the logo',
  size: [true, true],
  textAlign: 'center',
  properties: {
    fontFamily: 'Muli, sans-serif',
    fontSize: '30',
    color: '#787878'
  }
});

var centerModifier = new StateModifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5],
  transform: Transform.translate(0, 120, 0)
})

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform : function () {
        return Transform.rotateY(.002 * (Date.now() - initialTime));
    }
});

var stateModifier = new StateModifier();

mainContext.add(centerModifier).add(tapMe);
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
