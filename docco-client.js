/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );
(function() {
  var $doc, $menu, $page, CREATE, DELETE, EMPTY, NAV, PURGE, READ, REDRAW, SEARCH, UPDATE, follow, log, mode, navigate, prevent, search, select, setup, stop, store, textSize, _mode;

  READ = 'readmode.docco';

  NAV = 'navmode.docco';

  SEARCH = 'searchmode.docco';

  EMPTY = 'empty.docco';

  CREATE = 'create.docco';

  READ = 'read.docco';

  UPDATE = 'update.docco';

  DELETE = 'delete.docco';

  PURGE = 'purge.docco';

  REDRAW = 'redraw.docco';

  if (window.docco == null) window.docco = {};

  docco.debug = true;

  _mode = null;

  $doc = $(document);

  $page = null;

  $menu = null;

  log = $.noop;

  mode = function(constant, force) {
    var prev;
    if (force == null) force = false;
    if ((constant != null) && ((constant !== _mode && constant !== false) || force === true)) {
      prev = _mode;
      _mode = constant;
      $doc.trigger(constant, [prev]);
    }
    return _mode;
  };

  stop = function(e) {
    return e.stopPropagation();
  };

  prevent = function(e) {
    return e.preventDefault();
  };

  follow = function($link) {
    var href;
    if ((href = $link.attr('href')) != null) return document.location = href;
  };

  select = function(increment, refresh) {
    var index, last, start, top;
    if (increment == null) increment = 0;
    if (refresh == null) refresh = false;
    start = this.$selectedItem().index();
    last = this.$selectableItems().length - 1;
    index = start + increment;
    if (index < 0) {
      index = last;
    } else if (index > last) {
      index = 0;
    }
    this.$selectableItems().removeClass('selected').eq(index).addClass('selected');
    if (increment === 0 && refresh === false) return;
    if (!this._hasScroll) {
      this._hasScroll = this.$itemWrapper().innerHeight() > this.innerHeight();
    }
    if (!this._itemHeight) {
      this._itemHeight = this.$selectableItems().first().outerHeight() + 1;
    }
    if (this._hasScroll === true) {
      top = this._itemHeight * index;
      if (index === last) {
        top = this.$itemWrapper().innerHeight() - this.innerHeight();
      } else if (index === 0) {
        top = 0;
      }
      this.$scroller.get(0).scrollTop = top;
    }
    return this;
  };

  navigate = function(increment) {
    var index, last;
    if (increment == null) increment = 1;
    last = this.$selectableItems().length - 1;
    index = this.$pageItem().index() + increment;
    if (index < 0) {
      index = last;
    } else if (index > last) {
      index = 0;
    }
    return follow(this.$items.eq(index));
  };

  search = function(query) {
    var results,
      _this = this;
    if (query == null) query = this.$searchField.val();
    results = 0;
    if (query != null) {
      if (this.$searchItems) this.$searchItems.remove();
      this.$searchItems = this.$items.filter(":contains('" + query + "'), [data-path*='" + query + "']").clone();
      results = this.$searchItems.length;
      if (!!results) {
        this.$itemWrapper().fadeOut('fast', function() {
          _this.$items.detach();
          _this._didHeightFix = false;
          return _this.$itemWrapper().empty().append(_this.$searchItems).fadeIn('fast');
        });
      } else {
        this.trigger(EMPTY, ['search']);
      }
    }
    return this;
  };

  store = function(key, json) {
    if (!window.localStorage || !window.JSON) return;
    if (json != null) {
      try {
        log("json: " + (JSON.stringify(json)));
        if (json === false) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(json));
        }
      } catch (error) {
        log(error);
        return false;
      }
    } else if (key != null) {
      if (key === false) {
        localStorage.clear();
      } else {
        return $.parseJSON(localStorage.getItem(key));
      }
    } else {
      return localStorage;
    }
    return this;
  };

  textSize = function(increment) {
    var data;
    data = this._store('textSize') || {
      zoom: 1
    };
    if (increment != null) {
      if (increment === false) {
        this.css('zoom', 0);
        this._store('textSize', false);
      } else {
        if (increment === true) increment = 0;
        data.zoom = increment + parseFloat(data.zoom);
        data.zoom = Math.max(data.zoom, 0.5);
        data.zoom = Math.min(data.zoom, 1.5);
        this.css('zoom', data.zoom.toFixed(1));
        this._store('textSize', data);
      }
    }
    return data;
  };

  setup = function() {
    var html, i, path, stickies,
      _this = this;
    mode(READ);
    $doc.bind('keydown', 't', function(e) {
      var _ref;
      if ((_ref = mode()) !== NAV && _ref !== SEARCH) {
        mode(NAV, mode());
      } else {
        mode(SEARCH, true);
      }
      return prevent(e);
    }).bind('keydown', 'r', function(e) {
      var from, increment, to, _ref;
      if ((_ref = mode()) !== NAV && _ref !== SEARCH) mode(NAV);
      to = _this.$pageItem().index();
      from = _this.$selectedItem().index();
      if (to === -1 || from === -1) {
        if (mode() === SEARCH) {
          _this.one(REDRAW, function() {
            e = $.Event('keydown');
            e.which = 82;
            return $doc.trigger(e);
          });
          mode(NAV);
        }
        return;
      }
      increment = to - from;
      _this.select(increment, true);
      return prevent(e);
    }).bind('keydown', 'j', function(e) {
      _this.navigate(-1);
      return prevent(e);
    }).bind('keydown', 'k', function(e) {
      _this.navigate(1);
      return prevent(e);
    }).bind('keydown', 's', function(e) {
      var $selected, _ref;
      if (((_ref = mode()) === NAV || _ref === SEARCH) && ($selected = _this.$selectedItem()).length) {
        _this.sticky(($selected.is('.sticky') ? DELETE : CREATE), $selected.data('path'));
      } else if (mode() === READ) {
        _this.sticky(CREATE, $page.data('path'));
      }
      return prevent(e);
    }).bind('keydown', 'ctrl+q', function(e) {
      _this.sticky(PURGE);
      $page.textSize(false);
      return prevent(e);
    }).bind('keydown', 'up', function(e) {
      var _ref;
      if ((_ref = mode()) === NAV || _ref === SEARCH) {
        _this.select(-1);
        return prevent(e);
      }
    }).bind('keydown', 'down', function(e) {
      var _ref;
      if ((_ref = mode()) === NAV || _ref === SEARCH) {
        _this.select(1);
        return prevent(e);
      }
    }).bind('keydown', 'return', function(e) {
      var $selected, _ref;
      if ((_ref = mode()) === NAV || _ref === SEARCH) {
        $selected = _this.$selectedItem();
        log("Going to selected `" + $selected + "`");
        if ($selected.length) follow($selected);
        return prevent(e);
      }
    }).bind('keydown', 'esc', function(e) {
      if (_this.$clearSearch.is(':visible')) {
        _this.$clearSearch.click();
      } else {
        switch (mode()) {
          case NAV:
            mode(READ);
            break;
          case SEARCH:
            mode(NAV);
        }
      }
      return prevent(e);
    }).bind('keydown', 'ctrl+up', function(e) {
      if (mode() === READ) {
        $page.textSize(0.1);
        return prevent(e);
      }
    }).bind('keydown', 'ctrl+down', function(e) {
      if (mode() === READ) {
        $page.textSize(-0.1);
        return prevent(e);
      }
    }).on({
      click: function() {
        return mode(READ);
      }
    }).on(READ, function(e, prev) {
      return _this.hide();
    }).on(NAV, function(e, prev) {
      if (!((prev != null) && prev === READ)) _this.reset();
      return _this.show();
    }).on(SEARCH, function(e, prev) {
      return _this.$searchField.focus();
    });
    this.on('click', function(e) {
      return stop(e);
    }).on(EMPTY, function(e, ref) {
      switch (ref) {
        case 'search':
          if (!!docco.no_results_tpl) {
            _this.$itemWrapper().empty().html(docco.no_results_tpl({}));
          }
      }
      return stop(e);
    }).on(CREATE, function(e, ref, path) {
      switch (ref) {
        case 'sticky':
          if (!!docco.sticky_item_tpl) {
            _this.stick($(docco.sticky_item_tpl({
              path: path,
              href: _this.$items.filter("[data-path='" + path + "']").first().attr('href')
            })));
          }
      }
      return stop(e);
    }).on(DELETE, function(e, ref, path) {
      switch (ref) {
        case 'sticky':
          _this.unstick(".sticky[data-path='" + path + "']:first");
      }
      return stop(e);
    }).on(PURGE, function(e, ref) {
      switch (ref) {
        case 'sticky':
          _this.unstick(".sticky");
      }
      return stop(e);
    }).on('click', '.sticky .remove', function(e) {
      _this.sticky(DELETE, $(e.target).closest('.sticky').data('path'));
      return prevent(e);
    });
    this.$navItems.on('click', function(e) {
      var $item;
      $item = $(e.target);
      prevent(e);
      if ($item.is('.selected')) return;
      mode(SEARCH);
      _this.$navItems.removeClass('selected');
      $item.addClass('selected');
      _this.$searchField.val($item.data('path'));
      return _this.$searchWrapper.submit();
    });
    this.$searchWrapper.on('submit', function(e) {
      _this.search();
      _this.$searchField.blur();
      return prevent(e);
    });
    this.$searchField.on('focus blur', function(e) {
      _this.$clearSearch.toggle(!!$(e.target).val());
      switch (e.type) {
        case 'focus':
          return mode(SEARCH);
        case 'blur':
          if (!_this.$searchItems) return mode(NAV);
      }
    });
    this.$clearSearch.on('click', function() {
      _this.$searchField.val('');
      mode(NAV);
      return _this.reset();
    });
    $(window).on('resize', function() {
      if (!_this._didHeightFix) return;
      _this.$scroller.css('height', '100%');
      _this._heightFixHeight = null;
      _this._didHeightFix = false;
      if (_this.is(':visible')) {
        _this.hide();
        return _this.show();
      }
    });
    stickies = this._store('sticky');
    if (!(stickies != null)) {
      this._store('sticky', {
        stickies: []
      });
    } else {
      html = (function() {
        var _len, _ref, _results;
        _ref = stickies.stickies;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          path = _ref[i];
          _results.push(docco.sticky_item_tpl({
            path: path,
            href: this.$items.filter("[data-path='" + path + "']").first().attr('href')
          }));
        }
        return _results;
      }).call(this);
      this.stick($(html.join('')));
    }
    return this.select();
  };

  $(function() {
    var f, logger;
    $page = $('#doc_page');
    $page.textSize = textSize;
    $page._store = store;
    $page.textSize(true);
    $menu = $('#jump_wrapper');
    if (!$menu.length) return;
    if ($('a.source', $menu).length < 25) SEARCH = false;
    f = function() {
      var _this = this;
      this.$itemWrapper = function() {
        return _this.find('#jump_page');
      };
      this.$items = this.find('a.source');
      this.$navItems = this.find('#jump_dirs a.dir');
      this.$searchWrapper = this.find('#jump_search_wrapper');
      this.$searchField = this.find('#jump_search');
      this.$clearSearch = this.$searchWrapper.find('#clear_search');
      this.$scroller = this.find('#jump_scroller');
      this.$selectableItems = function() {
        switch (mode()) {
          case SEARCH:
            if (_this.$searchItems && _this.$searchItems.length) {
              return _this.$searchItems;
            }
            break;
          default:
            return _this.$items;
        }
      };
      this.$selectedItem = function() {
        return _this.$selectableItems().filter('.selected').first();
      };
      this.$pageItem = function() {
        return _this.$items.filter("[data-path='" + ($page.data('path')) + "']").first();
      };
      this.$searchItems = $();
      this.select = select;
      this.navigate = navigate;
      this.search = search;
      this._store = store;
      this.sticky = function(act, id) {
        var did, i, stickies;
        if (act == null) act = READ;
        stickies = _this._store('sticky').stickies;
        did = false;
        switch (act) {
          case CREATE:
            if ((id != null) && stickies.indexOf(id) === -1) {
              stickies.push(id);
              did = _this._store('sticky', {
                stickies: stickies
              });
            }
            break;
          case DELETE:
            if ((id != null) && (i = stickies.indexOf(id)) !== -1) {
              stickies.splice(i, 1);
              did = _this._store('sticky', {
                stickies: stickies
              });
            }
            break;
          case PURGE:
            _this._store('sticky', {
              stickies: []
            });
            did = true;
            break;
          case READ:
            return _this._store('sticky');
        }
        if (did) _this.trigger(act, id != null ? ['sticky', id] : ['sticky']);
        return _this;
      };
      this.stick = function($items) {
        _this.$itemWrapper().prepend($items);
        return _this.$items = _this.$items.add($items);
      };
      this.unstick = function(filter) {
        _this.$itemWrapper().find(filter).remove();
        return _this.$items = _this.$items.not(filter);
      };
      this.reset = function() {
        _this.$searchField.blur();
        _this.$navItems.removeClass('selected');
        _this.$itemWrapper().fadeOut('fast', function() {
          if (_this.$searchItems) {
            _this.$searchItems.remove();
            _this.$searchItems = null;
            _this._didHeightFix = false;
          }
          return _this.$itemWrapper().empty().append(_this.$items).fadeIn('fast', function() {
            return _this.trigger(REDRAW);
          });
        });
        return _this;
      };
      this.show = function() {
        _this.css('display', 'block');
        if (!_this._didHeightFix) {
          if (!_this._heightFixHeight) {
            if (_this._heightFixHeight == null) {
              _this._heightFixHeight = _this.$scroller.height() - _this.$searchWrapper.height() - 3;
            }
          }
          _this.$scroller.height(_this._heightFixHeight);
          _this._didHeightFix = true;
        }
        return _this;
      };
      this.hide = function() {
        _this.css('display', 'none');
        _this.attr('style', '');
        return _this;
      };
      return setup.call(this);
    };
    f.call($menu);
    if (docco.debug === true) {
      window.$menu = $menu;
      window.$page = $page;
      logger = function() {
        return console.log.apply(console, arguments);
      };
      return window.log = log = console.log.bind ? console.log.bind(console) : logger;
    }
  });

}).call(this);
