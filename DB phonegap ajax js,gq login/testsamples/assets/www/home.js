��USBC�(P
 $    
* �H'         	h          @             (   H                        �    0B�    �B�             �    0B�    0B�           ��    ��    ��    x          @              ( P x   @  0      �      �z5     P      ��     ��     0B�    �ܟ=���� �             < h o m e . j s     ���    ��    ��    h          @             (   H                        �    �B�    �B�             �    0B�    �B�           ��    ��    ��    8     ��$(document).ready(function(){
	var db=null;
	var networkState;
	var itemid ;
	var quality,godown;
	var quantity;
	var customer;
	 var updatelength=0;
	 var timeseconds=60000;
	 var updateflag=0;
	 
	
	 document.addEventListener("deviceready", onDeviceReady, false);
	 //alert('onready');
	
	 
	 
	 function onDeviceReady() {
			pictureSource=navigator.camera.PictureSourceType;
		    destinationType=navigator.camera.DestinationType;
		   // navigator.notification.alert('Apllication is ready to use',allertCallback);
		    document.addEventListener("resume", onResume, false);
		    document.addEventListener("offline", onOffline, false);
		    alert('ondeviceready');
		    db = window.openDatabase("purchase", "1.0", "poc for offline", 1000000);
		    db.transaction(populateDB, errorCB, successCB);
		    setInterval(syncFunction, timeseconds);
	 
	    }
	 
	
	 function allertCallback(){
		 
		 
	 }
	  function syncFunction(){ 
		  
	     //findNetworkState();
		 if(navigator.network.connection.type==Connection.CELL_3G || navigator.network.connection.type==Connection.WIFI){
			
			 recordChecking();
		 }
				 	 
		}
	 function onResume(){
		 syncFunction();
		 
	 }
	 
	 function onOffline(){
		 
		 navigator.notification.alert("No Network Connection ",allertCallback,"Alert");
	 }
	 
	function populateDB(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS purchaseorder (Id INTEGER PRIMARY KEY AUTOINCREMENT,Item_ID int,Quantity int,Mark text default null,Godown text,Customer text,CreatedDate Date default (datetime('now','localtime')))");
			 
		 }

	function errorCB(tx,e){
		 
		 navigator.notification.alert("Error " +e,allertCallback,"Error");
	}
	
	function successCB(){
		 
		// alert("success1234");
	}
	function successCB1(){
		 
		// alert("success12345");
	}
	
	function validate()
	{
		//alert("validate");
	if($('#Item_id').val()==""){
		
		navigator.notification.alert('Please enter the item_id',allertCallback);
		return false;
		
	}else if($('#quality').val()==-1){
		
		navigator.notification.alert('Please select quality',allertCallback);
		return false;
		
	}else if($('#quantity').val()==""){
		
		navigator.notification.alert('Please enter quantity',allertCallback);
		return false;
	}else if($('#godown').val()==-1){
		
		navigator.notification.alert('Please select the godown',allertCallback);
		return false;
		
	}else if($('#customer').val()==""){
		
		navigator.notification.alert('Please enter the customer name',allertCallback);
		return false;
		
	}		
	else
		{
	return true;
		}
		
	}
	
	
	$("#bt_submit").bind('click',function()
	{
	//alert("save");

	if(validate())
	{
		findNetworkState();
		if(networkState==Connection.CELL_3G || navigator.network.connection.type==Connection.WIFI){	
			//alert("net");
			getValues();
	//alert(itemid+"-"+quality+"-"+godown+"-"+quantity+"-"+customer);
	 $.mobile.showPageLoadingMsg("a", "Processing wait...");
	$.ajax({
        url: 'http://192.168.1.40/impact/Services/BrandChange/brandchange.svc/brandchange/offlinedemo',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ demodetaildata: {"item_id":itemid,"quality":quality,"quantity":quantity,"godown":godown,"customer":customer}}),
        success: function (result) {
       	
       	 if(result==true){
       		
       		  navigator.notification.alert("Saved successfully",allertCallback,"Alert");
       		resetValues();
       		 $.mobile.hidePageLoadingMsg();
       	 }else{
       		 navigator.notification.alert("Error in inserting data",allertCallback,"Error");
			   }
       	 
       	 
        },
        error:function(e){
       	 navigator.notification.alert("Error ",allertCallback,"Error");
       	 $.mobile.hidePageLoadingMsg();
        }
    });
		}
		else
			{
			getValues();
			insertdata();
			
			}
	}

	});
	
	function  findNetworkState(){
		networkState=navigator.network.connection.type;
	}
	function insertdata()
	{
		 db.transaction(insertdataitem,errorCB,insertdataitemCB);
	}
	function insertdataitem(tx)
	{
		//alert(itemid+"-"+quality+"-"+godown+"-"+quantity+"-"+customer);
		tx.executeSql('insert into purchaseorder (Item_ID,Quantity,Mark,Godown,Customer) values ('+itemid+','+quantity+','+'"'+quality+'"'+','+'"'+godown+'"'+','+'"'+customer+'"'+')');
	}
	function insertdataitemCB()
	{
		 navigator.notification.alert("Saved successfully",allertCallback,"Alert");
		resetValues();
	}
	 function recordChecking(){
		   
		   db.transaction(checkingForUpdate,errorCB,successCB);
	   }
	 function checkingForUpdate(tx){
		   tx.executeSql('select * from purchaseorder',[],checkUpdateAvailable,errorCB);
	  
	   }
	 function checkUpdateAvailable(tx,results){
		   
		   updatelength=results.rows.length;
		  // alert(updatelength+"updatelength");
		   confirmOfflineUpdate();
		   
	   }
	 function startOfflineUpdate(){
		   db.transaction(offlineUpdate,errorCB,successCB1);
		   
	   }
	 function offlineUpdate(tx){
		   
		   tx.executeSql('select * from purchaseorder',[],insertBrandchangeFormOfflineUpdateCB,errorCB);
	   }
 function updateCB(button){
		 
		 if(button==1){
			// alert("offlineupdate");
			 startOfflineUpdate();
			 updateflag=0;
		 }else if(button==2){
			 timeseconds=60000;
			 updateflag=0;
		 }
		 
	 }
 function deleteRecords(){
	   
	   db.transaction(deleteRecodsFromSqlite,errorCB,successCB);
 }
 
 function deleteRecodsFromSqlite(tx){
	   tx.executeSql('delete from purchaseorder');
	   
	 
 }
	 function insertBrandchangeFormOfflineUpdateCB(tx,results){
		// alert("inserting");
		   var length=results.rows.length;
		  // alert(length);
		   var count=0;
		 
		   $.mobile.showPageLoadingMsg("a", "Processing wait...");
		   if(length>0){
			   
			   $.each(results.rows,function(index){
				   
		           var row = results.rows.item(index);
		          /* alert(row);
		           
		           alert(row['Shift_ID']+row['Supervisor_ID']+row['Machine_ID']+row['BrandFrom_ID']+row['BrandTo_ID']+row['Operator']+row['SpecNumber']);
		           alert(row['TimeTarget']+row['TimeAchived']+row['TimeVariance']);
		           alert(row['StartDateTime']+row['EndDateTime']+row['CreatedDate']);*/
		          
		           status=true;
		           
		    $.ajax({
		        url: 'http://192.168.1.40/impact/Services/BrandChange/brandchange.svc/brandchange/offlinedemo',
		        type: 'POST',
		        contentType: 'application/json',
		        data: JSON.stringify({demodetaildata: {"item_id":row['Item_ID'],"quality":row['Mark'],"quantity":row['Quantity'],"godown":row['Godown'],"customer":row['Customer']}}),
		        success: function (result) {
		        			
		  			       if(result==true){
		  			    	   count++;
		  			       }
		  			    	
		  			    	if(count==length){
		  			    	 navigator.notification.alert("Synchronise Sucessfully",allertCallback,"Alert");
		  			    	 deleteRecords();
		  			    	resetValues();
		  			    	$.mobile.hidePageLoadingMsg();
		  			    	}
		  			    		
		  			       
		  			     
		  			       
		  			     	 
		        },
		        error:function(e){
		      	  navigator.notification.alert("Error:"+e.Status,allertCallback,"Error");
		      	  $.mobile.hidePageLoadingMsg();
		        }
		    }); 
		    
			   });
		   }else{
			   
			   navigator.notification.alert("No Records To Update",allertCallBack,"Alert");
		   }
		   
	   }
	function getValues(){
		itemid=$('#Item_id').val();
		 quality=$('#quality option:selected').text();
		 godown=$('#godown option:selected').text();
		 quantity=$('#quantity').val();
		 customer=$('#customer').val();
	}
	function resetValues(){
		$('#Item_id').val('');
		$('#quality option:first').attr("selected", true);
		$("#quality").selectmenu('refresh');
		//$('#godown option:selected').text();
		$('#godown option:first').attr("selected", true);
		$("#godown").selectmenu('refresh');
		$('#quantity').val('');
		$('#customer').val('');
	
		}
	function confirmOfflineUpdate(){
		 if(updatelength