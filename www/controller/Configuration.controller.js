sap.ui.define(["myreportlabor/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(BaseController, MessageBox, History, MessageToast) {
	"use strict";

	return BaseController.extend("myreportlabor.controller.Configuration", {
		
		//keyEndpointLocal: 'myreportlabor-endpoint',
		
		onInit: function (oEvent) {
			this.getRouter().getRoute("Configuration").attachPatternMatched(this._onObjectMatched, this);
		}, 
		
		_onObjectMatched: function (oEvent) { 
			this.byId("endpoint").setValue(maxinstlib.model.endpoint.get());
		},
		
		_onPageNavButtonPress: function(oEvent) {
			this.getRouter().navTo("Login", {}, true);
		},
		
		onSave: function(oEvent) {
			var endpoint = this.byId("endpoint").getValue();
			if(endpoint!=null) {
				maxinstlib.model.endpoint.set(endpoint);
				MessageToast.show('Endpoint '+ endpoint +' salvo com sucesso!', { duration: 3000 });
				this.getRouter().navTo("Login", {}, true);
			}
		},
		
		onCancel: function(oEvent) {
			maxinstlib.model.endpoint.delete("");
			this.getRouter().navTo("Login", {}, true);
		}
		
	});
},  true);
