# RD-seiya

[![Build Status](https://travis-ci.org/johnidm/RD-seiya.svg?branch=master)](https://travis-ci.org/johnidm/RD-seiya)

Library to track user events in Saas applications.

> The POC/ folder has files used in the proof of concept.

#### Test the features in the browser

Put the HTML code in you page.

```
<script src="index.js"></script>
<script>
    Seyia.setEmail('johni@johni.com');
    Seyia.trackUrl(window.location.href);
</script>
```

See more details in `poc/index.html`.

#### Running unit tests

 ```
 npm i
 npm test
 ``` 

#### Release version

First of all you need to change the version in the file `seyia.js`.

After, minify the main file with the command `npm run uglify`.

