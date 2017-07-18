sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("controller.Tasks", {
    oTasksModel: new sap.ui.model.json.JSONModel(),
    sDestinationURL: "scptraining",

    onInit: function () {
      var that = this;

      this.getView().setBusyIndicatorDelay(0);//Remove busy indicator delay

      this.oTasksModel.setData({
        taskList: []
      });

      this.getView().setModel(this.oTasksModel, "Tasks");

      this.getView().addEventDelegate({
        onBeforeShow: function () {
          that.fnLoadTasksFromServer(that);
        }
      });
    },

    onAfterRendering: function () {
      this.getView().setBusy(true);
      this.fnLoadTasksFromServer(this);
    },

    fnLoadTasksFromServer: function (that) {
      jQuery.ajax(this.sDestinationURL + '/task', {
        dataType: "json",
        method: "GET",
        contentType: "application/json; charset=UTF-8",
        success: that.fnSuccessCallback(that),
        error: that.fnErrorCallback
      });
    },

    fnSuccessCallback: function (controller) {
      return function (data) {
        var oModelData = controller.oTasksModel.getData();
        oModelData.taskList = data;
        controller.oTasksModel.setData(oModelData);
        controller.getView().setBusy(false);
      };
    },

    fnErrorCallback: function () {
      console.log("Error!!!");
    },

    onTaskSelect: function (oEvent) {
      this.getView().setBusy(true);

      var that = this;
      var oSelectTask = oEvent.getSource().getBindingContext("Tasks").getObject();

      jQuery.ajax(this.sDestinationURL + "/task/" + oSelectTask.id, {
        dataType: "json",
        data: JSON.stringify(oSelectTask),
        method: "PUT",
        contentType: "application/json; charset=UTF-8",
        success: that.fnReloadTasksFromServer(that)
      });
    },

    fnReloadTasksFromServer: function (that) {
      return function () {
        that.fnLoadTasksFromServer(that);
      };
    },

    onNewTaskClicked: function () {
      sap.ui.getCore().byId("app").to("idTaskCreationView");
    },

    onDeleteClick: function (oEvent) {
      this.getView().setBusy(true);

      var that = this;
      var sPath = oEvent.getParameter("listItem").getBindingContextPath();
      var oSelectTask = this.oTasksModel.getProperty(sPath);

      jQuery.ajax(this.sDestinationURL + "/task/" + oSelectTask.id, {
        dataType: "json",
        data: JSON.stringify(oSelectTask),
        method: "DELETE",
        contentType: "application/json; charset=UTF-8",
        complete: that.fnReloadTasksFromServer(that)
      });
    }
  });
});