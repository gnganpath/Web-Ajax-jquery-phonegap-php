��USBC�(P
     
* �C�         �ނ=���                       �e    oe            (          @             (   (                     �a�����e                    h          @             (   H                        �    H�    ��             �    H�    H�           �e    �e    �e    x          @              ( P x   @  H      �      �z5     P      ��     ~�     H�    He�=���               < l o g i n . j s     �e    �e    �e    h          @ ��/*    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        checkConnection();
    } 

function checkConnection() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }*/
  



function loginvalidate()
        {
            var x=document.forms["login"]["empid"].value
            
            
            if(x==null || x=="")
            {
                alert("EmployeeId Cannot Be Left Blank");
                return false;   
            }
            
            
var x=document.forms["login"]["passwordd"].value
            
            
            if(x==null || x=="")
            {
                alert("password Cannot Be Left Blank");
                return false;  
             }
            else
            {
                
                return true;
            }
 
        }
        
var name,pwd;
        function loginready()
        {
            
            name=document.getElementById('empid').value;
            pwd= document.getElementById('passwordd').value;

            
           // alert(name +""+pwd);
            
            var ajax=new XMLHttpRequest(); 
           // alert("ajax");

            ajax.onreadystatechange=function()
            {             
alert("s");
               
            if(ajax.readyState==4 ) 
               {
            	alert("status 4");
              if(ajax.status==200){
                                
                   alert("a");
                       
           if(ajax.responseText==1)
           {
            alert("Login Successfully");
            //setCookie("empid", name, 1);           
            window.location='options1.html';
           }
           else if(ajax.responseText==0)
           {
               alert("Login failed");
           }

      
              }
               }