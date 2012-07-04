var Debug = (function ($) {
  'use strict';

  var module = {},
    $panel = $(),
    supportLocalStorage = !!window['localStorage'],
    $html = $('html'),
    STORAGE_KEY
  ;
  module.options = {
    colors: {},
    gridSelector: '.page',
    storageKey: 'dev.domain.tld.debug'
  };
  STORAGE_KEY = module.options.storageKey;

  /**
   * @private
   */
  function sortByAlphabet(o) {
    var sorted = {}, key, a = [];

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
    }

    return sorted;
  }
  /**
   * @private
   * @param {string} Color as a Hex, RGB, HLS value
   * @param {string} Name of variable name in the preprocessor engine (SASS,
   *   Less, etc.)
   * @return {string} HTML div element with background-color and
   *   color name as title attribute.
   */
  function colorSquare(color, name) {
    return '<div class="debug-color" style="background-color:' + color + '" title="$' + name + ' ' + color + '"></div>';
  }
  /**
   * @private
   * @return {string} HTML list with all colors
   */
  function buildColorSquares() {
    var htmlItem = '',
      colors = module.options.colors,
      color;
    // sort by alphabet
    colors = sortByAlphabet(colors);

    for (color in colors) {
      if (colors.hasOwnProperty(color)) {
        htmlItem += '<li>' + colorSquare(colors[color], color) + '</li>';
      }
    }
    return '<ul class="debug-colors"><li>Platform colors:&nbsp;</li>' + htmlItem + '</ul>';
  }
  /**
   * @private
   * Save current status of toggle state into the localStorage object.
   */
  function toggleHandler(event, options) {
    event.preventDefault();
    if (options.key) {
      $html.toggleClass('debug-' + options.key);
      if (supportLocalStorage) {
        var currValue = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {},
          value = {}
        ;
        value[options.key] = $html.hasClass('debug-' + options.key);
        localStorage.setItem(STORAGE_KEY, JSON.stringify($.extend(currValue, value)));
      }
    }
  }
  /**
   * @private
   * Creates a mouse sensitive debug panel on the top
   */
  function buildPanel() {
    if ($('.debug')[0]) {
      $panel = $(''+
        '<div id="debug-panel">'+
          '<div class="inner">'+
            '<span>Debug panel</span>'+
            '<a class="debug-toggle-boxes" href="#toggle">Boxes</a>'+
            '<a class="debug-toggle-grid" href="#toggle">Grid</a>'+
            '<a href="/styleguide">Styleguide</a>'+
          '</div>'+
        '</div>').prependTo('body');
    }
    $panel.find('.inner').append(buildColorSquares());
  }
  /**
   * @private
   * Will create a child element in a main containter that be used for the grid
   * lines
   */
  function buildGridCanvas() {
    var gridSelector = module.options.gridSelector,
      $gridContainer = $(gridSelector),
      // compensator is necessary for proper display of grid lines
      compensator = 1;

    if (!$('.debug-grid-container')[0]) {
      $gridContainer
        .addClass('debug-grid-container')
        .append(
          $('<div class="debug-grid-container-item" />')
            .width($gridContainer.width() + compensator)
        )
      ;
    }
  }
  /**
   * @private
   * Find active stored feature and set a feature class on the <html> element.
   */
  function detectActiveFeatrures() {
    if (supportLocalStorage) {
      var features = JSON.parse(localStorage.getItem(STORAGE_KEY));
      for (var feature in features) {
        if (features[feature] === true) {
          $html.addClass('debug-' + feature);
        }
      }
    }
  }

  /**
   * @public
   * @constructor
   */
  module.init = function (options) {
    $.extend(this.options, options || {});
    STORAGE_KEY = module.options.storageKey;

    buildPanel();
    buildGridCanvas();
    detectActiveFeatrures();

    $panel.find('.debug-toggle-boxes').click(function (event) {
      toggleHandler(event, {key: 'boxes'});
    });

    $panel.find('.debug-toggle-grid').click(function (event) {
      toggleHandler(event, {key: 'grid'});
    });

  };

  return module;

}(jQuery));

$(function () {
  'use strict';

  Debug.init({
    gridSelector: '.doc-page',
    colors: {blue:'#0ff', green: 'green'}
  });
});
