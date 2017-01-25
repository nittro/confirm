_context.invoke('Nittro.Extras.Confirm.Bridges.ConfirmPage', function (DOM, Arrays) {

    var AutoConfirm = _context.extend(function(page, dialogManager, options) {
        this._ = {
            page: page,
            dialogManager: dialogManager,
            options: Arrays.mergeTree(true, {}, AutoConfirm.defaults, options)
        };
    }, {
        STATIC: {
            defaults: {
                prompt: 'Are you sure?',
                confirm: 'Yes',
                cancel: 'No'
            }
        },

        handleTransaction: function (evt) {
            var elem = evt.data.context.element || null,
                prompt = elem ? DOM.getData(elem, 'prompt') : null;

            if (!prompt) {
                return;

            } else if (DOM.getData(elem, 'confirmed')) {
                DOM.setData(elem, 'confirmed', null);
                return;

            }

            evt.preventDefault();
            evt.data.context.event && evt.data.context.event.preventDefault();

            if (typeof prompt !== 'string') {
                prompt = this._.options.prompt;
            }

            var confirm = DOM.getData(elem, 'confirm') || this._.options.confirm,
                cancel = DOM.getData(elem, 'cancel') || this._.options.cancel;

            this._.dialogManager.createConfirm(prompt, confirm, cancel).then(function() {
                DOM.setData(elem, 'confirmed', true);

                if (elem instanceof HTMLFormElement) {
                    this._.page.sendForm(elem);

                } else {
                    this._.page.openLink(elem);

                }
            }.bind(this), function() {
                DOM.setData(elem, 'confirmed', null);

            });
        }
    });

    _context.register(AutoConfirm, 'AutoConfirm');

}, {
    DOM: 'Utils.DOM',
    Arrays: 'Utils.Arrays'
});
