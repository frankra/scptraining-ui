sap.ui.controller("view.Tasks", {

    oTasksModel : new sap.ui.model.json.JSONModel(),
    sDestinationURL : "hcptraining",

	onInit: function() {
	    var that = this;
	    
        this.oTasksModel.setData({ 
            taskList : []
        });
        
        this.getView().setModel(this.oTasksModel, "Tasks");
        
        this.getView().addEventDelegate({
		        onBeforeShow: function () {
		            that.fnLoadTasksFromServer(that);
		        }
		});
	},

	onAfterRendering: function() {
	    this.getView().setBusy(true);
        this.fnLoadTasksFromServer(this);
	},
	
	fnLoadTasksFromServer: function(that){
	    jQuery.ajax(this.sDestinationURL, {
	        dataType: "json",
	        method: "GET",
			contentType: "application/json; charset=UTF-8",
			success: that.fnSuccessCallback(that),
			error: that.fnErrorCallback
	    });
	},
	
	fnSuccessCallback : function(controller){
	    return function(data){
	        var oModelData = controller.oTasksModel.getData();  
	        oModelData.taskList = data;
	        controller.oTasksModel.setData(oModelData);
	        controller.getView().setBusy(false);
	    };
	},
	
	fnErrorCallback: function(){
	    console.log("Error!!!");
	},
	
	onTaskClicked: function(oEvent){
	    this.getView().setBusy(true);
	    
	    var that = this;
	    var sPath = oEvent.getSource().getBindingContextPath();
    	var oSelectTask = this.oTasksModel.getProperty(sPath);
    	oSelectTask.done = !oSelectTask.done;
    	
    	jQuery.ajax(this.sDestinationURL + "/" + oSelectTask.id, {
	        dataType: "json",
	        data: JSON.stringify(oSelectTask),
	        method: "PUT",
			contentType: "application/json; charset=UTF-8",
			success: that.fnReloadTasksFromServer(that)
	    });
	},
	
	fnReloadTasksFromServer: function(that){
	    return function(){
	        that.fnLoadTasksFromServer(that);
	    };
	},
	
	onNewTaskClicked: function(){
	    sap.ui.getCore().byId("app").to("idTaskCreationView");
	},
	
	onDeleteClick: function(oEvent){
	    this.getView().setBusy(true);
	    
	    var that = this;
	    var sPath = oEvent.getParameter("listItem").getBindingContextPath();
    	var oSelectTask = this.oTasksModel.getProperty(sPath);
    	
    	jQuery.ajax(this.sDestinationURL + "/" + oSelectTask.id, {
	        dataType: "json",
	        data: JSON.stringify(oSelectTask),
	        method: "DELETE",
			contentType: "application/json; charset=UTF-8",
			complete: that.fnReloadTasksFromServer(that)
	    });
	}
	

});