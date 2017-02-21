_context.invoke('Nittro.Extras.Confirm.Bridges.ConfirmPage', function (DOM, Arrays) {

    var AutoConfirm = _context.extend(function(dialogManager, options) {
        this._ = {
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
            }

            if (typeof prompt !== 'string') {
                prompt = this._.options.prompt;
            }

            var confirm = DOM.getData(elem, 'confirm') || this._.options.confirm,
                cancel = DOM.getData(elem, 'cancel') || this._.options.cancel;

            evt.waitFor(
                this._.dialogManager.createConfirm(prompt, confirm, cancel)
                    .then(function(result) { result || evt.preventDefault(); })
            );
        }
    });

    _context.register(AutoConfirm, 'AutoConfirm');

}, {
    DOM: 'Utils.DOM',
    Arrays: 'Utils.Arrays'
});
