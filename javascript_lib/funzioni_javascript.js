/* purtroppo non vede (non riesce a risolvere) le varibili/attributi di JSP come ${url_dispatcher}, 
 * quindi scrive come stringa proprio "${url_dispatcher}" */

function logout(){
	$.ajax( {
		   url: "${url_dispatcher}",
		   type: "POST",
		   async: true,
		   timeout: 15000, //timeout di 15 secondi per l richiesta
		   statusCode: {
		     404: function() {
		       alert("La risorsa non è disponibile. Provare ad effettuare il logout\n in un secodo momento (Page not found)");
		     },
		     200: function() {
		       //alert("Status OK");
		     }
		   },
		   beforeSend: function(jqXHR, settings){
			   var objData = JSON.parse(settings.data);
			   if (objData.reqType != "rileva_utente_corrente_connesso"){
			      $("div#loadingDiv").show();
			   }
		   },
		   //contentType: "application/x-www-form-urlencoded; charset=UTF-8", //this is the default value for request (to a more appropriate MIME type)
		   //contentType: "application/json; charset=UTF-8", //this is only for JSON
		   dataType: "json", //data type of request
		   mimeType: "application/json; charset=UTF-8", //data type of response 
		   data: "{\"reqType\":\"logout\",\"ArrayObjInterno\":[]}"})
			   .done(function(data, textStatus, jqXHR) { 
				    text = JSON.stringify(data);
					OBJ = JSON.parse(text);
					/*alert("Ajax Success. textStatus = "+textStatus+", data = "+data+", jqXHR = "+jqXHR);
					if(typeof data == "object")
						alert((typeof data)+", "+data.date);
					alert("OBJ.ok: "+OBJ.ok+", OBJ.codeError: "+OBJ.codeError);
					alert($(data));*/
					alert(OBJ.message);
					
					if(OBJ.ok == true){
						location.replace("${url_index}");
					}
				})
		       .fail(function() { /*alert("error");*/ })
		       .always(function(data_jqXHR, textStatus, jqXHR_errorThrown) { 
					if(data_jqXHR.reqType != "rileva_utente_corrente_connesso"){
						$("div#loadingDiv").hide();
					}
				});

}