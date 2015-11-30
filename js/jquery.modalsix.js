/*
    A simple jQuery modalsix (http://github.com/kylefox/jquery-modalsix)
    Version 0.5.10
*/
(function($) {

  var current = null;

  $.modalsix = function(el, options) {
    $.modalsix.close(); // Close any open modalsixs.
    var remove, target;
    this.$body = $('body');
    this.options = $.extend({}, $.modalsix.defaults, options);
    this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
    if (el.is('a')) {
      target = el.attr('href');
      //Select element by id from href
      if (/^#/.test(target)) {
        this.$elm = $(target);
        if (this.$elm.length !== 1) return null;
        this.open();
      //AJAX
      } else {
        this.$elm = $('<div>');
        this.$body.append(this.$elm);
        remove = function(event, modalsix) { modalsix.elm.remove(); };
        this.showSpinner();
        el.trigger($.modalsix.AJAX_SEND);
        $.get(target).done(function(html) {
          if (!current) return;
          el.trigger($.modalsix.AJAX_SUCCESS);
          current.$elm.empty().append(html).on($.modalsix.CLOSE, remove);
          current.hideSpinner();
          current.open();
          el.trigger($.modalsix.AJAX_COMPLETE);
        }).fail(function() {
          el.trigger($.modalsix.AJAX_FAIL);
          current.hideSpinner();
          el.trigger($.modalsix.AJAX_COMPLETE);
        });
      }
    } else {
      this.$elm = el;
      this.$body.append(this.$elm);
      this.open();
    }
  };

  $.modalsix.prototype = {
    constructor: $.modalsix,

    open: function() {
      var m = this;
      if(this.options.doFade) {
        this.block();
        setTimeout(function() {
          m.show();
        }, this.options.fadeDuration * this.options.fadeDelay);
      } else {
        this.block();
        this.show();
      }
      if (this.options.escapeClose) {
        $(document).on('keydown.modalsix', function(event) {
          if (event.which == 27) $.modalsix.close();
        });
      }
      if (this.options.clickClose) this.blocker.click($.modalsix.close);
    },

    close: function() {
      this.unblock();
      this.hide();
      $(document).off('keydown.modalsix');
    },

    block: function() {
      var initialOpacity = this.options.doFade ? 0 : this.options.opacity;
      this.$elm.trigger($.modalsix.BEFORE_BLOCK, [this._ctx()]);
      this.blocker = $('<div class="jquery-modalsix blocker"></div>').css({
        top: 0, right: 0, bottom: 0, left: 0,
        width: "100%", height: "100%",
        position: "fixed",
        zIndex: this.options.zIndex,
        background: this.options.overlay,
        opacity: initialOpacity
      });
      this.$body.append(this.blocker);
      if(this.options.doFade) {
        this.blocker.animate({opacity: this.options.opacity}, this.options.fadeDuration);
      }
      this.$elm.trigger($.modalsix.BLOCK, [this._ctx()]);
    },

    unblock: function() {
      if(this.options.doFade) {
        this.blocker.fadeOut(this.options.fadeDuration, function() {
          $(this).remove();
        });
      } else {
        this.blocker.remove();
      }
    },

    show: function() {
      this.$elm.trigger($.modalsix.BEFORE_OPEN, [this._ctx()]);
      if (this.options.showClose) {
        this.closeButton = $('<a href="#close-modalsix" rel="modalsix:close" class="close-modalsix ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
        this.$elm.append(this.closeButton);
      }
      this.$elm.addClass(this.options.modalsixClass + ' current');
      this.center();
      if(this.options.doFade) {
        this.$elm.fadeIn(this.options.fadeDuration);
      } else {
        this.$elm.show();
      }
      this.$elm.trigger($.modalsix.OPEN, [this._ctx()]);
    },

    hide: function() {
      this.$elm.trigger($.modalsix.BEFORE_CLOSE, [this._ctx()]);
      if (this.closeButton) this.closeButton.remove();
      this.$elm.removeClass('current');

      var _this = this;
      if(this.options.doFade) {
        this.$elm.fadeOut(this.options.fadeDuration, function () {
          _this.$elm.trigger($.modalsix.AFTER_CLOSE, [_this._ctx()]);
        });
      } else {
        this.$elm.hide(0, function () {
          _this.$elm.trigger($.modalsix.AFTER_CLOSE, [_this._ctx()]);
        });
      }
      this.$elm.trigger($.modalsix.CLOSE, [this._ctx()]);
    },

    showSpinner: function() {
      if (!this.options.showSpinner) return;
      this.spinner = this.spinner || $('<div class="' + this.options.modalsixClass + '-spinner"></div>')
        .append(this.options.spinnerHtml);
      this.$body.append(this.spinner);
      this.spinner.show();
    },

    hideSpinner: function() {
      if (this.spinner) this.spinner.remove();
    },

    center: function() {
      this.$elm.css({
        position: 'fixed',
        top: "50%",
        left: "50%",
        marginTop: - (this.$elm.outerHeight() / 2),
        marginLeft: - (this.$elm.outerWidth() / 2),
        zIndex: this.options.zIndex + 1
      });
    },

    //Return context for custom events
    _ctx: function() {
      return { elm: this.$elm, blocker: this.blocker, options: this.options };
    }
  };

  //resize is alias for center for now
  $.modalsix.prototype.resize = $.modalsix.prototype.center;

  $.modalsix.close = function(event) {
    if (!current) return;
    if (event) event.preventDefault();
    current.close();
    var that = current.$elm;
    current = null;
    return that;
  };

  $.modalsix.resize = function() {
    if (!current) return;
    current.resize();
  };

  // Returns if there currently is an active modalsix
  $.modalsix.isActive = function () {
    return current ? true : false;
  }

  $.modalsix.defaults = {
    overlay: "#000",
    opacity: 0.85,
    zIndex: 1,
    escapeClose: true,
    clickClose: true,
    closeText: 'Close',
    closeClass: '',
    modalsixClass: "modalsix",
    spinnerHtml: null,
    showSpinner: true,
    showClose: true,
    fadeDuration: null,   // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0        // Point during the overlay's fade-in that the modalsix begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  // Event constants
  $.modalsix.BEFORE_BLOCK = 'modalsix:before-block';
  $.modalsix.BLOCK = 'modalsix:block';
  $.modalsix.BEFORE_OPEN = 'modalsix:before-open';
  $.modalsix.OPEN = 'modalsix:open';
  $.modalsix.BEFORE_CLOSE = 'modalsix:before-close';
  $.modalsix.CLOSE = 'modalsix:close';
  $.modalsix.AFTER_CLOSE = 'modalsix:after-close';
  $.modalsix.AJAX_SEND = 'modalsix:ajax:send';
  $.modalsix.AJAX_SUCCESS = 'modalsix:ajax:success';
  $.modalsix.AJAX_FAIL = 'modalsix:ajax:fail';
  $.modalsix.AJAX_COMPLETE = 'modalsix:ajax:complete';

  $.fn.modalsix = function(options){
    if (this.length === 1) {
      current = new $.modalsix(this, options);
    }
    return this;
  };

  // Automatically bind links with rel="modalsix:close" to, well, close the modalsix.
  $(document).on('click.modalsix', 'a[rel="modalsix:close"]', $.modalsix.close);
  $(document).on('click.modalsix', 'a[rel="modalsix:open"]', function(event) {
    event.preventDefault();
    $(this).modalsix();
  });
})(jQuery);
