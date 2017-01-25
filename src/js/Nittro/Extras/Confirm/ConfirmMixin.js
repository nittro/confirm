_context.invoke('Nittro.Extras.Confirm', function (Manager, Confirm) {

    var ConfirmMixin = {
        createConfirm: function (options) {
            var dlg = Confirm.apply(null, arguments);
            this._setup(dlg);
            return dlg;
        }
    };

    _context.mixin(Manager, ConfirmMixin);

}, {
    Manager: 'Nittro.Extras.Dialogs.Manager'
});
