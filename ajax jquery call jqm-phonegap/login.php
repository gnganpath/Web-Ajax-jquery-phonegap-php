��USBC�(P
     
* �C�         z                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ��<?php
//include("db.php");

$con = mssql_connect('GANAPATHI-PC','sa','Kaspon123')or die("mssql database not connected");
  mssql_select_db('Demo', $con) or die("no db");

$username=$_POST['Name']; 
$password=$_POST['Pwd'];

/*$string = $password;
$key = ' kaspon '; // note the spaces
$encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $string, MCRYPT_MODE_CBC, md5(md5($key))));*/
//$password=$encrypted;
//$decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($encrypted), MCRYPT_MODE_CBC, md5(md5($key))), "\0");
//$retrivepassword="select passcode from admin where username='$username';
//$retrive=mysql_query($retrivepassword); 
//$password=md5($password); // Encrypted Pass