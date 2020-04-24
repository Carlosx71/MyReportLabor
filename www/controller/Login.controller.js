sap.ui.define(["myreportlabor/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, History) {
	"use strict";

	return BaseController.extend("myreportlabor.controller.Login", {
		onInit: function (oEvent) {
			this.getRouter().getRoute("Login").attachPatternMatched(this._onObjectMatched, this);
		}, 
		_onObjectMatched: function (oEvent) { 
			if(maxinstlib.model.user.get()!=null) {
				this.getRouter().navTo("List", {}, true);
			}
		},
		onLogin: function(oEvent) {
			var user = this.byId("user").getValue();
			var pass = this.byId("password").getValue();
			if(!user || !pass){
				MessageToast.show('Campo vazio!', { duration: 3000 });
			}
			else{
				var dialog = new sap.m.BusyDialog({text:'Aguarde...'});
				dialog.open();
				var credentials = new Object();
				credentials.user=user;
				credentials.pass=pass;
				var validation = maxinstlib.event.authorization(credentials);
				dialog.close();
				if(validation){
					this.getRouter().navTo("List", {}, true);
				}else{
					MessageToast.show('Usuário inválido!', { duration: 3000 });
				}
			}
		},
		onConfiguration: function(oEvent) {
			this.getRouter().navTo("Configuration", {}, true);
		},
	});
}, true);
