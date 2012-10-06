(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery.fn.fitsTruncationSpecs = function(content, maxHeight, settings) {
    var itFits, oldHTML, oldText;
    if (settings.html) {
      oldHTML = this.html();
      this.html(content);
      itFits = this.height() <= maxHeight;
      this.html(oldHTML);
    } else {
      oldText = this.text();
      this.text(content);
      itFits = this.height() <= maxHeight;
      this.text(oldText);
    }
    return itFits;
  };
  jQuery.fn.performTruncation = function(text, width, lheight, maxHeight, settings) {
    var character, characters, currentText, hasNotYetExceededSpecs, workingText, _fn, _i, _len;
    this.text("");
    characters = text.split("");
    hasNotYetExceededSpecs = true;
    workingText = "";
    currentText = workingText;
    _fn = __bind(function(character) {
      var textToTest;
      if (hasNotYetExceededSpecs) {
        workingText += character;
        textToTest = workingText + settings.omission;
        if (this.fitsTruncationSpecs(textToTest, maxHeight, settings)) {
          return currentText = textToTest;
        } else {
          return hasNotYetExceededSpecs = false;
        }
      }
    }, this);
    for (_i = 0, _len = characters.length; _i < _len; _i++) {
      character = characters[_i];
      _fn(character);
    }
    if (settings.html) {
      return this.html(currentText);
    } else {
      return this.text(currentText);
    }
  };
  jQuery.fn.truncate = function(options) {
    var settings;
    options || (options = {});
    settings = {
      omission: '...',
      rows: 1,
      html: false
    };
    jQuery.extend(settings, options);
    return $.each(this, function(i, el) {
      var lheight, maxHeight, text, width;
      text = $(el).text();
      width = $(el).width();
      lheight = $(el).css('line-height') ? parseInt($(el).css('line-height').match(/\d+/)[0]) : 0;
      maxHeight = lheight * settings.rows;
      if (!$(el).fitsTruncationSpecs(text, maxHeight, settings)) {
        return $(el).performTruncation(text, width, lheight, maxHeight, settings);
      }
    });
  };
}).call(this);