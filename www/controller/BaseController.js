sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";
    
    return Controller.extend("myreportlabor.controller.BaseController", {
                    
        onInit: function() {
            var i18nModel = new sap.ui.model.resource.ResourceModel({bundleName: langString});
            this.getOwnerComponent().setModel(i18nModel, "i18n");
            this.getView().setModel(i18nModel, "i18n");
        },
		
        getRouter : function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        
    });

});
