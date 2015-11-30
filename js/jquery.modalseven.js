/*
    A simple jQuery modalseven (http://github.com/kylefox/jquery-modalseven)
    Version 0.5.10
*/
(function($) {

  var current = null;

  $.modalseven = function(el, options) {
    $.modalseven.close(); // Close any open modalsevens.
    var remove, target;
    this.$body = $('body');
    this.options = $.extend({}, $.modalseven.defaults, options);
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
        remove = function(event, modalseven) { modalseven.elm.remove(); };
        this.showSpinner();
        el.trigger($.modalseven.AJAX_SEND);
        $.get(target).done(function(html) {
          if (!current) return;
          el.trigger($.modalseven.AJAX_SUCCESS);
          current.$elm.empty().append(html).on($.modalseven.CLOSE, remove);
          current.hideSpinner();
          current.open();
          el.trigger($.modalseven.AJAX_COMPLETE);
        }).fail(function() {
          el.trigger($.modalseven.AJAX_FAIL);
          current.hideSpinner();
          el.trigger($.modalseven.AJAX_COMPLETE);
        });
      }
    } else {
      this.$elm = el;
      this.$body.append(this.$elm);
      this.open();
    }
  };

  $.modalseven.prototype = {
    constructor: $.modalseven,

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
        $(document).on('keydown.modalseven', function(event) {
          if (event.which == 27) $.modalseven.close();
        });
      }
      if (this.options.clickClose) this.blocker.click($.modalseven.close);
    },

    close: function() {
      this.unblock();
      this.hide();
      $(document).off('keydown.modalseven');
    },

    block: function() {
      var initialOpacity = this.options.doFade ? 0 : this.options.opacity;
      this.$elm.trigger($.modalseven.BEFORE_BLOCK, [this._ctx()]);
      this.blocker = $('<div class="jquery-modalseven blocker"></div>').css({
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
      this.$elm.trigger($.modalseven.BLOCK, [this._ctx()]);
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
      this.$elm.trigger($.modalseven.BEFORE_OPEN, [this._ctx()]);
      if (this.options.showClose) {
        this.closeButton = $('<a href="#close-modalseven" rel="modalseven:close" class="close-modalseven ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
        this.$elm.append(this.closeButton);
      }
      this.$elm.addClass(this.options.modalsevenClass + ' current');
      this.center();
      if(this.options.doFade) {
        this.$elm.fadeIn(this.options.fadeDuration);
      } else {
        this.$elm.show();
      }
      this.$elm.trigger($.modalseven.OPEN, [this._ctx()]);
    },

    hide: function() {
      this.$elm.trigger($.modalseven.BEFORE_CLOSE, [this._ctx()]);
      if (this.closeButton) this.closeButton.remove();
      this.$elm.removeClass('current');

      var _this = this;
      if(this.options.doFade) {
        this.$elm.fadeOut(this.options.fadeDuration, function () {
          _this.$elm.trigger($.modalseven.AFTER_CLOSE, [_this._ctx()]);
        });
      } else {
        this.$elm.hide(0, function () {
          _this.$elm.trigger($.modalseven.AFTER_CLOSE, [_this._ctx()]);
        });
      }
      this.$elm.trigger($.modalseven.CLOSE, [this._ctx()]);
    },

    showSpinner: function() {
      if (!this.options.showSpinner) return;
      this.spinner = this.spinner || $('<div class="' + this.options.modalsevenClass + '-spinner"></div>')
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
  $.modalseven.prototype.resize = $.modalseven.prototype.center;

  $.modalseven.close = function(event) {
    if (!current) return;
    if (event) event.preventDefault();
    current.close();
    var that = current.$elm;
    current = null;
    return that;
  };

  $.modalseven.resize = function() {
    if (!current) return;
    current.resize();
  };

  // Returns if there currently is an active modalseven
  $.modalseven.isActive = function () {
    return current ? true : false;
  }

  $.modalseven.defaults = {
    overlay: "#000",
    opacity: 0.85,
    zIndex: 1,
    escapeClose: true,
    clickClose: true,
    closeText: 'Close',
    closeClass: '',
    modalsevenClass: "modalseven",
    spinnerHtml: null,
    showSpinner: true,
    showClose: true,
    fadeDuration: null,   // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0        // Point during the overlay's fade-in that the modalseven begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  // Event constants
  $.modalseven.BEFORE_BLOCK = 'modalseven:before-block';
  $.modalseven.BLOCK = 'modalseven:block';
  $.modalseven.BEFORE_OPEN = 'modalseven:before-open';
  $.modalseven.OPEN = 'modalseven:open';
  $.modalseven.BEFORE_CLOSE = 'modalseven:before-close';
  $.modalseven.CLOSE = 'modalseven:close';
  $.modalseven.AFTER_CLOSE = 'modalseven:after-close';
  $.modalseven.AJAX_SEND = 'modalseven:ajax:send';
  $.modalseven.AJAX_SUCCESS = 'modalseven:ajax:success';
  $.modalseven.AJAX_FAIL = 'modalseven:ajax:fail';
  $.modalseven.AJAX_COMPLETE = 'modalseven:ajax:complete';

  $.fn.modalseven = function(options){
    if (this.length === 1) {
      current = new $.modalseven(this, options);
    }
    return this;
  };

  // Automatically bind links with rel="modalseven:close" to, well, close the modalseven.
  $(document).on('click.modalseven', 'a[rel="modalseven:close"]', $.modalseven.close);
  $(document).on('click.modalseven', 'a[rel="modalseven:open"]', function(event) {
    event.preventDefault();
    $(this).modalseven();
  });
})(jQuery);
