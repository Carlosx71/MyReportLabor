sap.ui.define([
	"sap/ui/core/UIComponent"

], function(UIComponent) {
	"use strict";

	return UIComponent.extend("myreportlabor.Component", {

		metadata: {
			manifest: "json"
		},


		init: function() {

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
		}

	});

});
