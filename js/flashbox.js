

var _flashboxLeft;
var _flashboxRight;

$(function() {  
  var POSITIVE_WORDS = $('#jsdata-positive').text().split('|');
  var NEGATIVE_WORDS = $('#jsdata-negative').text().split('|');

  var positiveColors = ['6E8B3D', 'B3EE3A', '79973F', '385E0F', '9CCB19'];
  var negativeColors = ['ff423d', 'f32e28', 'FF7D40', 'FF8000', 'FF9912'];


  // init global variables
  _flashboxLeft = {};
  _flashboxLeft.fire = function() { displayRandom($('#emotions-left'), POSITIVE_WORDS, positiveColors); };
  _flashboxRight = {};
  _flashboxRight.fire = function() { displayRandom($('#emotions-right'), POSITIVE_WORDS, positiveColors); };

  function displayRandom($flashbox, wordList, colorList, duration) {
    // default args
    colorList = typeof colorList !== 'undefined' ? colorList : [0];
    duration = typeof duration !== 'undefined' ? duration : 400;

    // $flashbox.children('.word').remove();

    var word = wordList[Math.floor(Math.random() * wordList.length)];
    var color = colorList[Math.floor(Math.random() * colorList.length)];


    var $item = createItem(word);
    $flashbox.append($item);

    var TIME_ALIVE = 2000;
    var TRANSLATION_DISTANCE = 20;
    var BOX_PADDING = 10;

    var maxTop = $flashbox.height() - $item.textHeight() - BOX_PADDING;
    var maxLeft = $flashbox.width() - $item.textWidth() - BOX_PADDING;
    var top = Math.floor(Math.random() * maxTop + TRANSLATION_DISTANCE + BOX_PADDING);
    var left = Math.floor(Math.random() * maxLeft + BOX_PADDING);
    $item.css({'top': top + 'px', 'left': left + 'px', 'opacity':0, 'color': '#' + color, 'font-size': getRandomInt(18, 24) + 'pt'});
    $item.animate({'top': (top - TRANSLATION_DISTANCE), 'opacity': 1}, duration, 'swing', function() {
      // destroy object
      var e = $(this);
      setTimeout(function() {
        e.fadeOut(function() { e.remove(); });
      }, TIME_ALIVE)
    });

    function createItem(word) {
      return $('<span>').addClass('word').text(word);
    }
  }
})