# RD-seiya

[](https://www.quartogeek.com.br/loja/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/i/miniatura-figure-cavaleiros-do-zodiaco-seiya-loja-quarto-geek-1.jpg)

[![Build Status](https://travis-ci.org/johnidm/RD-seiya.svg?branch=master)](https://travis-ci.org/johnidm/RD-seiya)

Library to track user events in Saas applications.

> The POC/ folder has files used in the proof of concept.

#### Hew to use

Put the HTML code in you page.

```
<script src="index.min.js"></script>
<script>
    Seyia().setEmail('johni@johni.com');
    Seyia().trackUrl(window.location.href);
</script>
```

See more details in `index.html`.

#### Running unit tests

 ```
 npm i
 npm test
 ``` 

#### Create a release version

First of all you need to change the source code in the file `seyia.js`.

After, minify the main file with the command `npm run uglify`.

Okay, just use.


### Upcoming features

- Review rule that allows more than one e-mail per token.
- Capture URL changes automatically.
