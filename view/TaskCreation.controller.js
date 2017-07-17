sap.ui.controller("view.TaskCreation", {

    sDestinationURL : "hcptraining",
    
    onSaveClicked: function(){
        var sInputValue = this.getView().byId("taskNameInput").getValue();
        var oTask = {
            name : sInputValue
        };
        
        this.fnSaveTaskOnServer(oTask, this);
    },
    
    onBackClicked: function(){
        this.getView().byId("taskNameInput").setValue("");
        sap.ui.getCore().byId("app").back();
    },
    
    fnSaveTaskOnServer: function(oTask, oController){
        jQuery.ajax(this.sDestinationURL, {
	        dataType: "json",
	        data: JSON.stringify(oTask),
	        method: "POST",
			contentType: "application/json; charset=UTF-8",
			success: function(){
			    oController.getView().byId("taskNameInput").setValue("");
                sap.ui.getCore().byId("app").back();
			}
	    });
    }

});