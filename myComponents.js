AFRAME.registerComponent('update-raycaster', {
  schema: {
    type: 'selector'
  },
  init: function () {
    var raycasterEl = this.data;
    this.data.components.raycaster.refreshObjects();
  }
});

AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },
  init: function () {
      var data = this.data;
        var el = this.el;
        this.setupFadeAnimation();
        el.addEventListener(data.on, function () {
        // Fade out image.
        data.target.emit('set-image-fade');
        // Wait for fade to complete.
        setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);
        }, data.dur);
    });
    },
    setupFadeAnimation: function () {
        // Appends an <a-animation> that fades to black.
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
    }
});