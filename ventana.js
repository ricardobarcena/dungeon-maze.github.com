 /*Ventana.html*/
	$(document).ready(function(){
		$('#juego').hide();
		$('#Guerrero').corner();
		$('#Clérigo').corner();
		$('#Valkiria').corner();
		var seleccionado="";
		var personajes=['Guerrero','Clérigo','Valkiria'];
		$('#ingreso').hide();
		
		$('#seleccionJugadores li img').click(function(){
			if(seleccionado==this.id){		
				seleccionado="";
				$('#ingreso').hide();
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
			$('#ingreso').show();
			$('#Guerrero').css('border','none');
			$('#Clérigo').css('border','none');
			$('#Valkiria').css('border','none');
			$('#'+personajes[index]).css('border','3px solid blue');
		 }
    });
});

function mostrarJuego(){
		$('#container2').hide();
		$('#juego').show();
	}
  
/*Ventana de Juego*/
  var cwidth = 400;
  var cheight = 300;
  var ctx;
  var everything = [];
  var tid;

 /*************************************************/
 
function myrectangle(sx,sy,swidth,sheight,stylestring){
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.fillstyle = stylestring;
    this.draw = drawrects;
  }
  
  function drawrects(){
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(this.sx,this.sy,this.swidth,this.sheight);
  }
  
  var personaje = new myrectangle(0,0,20,20,"rgb(0,50,100)");
  var troll = new myrectangle(120,40,20,20,"rgb(100,100,100)");
  var troll2 = new myrectangle(120,140,20,20,"rgb(50,50,50)");
  var orco = new myrectangle(100,240,20,20,"rgb(0,0,0)");
  
  everything.push(personaje);
  everything.push(troll);
  everything.push(troll2);
  everything.push(orco);
  
  function init(){
    ctx = document.getElementById('canvas').getContext('2d');
    drawall();
  }
  
  function drawall(){
    ctx.clearRect(0,0,cwidth,cheight);
    var i;
    for (i = 0; i < everything.length; i++){
      everything[i].draw();
    }
  }
  
  function avanzar(personaje){
    personaje.sx += Number(20);
    drawall();
    return false;  
  }
  
  function bajar(personaje){
    personaje.sy += Number(20);
    drawall();
    return false;  
  }
  
  function retroceder(personaje){
    personaje.sx += Number(-20);
    drawall();
    return false;  
  }
  
  function subir(personaje){
    personaje.sy += Number(-20);
    drawall();
    return false;  
  }
  
  
/*Movimiento de enemigos*/

function movimientoDeEnemigo(enemigo){
var random = Math.floor(Math.random()*4)+1;

switch(random){
	case 1: subir(enemigo);
	break;
	
	case 2: bajar(enemigo);
	break;
	
	case 3: avanzar(enemigo);
	break;
	
	case 4: retroceder(enemigo);
	break;
}
}
/*Movimiento de todos los enemigos*/

function moverEnemigos(){
var i;	
	for(i=0;i<=3;i++){
		if(i=1){
			movimientoDeEnemigo(troll);
		}
		if(i=2){
			movimientoDeEnemigo(orco);
		}
		if(i=3){
			movimientoDeEnemigo(troll2);
		}
	}
}
