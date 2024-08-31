[Looking for the free fingerprinting API?](https://overpoweredjs.com/)

# OverpoweredJS

**OverpoweredJS** is a family of two dual-licensed client-side JavaScript browser fingerprinting libraries designed to provide entropy to any mechanism of tracking individual browsers, enabling mutabile fingerprint analysis. The fingerprint objects OverpoweredJS creates contain identifiers (known as fingerprint components) that are used to compare to known fingerprints in a server-side database.

The method of comparing fingerprint objects can vary, but a simple solution is to assign each fingerprint component a weight. When comparing two or more fingerprints to each other, determine which fingerprint components are the same between the objects. If a component exists with a particular key name in both objects and both values of those keys are also the same, then it can be considered a match. If a match occurs, a weight is added to an overall sum of all matching components' weights (a score) and compared to the maximum score possible (i.e. identical fingerprint objects, or all weights summed). This allows you to determine the percentage chance that these fingerprints originate from the same browser instance.

Determining the weights to add to the score for each component is the difficult part. For more, see the whitepaper in `/docs`.

## Open Source

**OverpoweredJS Open Source** is a public open source library with a license that allows for use **as long as users explicitly consent to being tracked**. Furthermore, an additional restriction under the licensing is that **it can be used for non-commercial uses only**.

This repo is for the Open Source edition of OverpoweredJS. OverpoweredJS OS is derivative of the CS branch minus non-public modules. More modules will be added to OS in the future, but are not yet public.

Feel free to fork this repo as long as you obey the license terms and do not change the terms. Pull requests are encouraged if you wish to submit improvements, including modules of unexploited APIs.

## TODO

### Known Issues
- [ ] userAgentData.ts: fullVersionList is not properly sorted.
- [ ] Error handling of modules is poor.
- [ ] Module & stage performance metrics are not yet implemented.
- [ ] Only supports modern browsers, old browsers like MSIE will not track well even if polyfills are added.
- [ ] The whitepaper's markdown of math functions are broken. Feel free to submit a pull request if you can fix them.

### Unexploited APIs
- [x] CanvasAPI (in development)
- [x] WebGL (in development)
- [x] Navigator object (in development)
- [ ] AudioContext (not bothering, feel free to do it yourself)

## Closed Source

**OverpoweredJS Closed Source** is a solution for businesses and organizations that require access to the most important and highest entropy fingerprinting components. These non-public modules supply more fingerprinting components in order to improve on the Open Source edition, allowing higher accuracy, among other features. This license allows for commercial use of either the Open Source or Closed Source editions.

This is specifically for businesses and organizations that require commercial use and higher accuracy.

To pursue potentially purchasing a license, please contact Joe+opjs@dreggle.com.

## OverpoweredJS API
The **OverpoweredJS API** uses OverpoweredJS Closed Source and server-side processing to track browser instances without having to run your own server. It is currently available and can be embedded on any site that uses HTTPS. After calling the `opjs` function, you'll get something back like this:
```json
{
  "clusterUUID": "0W-C9Q-WS6-OHK",
  "hash": "981ea46cc95667439294e31fffd8d7c060a0e9f7f3f553a7c4943fa7541d9747",
  "botScore": 1
}
```

- The `clusterUUID` is the (hopefully) unique ID that is attached to the browser.
- The `hash` is simply the hash of the JSON object sent to the server. It can (and will) change, but the `clusterUUID` should not.
- The `botScore` is a score from 1 to 5 with 5 being the highest likelyhood of being a bot.

As of August 2024, the prototype service can track most Chromium-based browsers such as Google Chrome, Microsoft Edge and Opera.

Support for other browsers such as Firefox, Brave and Safari is in development. These browsers may cause collisions (having the same `clusterUUID` as other browser instances). This may or may not change in the future. For the time being, non-Chromium browsers will be rejected by the API. Particularly, Apple devices will be the least unique due to the homogeneity of Apple's software and hardware, as well as Apple's continued efforts to make their software resistant to tracking.

This is intended to be a commercial API for those priced out of similar SaaS fingerprinting solutions, and is intended to be as inexpensive as possible.

The prototype API is currently up and running. [You can participate here](https://overpoweredjs.com/).

You may participate regardless of how much traffic you have or whether or not you're going to sign up for the service when it goes into production.

# Copyright
(c) 2024 Joe Rutkowski (Joe12387) - Joe@dreggle.com - github.com/Joe12387
