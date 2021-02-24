// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"component/utilita/utilita.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElement = exports.$ = void 0;

var $ = function $(selector) {
  return document.querySelector(selector);
};

exports.$ = $;

var getElement = function getElement(selector) {
  return document.getElementById(selector);
};

exports.getElement = getElement;

Object.prototype.addTo = function (selector) {
  var mySelector = $(selector);
  mySelector.appendChild(this);
};

Object.prototype.addClass = function (className) {
  this.classList.add(className);
  return this;
};

Object.prototype.listener = function (type, func) {
  this.addEventListener(type, func);
  return this;
};
},{}],"component/slider/slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = Slider;

var _utilita = require("./../utilita/utilita");

function Slider() {
  var offset = 0;
  var slideIndex = 1;
  var imgArr = new Array(8),
      textArr = [{
    brand: "Ferrari",
    model: 'Enzo'
  }, {
    brand: "Lamborgini",
    model: 'Huracan'
  }, {
    brand: "Ferrari",
    model: 'F458'
  }, {
    brand: "Porshe",
    model: '911 Turbo S'
  }, {
    brand: "BMW",
    model: 'E92'
  }, {
    brand: "Aston Martin",
    model: 'DB6'
  }, {
    brand: "Ferrari",
    model: 'F458'
  }, {
    brand: "Lamborgini",
    model: 'Aventador'
  }],
      slidesField = (0, _utilita.$)('.offer_slider-inner'),
      slidesWrapper = (0, _utilita.$)('.offer_slider-wrapper'),
      sliderInner = (0, _utilita.getElement)('sliderInner'),
      slider = (0, _utilita.$)('.offer_slider'),
      prev = (0, _utilita.$)('.prev'),
      next = (0, _utilita.$)('.next'),
      width = window.getComputedStyle(slidesWrapper).width;
  imgArr.fill('');
  imgArr.map(function (item, index) {
    var divSlide = document.createElement('div'),
        h1 = document.createElement('h1'),
        h3 = document.createElement('h3'),
        newImg = new Image();
    divSlide.classList.add('offer_slide');
    h1.innerHTML = "".concat(textArr[index].brand);
    h3.innerHTML = "".concat(textArr[index].model);
    newImg.src = "https://raw.githubusercontent.com/Egorkostuck/img_examJS/main/img".concat(index + 1, ".jpg");
    sliderInner.appendChild(divSlide);
    divSlide.appendChild(h1);
    divSlide.appendChild(h3);
    divSlide.appendChild(newImg);
  });
  var slides = document.querySelectorAll('.offer_slide'),
      indicators = document.createElement('ol'),
      dots = [];
  slidesField.style.width = 100 * slides.length + '%';
  slides.forEach(function (slide) {
    slide.style.width = width;
  });
  indicators.classList.add('carousel-indicators');
  slider.appendChild(indicators);

  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.appendChild(dot);
    dots.push(dot);
  }

  var changeOpacity = function changeOpacity() {
    dots.forEach(function (dot) {
      return dot.style.opacity = "0.5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  };

  next.addEventListener('click', function () {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    location.hash = "".concat(textArr[slideIndex - 1].brand, "-").concat(textArr[slideIndex - 1].model);
    changeOpacity();
  });
  prev.addEventListener('click', function () {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = "translateX(-".concat(offset, "px)");

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    location.hash = "".concat(textArr[slideIndex - 1].brand, "-").concat(textArr[slideIndex - 1].model);
    changeOpacity();
  });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function (e) {
      var slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = "translateX(-".concat(offset, "px)");
      location.hash = "".concat(textArr[slideIndex - 1].brand, "-").concat(textArr[slideIndex - 1].model);
      changeOpacity();
    });
  });
}
},{"./../utilita/utilita":"component/utilita/utilita.js"}],"component/popup/popup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popup = Popup;

var _utilita = require("./../utilita/utilita");

