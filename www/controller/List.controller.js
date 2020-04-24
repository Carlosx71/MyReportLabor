sap.ui.define(["myreportlabor/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, History) {
	"use strict";

	return BaseController.extend("myreportlabor.controller.List", {
		onInit: function (oEvent) {
			this.getRouter().getRoute("List").attachPatternMatched(this._onObjectMatched, this);
		}, 
		_onObjectMatched: function (oEvent) { 
			this.update();
		},
		onDownload: function() {
			var dialog = new sap.m.BusyDialog({text:'Aguarde...'});
			dialog.open();
			maxinstlib.event.download();
			dialog.close();			
			this.update();				
		},
		update: function() {
			var data = maxinstlib.model.asset.get();
			if(data!=null) {
				var oModel =  new sap.ui.model.json.JSONModel(JSON.parse(data));
				this.getView().setModel(oModel,'modelAsset');				
			}
		},	
		onLogout: function() {
			
			var that = this;
			var oDialog = new sap.m.Dialog({
				title: 'My Reportlabor',
				type: 'Message',
				content: new sap.m.Text({ text: 'Deseja sair do aplicativo?' }),
				beginButton: new sap.m.Button({
					type: sap.m.ButtonType.Emphasized,
					text: 'Sim',
					press: function () {
						maxinstlib.event.logout();
						that.getRouter().navTo("Login", {}, true);	
						oDialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Não',
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function () {
					oDialog.destroy();
				}
			});

			oDialog.open();
		
		},
	});
}, true);
