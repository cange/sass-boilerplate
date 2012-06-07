$(function () {

  'use strict';

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

  var colors = {
      black: '#000',
      white: '#fff'
    },
    $debugPanel = $()
  ;

  // sort by alphabet
  colors = sortByAlphabet(colors);

  function colorSquare(color, name) {
    return '<div class="debug-color" style="background-color:'+color+'" title="$'+name+' '+color+'"></div>';
  }

  function buildColorSquares() {
    var colorHTML = '';
    for (var color in colors) {
      colorHTML += '<li>' + colorSquare(colors[color], color) + '</li>';
    }
    return $('<ul class="debug-colors">' + colorHTML + '</ul>');
  }
  // save current status of toggle state into the localStorage object
  function toggleHandler(event, options) {
    event.preventDefault();
    if (options.key) {
      $html.toggleClass('debug-' + options.key);
      if (supportLocalStorage) {
        var currValue = localStorage.getItem(namespace) ? JSON.parse(localStorage.getItem(namespace)) : {},
          value = {}
        ;
        value[options.key] = $html.hasClass('debug-' + options.key);
        localStorage.setItem(namespace, JSON.stringify($.extend(currValue, value)));
      }
    }
  }

  // Creates a mouse sensitive debug panel on the top
  if ($('.debug')[0]) {
    var $debugPanel = $(''+
      '<div id="debug-panel">'+
        '<div class="inner">'+
          '<span>Debug panel</span>'+
          '<a class="debug-toggle" href="#toggle">toggle</a>'+
          '<a class="debug-toggle-grid" href="#toggle">toggle Grid</a>'+
          '<a href="static/styleguide">Styleguide</a>'+
        '</div>'+
      '</div>').prependTo('body');

    var key = 'dev.domain.tld.debug',
      supportLocalStorage = !!window['localStorage'],
      $html = $('html')
    ;
    if (supportLocalStorage && localStorage.getItem(key) === 'true') {
      $html.addClass('active');
    }
    $debugPanel.find('.debug-toggle').click(function (event) {
      event.preventDefault();
      $html.toggleClass('active');
      if (supportLocalStorage) {
        localStorage.setItem(key, $html.hasClass('active'));
      }
    });
    $debugPanel.find('.inner').append(buildColorSquares());
    
    $debugPanel.find('.debug-toggle-grid').click(function (event) {
      toggleHandler(event, {key: 'grid'});
    });
    
  }
});