function Popup() {
  var photoArr = new Array(8);
  var arrName = ['Johnny Depp', 'Morgan Freeman', 'Kira Nattily', 'Jennifer Lopez', 'Jennifer Aniston', 'Bruce Willis', 'Brad Pit', 'Will Smith'];
  photoArr.fill('');
  photoArr.map(function (item, index) {
    var containerPortf = (0, _utilita.$)('.portfolio-container');
    var block = document.createElement('div');
    var photo = new Image();
    photo.src = "https://raw.githubusercontent.com/Egorkostuck/examJS_photo/main/photo".concat(index + 1, ".png");
    block.classList.add('content-block');
    photo.classList.add("photo-img");
    block.innerHTML = "<i class=\"icon-zoom-in\"></i>";
    photo.setAttribute('alt', "".concat(arrName[index]));
    photo.setAttribute('title', "".concat(arrName[index]));
    containerPortf.appendChild(block);
    block.appendChild(photo);
    photo.addEventListener('mouseenter', function () {
      var icon = document.querySelectorAll('.icon-zoom-in');
      icon[index].classList.add('icon-show');
    });
    photo.addEventListener('mouseleave', function () {
      var icon = document.querySelectorAll('.icon-zoom-in');
      icon[index].classList.remove('icon-show');
    });
    var modalWindow = document.createElement('div'),
        modalContainer = document.createElement('div'),
        body = (0, _utilita.$)('body'),
        modalPhoto = new Image(500);
    modalWindow.classList.add('modal-window');
    modalContainer.classList.add('modal-container');
    modalContainer.innerHTML = "<i class=\"icon-zoom-out\"></i>";
    modalPhoto.src = "https://raw.githubusercontent.com/Egorkostuck/examJS_photo/main/photo".concat(index + 1, ".png");
    modalPhoto.classList.add('modal-photo');
    body.appendChild(modalWindow);
    modalWindow.appendChild(modalContainer);
    modalContainer.appendChild(modalPhoto);
    var iconOut = document.querySelectorAll('.icon-zoom-out');
    photo.addEventListener('click', function () {
      location.hash = photo.alt;
      modalWindow.classList.add('modal-show');
      modalWindow.classList.remove('modal-none');
      modalPhoto.addEventListener('mouseenter', function () {
        iconOut[index].classList.add('icon-show-out');
      });
      modalPhoto.addEventListener('mouseleave', function () {
        iconOut[index].classList.remove('icon-show-out');
      });
    });
    modalWindow.addEventListener('click', function (event) {
      var nodal = event.currentTarget;
      location.hash = 'portfolio';
      nodal.classList.add('modal-none');
      nodal.classList.remove('modal-show');
    });
  });
}
},{"./../utilita/utilita":"component/utilita/utilita.js"}],"component/App.js":[function(require,module,exports) {
"use strict";

require("./utilita/utilita");

var _slider = require("./slider/slider");

var _popup = require("./popup/popup");

var container = document.createElement('div'),
    divPhoto = document.createElement('div');
container.addClass('container');
divPhoto.addClass('portfolio');
location.hash = 'home';
container.innerHTML = "\n<div class=\"offer_slider\">\n    <div class=\"prev\">\n        <div class=\"arrow-left icon\"></div>\n    </div>\n    <div id=\"sliderWrapper\" class=\"offer_slider-wrapper\">\n        <div id=\"sliderInner\" class=\"offer_slider-inner\">\n        </div>\n    </div>\n    <div class=\"next\">\n        <div class=\"arrow-right icon\"></div>\n    </div>\n</div>\n";
divPhoto.innerHTML = "\n<div class=\"portfolio-container\">\n</div>\n";
container.addTo('body');
divPhoto.addTo('body');
setTimeout(_slider.Slider, 1000);
setTimeout(_popup.Popup, 1000);
},{"./utilita/utilita":"component/utilita/utilita.js","./slider/slider":"component/slider/slider.js","./popup/popup":"component/popup/popup.js"}],"C:/Users/Администратор/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/Администратор/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/Администратор/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/Администратор/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./component/App");

require("./css/style.css");
},{"./component/App":"component/App.js","./css/style.css":"css/style.css"}],"C:/Users/Администратор/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57404" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Администратор/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/exam_js.e31bb0bc.js.map