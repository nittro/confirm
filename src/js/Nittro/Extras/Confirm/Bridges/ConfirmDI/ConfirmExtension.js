_context.invoke('Nittro.Extras.Confirm.Bridges.ConfirmDI', function() {

    var ConfirmExtension = _context.extend('Nittro.DI.BuilderExtension', function(containerBuilder, config) {
        ConfirmExtension.Super.call(this, containerBuilder, config);
    }, {
        setup: function() {
            var builder = this._getContainerBuilder();

            if (builder.hasServiceDefinition('dialogManager')) {
                builder.addFactory('confirm', '@dialogManager::createConfirm()');
            }

            if (builder.hasServiceDefinition('page')) {
                builder.addServiceDefinition('autoConfirm', {
                    factory: 'Nittro.Extras.Confirm.Bridges.ConfirmPage.AutoConfirm()',
                    args: {
                        options: this._getConfig()
                    },
                    run: true
                });

                builder.getServiceDefinition('page')
                    .addSetup(function(autoConfirm) {
                        this.on('before-transaction', autoConfirm.handleTransaction.bind(autoConfirm))
                    });
            }

        }
    });

    _context.register(ConfirmExtension, 'ConfirmExtension')

});
