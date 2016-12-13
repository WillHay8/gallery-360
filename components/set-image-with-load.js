/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
function addLoadingPanel() {
  console.log("adding loading panel");
}

function removeLoadingPanel() {
  console.log("removing loading panel");
}

function addChangeImageListener(data, el) {
  el.addEventListener(data.on, function () {
    // Fade out image.
    data.target.emit('set-image-fade-down');
    //load next image
    addImg(data.src);
    // Wait for fade to complete.
    setTimeout(function () {
      // Set image.
      $img = $(data.src);

      function setImage(src) {
        removeLoadingPanel();
        data.target.setAttribute('material', 'src', src);
        console.log("image set");
      }

      if ($img.attr('loaded')) {
        console.log("image already loaded, setting texture");
        setImage(data.src);
      }
      else {
        addLoadingPanel();
        $(data.src).on('load', function () {
          console.log("img now loaded, setting texture");
          setImage(data.src);
        });
      }

    }, data.dur);
  });
}
function setupFadeAnimation(data, el) {
  console.log("setupFadeAnimation");
  var data = data;
  var targetEl = data.target;

  // Only set up once.
  if (targetEl.dataset.setImageFadeSetup) { return; }
  targetEl.dataset.setImageFadeSetup = true;

  // Create animation.
  targetEl.setAttribute('animation__fade', {
    property: 'material.color',
    startEvents: 'set-image-fade-down',
    dir: 'alternate',
    dur: data.dur,
    from: '#FFF',
    to: '#000'
  });
}

AFRAME.registerComponent('set-image', {
  schema: {
    on: { type: 'string' },
    target: { type: 'selector' },
    src: { type: 'string' },
    dur: { type: 'number', default: 300 }
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    setupFadeAnimation(data, el);
    addChangeImageListener(data, el);
  }
});
