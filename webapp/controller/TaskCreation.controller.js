sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("controller.TaskCreation", {
    sDestinationURL: "scptraining",

    onSaveClicked: function () {
      var sInputValue = this.getView().byId("taskNameInput").getValue();
      var oTask = {
        name: sInputValue
      };

      this.fnSaveTaskOnServer(oTask, this);
    },

    onBackClicked: function () {
      this.getView().byId("taskNameInput").setValue("");
      sap.ui.getCore().byId("app").back();
    },

    fnSaveTaskOnServer: function (oTask, oController) {
      jQuery.ajax(this.sDestinationURL + '/task', {
        dataType: "json",
        data: JSON.stringify(oTask),
        method: "POST",
        contentType: "application/json; charset=UTF-8",
        success: function () {
          oController.getView().byId("taskNameInput").setValue("");
          sap.ui.getCore().byId("app").back();
        }
      });
    }

  });
});