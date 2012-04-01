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
    $debugPanel = $();

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

  // TODO remove this when the design part is done
  // Creates a mouse sensitive debug panel on the top
  if ($('.debug')[0]) {
    var $debugPanel = $(''+
      '<div id="debug-panel">'+
        '<div class="inner">'+
          '<span>Debug panel</span>'+
          '<a class="debug-toggle"href="#toggle">toggle</a>'+
          // '<a href="/styleguide">Styleguide</a>'+
        '</div>'+
      '</div>').prependTo('body');

    var key = 'dev.xing.com.debug',
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
  }

});
