# Yeah! JPEG with Alpha Transparency
This is the source of the demo page, that refers to the article [Yeah! JPEG with Alpha Transparency!](https://ehtmlu.com/blog/yeah-jpeg-with-alpha-transparency/).

Feel free to use the technique and the included Javascript for your own private or commercial needs. It would pleases me a lot if this helps you. Just let me know, so I can be happy about it 😊


## Usage:

First you need two image files:

### The JPEG
This file just need to contain your photo, that should have transparent areas at the end.

### The PNG
This file need to have exactly the same pixel dimensions as the JPEG and must contain the transparent areas. The not transparent areas can be simply black.


### The Code

Add the javascript to your web page:
```html
<script src="js/jpeg-alpha-transparency.js"></script>
```

Add images to your body like this:
```html
<img src="images/my-image.jpg" alt="some text" />
<img src="images/my-image.png" class="alphaMask" style="display: none; " aria-hidden="true" />
```

The `IMG` element with the PNG must ...
* be directly behind the `IMG` element with the JPEG
* have the class name "alphaMask"
* be hidden via CSS

The `aria-hidden` attribute ensures that it will be ignored by screen readers.

### Consider
The script tries to replace only the value of the `src` attribute of the first `IMG` element with a data URI. So, the `IMG` element itself would persist. But in some situations (especially if the images come from another domain), that will fail. In such cases the script replaces the whole `IMG` element by a `CANVAS` element.


