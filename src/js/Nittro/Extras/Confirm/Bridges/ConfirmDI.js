_context.invoke('Nittro.Extras.Confirm.Bridges', function(Nittro) {

    if (!Nittro.DI) {
        return;
    }

    var ConfirmDI = _context.extend('Nittro.DI.BuilderExtension', function(containerBuilder, config) {
        ConfirmDI.Super.call(this, containerBuilder, config);
    }, {
        load: function() {
            var builder = this._getContainerBuilder();

            builder.addServiceDefinition('autoConfirm', {
                factory: 'Nittro.Extras.Confirm.AutoConfirm()',
                args: {
                    options: this._getConfig()
                },
                run: true
            });

        }
    });

    _context.register(ConfirmDI, 'ConfirmDI')

});
