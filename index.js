/*Index.html*/
	$(document).ready(function(){
		$('#Guerrero').corner();
		$('#Clérigo').corner();
		$('#Valkiria').corner();
		var seleccionado="";
		var personajes=['Guerrero','Clérigo','Valkiria'];
		$('form').hide();
		
		$('#seleccionJugadores li img').click(function(){
			if(seleccionado==this.id){		
				seleccionado="";
				validarSeleccion=false;
				$('#'+this.id).css('border','none');  
			}else{		
				switch(this.id){
				case 'Guerrero': index=0;
				break;
				case 'Clérigo':index=1;
				break;
				case 'Valkiria': index=2; 		
				break;
				}

			seleccionado=this.id;
			$('form').show();
			$('#Guerrero').css('border','none');
			$('#Clérigo').css('border','none');
			$('#Valkiria').css('border','none');
			$('#'+personajes[index]).css('border','3px solid blue');
		 }
    });
});

/*------------------------------------------------------------------------------------*/

	
	