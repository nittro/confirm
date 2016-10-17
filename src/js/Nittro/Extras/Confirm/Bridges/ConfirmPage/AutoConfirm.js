_context.invoke('Nittro.Extras.Confirm.Bridges.ConfirmPage', function (DOM, Arrays, Confirm) {

    var AutoConfirm = _context.extend(function(page, options) {
        this._ = {
            page: page,
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
            var elem = evt.data.context ? evt.data.context.element || null : null;

            if (!elem || !DOM.hasClass(elem, 'nittro-confirm')) {
                return;

            } else if (DOM.getData(elem, 'confirmed')) {
                DOM.setData(elem, 'confirmed', null);
                return;

            }

            evt.preventDefault();

            var prompt = DOM.getData(elem, 'prompt') || this._.options.prompt,
                confirm = DOM.getData(elem, 'confirm') || this._.options.confirm,
                cancel = DOM.getData(elem, 'cancel') || this._.options.cancel;

            Confirm(prompt, confirm, cancel).then(function() {
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
    Arrays: 'Utils.Arrays',
    Confirm: 'Nittro.Extras.Confirm.Confirm'
});
