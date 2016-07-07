_context.invoke('Nittro.Widgets', function (Dialog, Arrays, ReflectionClass) {

	var Confirm = _context.extend(Dialog, function (options) {
		if (!(this instanceof Confirm)) {
			var dlg = ReflectionClass.from(Confirm).newInstanceArgs(arguments);
			window.setTimeout(function() { dlg.show(); }, 1);
			return dlg;

		}

		Confirm.Super.call(this, this._prepareOptions(arguments));

		this._.promise = new Promise(function (fulfill, reject) {
            this.on('button', function(evt) {
                this.destroy();

                if (evt.data.value === 'confirm') {
                    fulfill();

                } else {
                    reject();

                }
            });
        }.bind(this));

	}, {
        STATIC: {
            defaults: {
                classes: 'nittro-dialog-confirm',
                buttons: {
                    confirm: 'OK',
                    cancel: {label: 'Cancel', type: 'text'}
                },
                keyMap: {
                    confirm: 13,
                    cancel: 27
                }
            },
            setDefaults: function(defaults) {
                Arrays.mergeTree(Confirm.defaults, defaults);

            }
        },

		_prepareOptions: function (args) {
			var options = args[0];

			if (typeof options === 'string') {
				options = {
					text: options
				};

				if (args.length > 1) {
					options.buttons = {
						confirm: args[1]
					};

					if (args.length > 2) {
						if (typeof args[2] === 'string') {
							options.buttons.cancel = {label: args[2], type: 'text'};

						} else {
							options.buttons.cancel = args[2];

						}
					} else {
						options.buttons.cancel = {label: 'Cancel', type: 'text'};

					}
				}
			}

			return options;

		},

		then: function (onfulfill, onreject) {
            return this._.promise.then(onfulfill, onreject);

        }
	});

    _context.register(Confirm, 'Confirm');

}, {
	ReflectionClass: 'Utils.ReflectionClass',
    Arrays: 'Utils.Arrays'
});
;
_context.invoke('Nittro.Services', function (DOM, Arrays, Confirm) {

    var AutoConfirm = _context.extend(function(page, options) {
        this._ = {
            page: page,
            options: Arrays.mergeTree(true, {}, AutoConfirm.defaults, options)
        };

        this._.page.on('create-request', this._handleRequest.bind(this));

    }, {
        STATIC: {
            defaults: {
                prompt: 'Are you sure?',
                confirm: 'Yes',
                cancel: 'No'
            }
        },

        _handleRequest: function (evt) {
            if (!evt.data.context || !DOM.hasClass(evt.data.context, 'nittro-confirm')) {
                return;

            } else if (DOM.getData(evt.data.context, 'confirmed')) {
                DOM.setData(evt.data.context, 'confirmed', null);
                return;

            }

            evt.preventDefault();

            var prompt = DOM.getData(evt.data.context, 'prompt') || this._.options.prompt,
                confirm = DOM.getData(evt.data.context, 'confirm') || this._.options.confirm,
                cancel = DOM.getData(evt.data.context, 'cancel') || this._.options.cancel;

            Confirm(prompt, confirm, cancel).then(function() {
                DOM.setData(evt.data.context, 'confirmed', true);

                if (evt.data.context instanceof HTMLFormElement) {
                    this._.page.sendForm(evt.data.context);

                } else {
                    this._.page.openLink(evt.data.context);

                }
            }.bind(this), function() {
                DOM.setData(evt.data.context, 'confirmed', null);

            });
        }
    });

    _context.register(AutoConfirm, 'AutoConfirm');

}, {
    DOM: 'Utils.DOM',
    Arrays: 'Utils.Arrays',
    Confirm: 'Nittro.Widgets.Confirm'
});
