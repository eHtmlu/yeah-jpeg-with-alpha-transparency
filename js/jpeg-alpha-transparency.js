
function jpegAlphaTransparency() {
  // test if canvas element is supported
	if (typeof (document.createElement('canvas')).getContext === 'undefined')
		return;

  // find masks
  var masks = document.querySelectorAll('img + img.alphaMask'),
      pos = masks.length,
      obj;

  // find images and add "load" event listeners to masks and images
  while (pos--) {
    obj = {
      orig: masks[pos].previousElementSibling,
      mask: masks[pos],
      done: false
    };
    if (obj.orig.nodeName === 'IMG') {
      obj.orig.addEventListener('load', replace.bind(obj));
      obj.mask.addEventListener('load', replace.bind(obj));
      obj.orig.src = obj.orig.src; // because of an IE issue
      obj.mask.src = obj.mask.src; // because of an IE issue
      replace.bind(obj)();
    }
  }

  // as soon as the photo and the mask are ready the magic starts
  function replace() {
    if (!this.done && this.orig.complete && this.mask.complete) {
      this.done = true;

      // create a canvas element
      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

      // set the canvas size
      canvas.setAttribute('width', this.mask.width);
      canvas.setAttribute('height', this.mask.height);

      // draw the mask image on the canvas element
      ctx.drawImage(this.mask, 0, 0);

      // prepare setting for placing the photo on the canvas
      ctx.globalCompositeOperation = 'source-atop';

      // draw the photo on the canvas element
      ctx.drawImage(this.orig, 0, 0);

      try {
        // try to copy the result directly into the IMG element
        // works only if images are on the same domain as the javascript file
        this.orig.src = canvas.toDataURL();
      } catch (e) {
        // Otherwise copy the class name, insert the canvas element and remove the photo IMG element
        canvas.className = this.orig.className;
        this.orig.parentNode.appendChild(canvas);
        this.orig.parentNode.removeChild(this.orig);
      }

      // remove the mask IMG element
      this.mask.parentNode.removeChild(this.mask);

      // here you can add code (for example to add a class to an element that should be styled differently as soon as the image is transparent)
    }
  }
}

document.addEventListener('DOMContentLoaded', jpegAlphaTransparency);
