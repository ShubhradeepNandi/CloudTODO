/**
 * TODO with KO
 * app module
 *
 * Created by Shubhradeep Nandi.  
 * connect @https://www.linkedin.com/pub/shubhradeep-nandi/24/7b9/2ba
 */
define([
	'knockout',	'jquery'
], function (ko, $) {

function StringModel(attr){
    var self = this;
    self.name = ko.observable(attr);
    self.editing = ko.observable(false);     
    // Behaviors
    self.edit = function() 
	{ 	 
	  self.editing(true); 
	}
    self.submitVal = function() 
	{ 	 
	  self.editing(false); 
	}

}


function TaskViewModel(task) {
    // Data
	 this.taskName = ko.observable(new StringModel(task.taskName));
	 this.taskNumber = ko.observable(new StringModel(task.taskNumber));
	 this.priority = ko.observable(new StringModel(task.priority));
     this.assignee = ko.observable(new StringModel(task.assignee));
     this.statusValue = ko.observable(new StringModel(task.statusValue));
	 this.description = ko.observable(new StringModel(task.description));
		  

}

//var modifiedArray =[ new TaskViewModel(initialData[0]),new TaskViewModel(initialData[1]),new TaskViewModel(initialData[2])];	


var TaskModel = function(tasks) {
    var self = this;
    self.tasks = ko.observableArray(tasks);
	
	self.loadData = function(){
          //console.log("Here" + configMap.todo_url);
		  
    
      $.getJSON('http://***.***.***.***:8888/todo.json', function(json) {
	      console.log("Here inside");
	  
	     $.each(json.todos, function(index, todo)
		 {		 
		    //initialData.push(todo);
			//console.log(initialData.length);
            self.tasks.push(new TaskViewModel(todo));			
		 });

      
    });
   };
	//loadData();
	
	self.dataToadd=ko.observable("");
	self.addTask = function(){
    
      self.tasks.push(new TaskViewModel({
      taskName: self.dataToadd(),  
	  taskNumber: "123456",
      priority: "3",
      assignee: "add an assignee",
      statusValue: "add a status",
      description: "add a description"     
      }));
     self.dataToadd("");
    }
	
	
	self.removeTask = function(task){       
	   self.tasks.remove(task);
    }	
	
	return self;
};
//ko.applyBindings(new TaskModel(modifiedArray));
//exports.TaskModel = TaskModel;
//exports.TaskViewModel = TaskViewModel;
return {
TaskModel :TaskModel,
TaskViewModel :TaskViewModel
};
})
