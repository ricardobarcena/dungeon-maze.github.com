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
			$('#personaje').attr('value', 'Jugarás con '+personajes[index]);
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
  var mapa1 = [];
  var mapa3 = [];
  var mapa2 = [];

 /*************************************************/
 
function myrectangle(sx,sy,swidth,sheight,stylestring,ataque,defensa,dano,vida,dinero){
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.fillstyle = stylestring;
    this.draw = drawrects;
	this.ataque=ataque;
	this.defensa=defensa;
	this.dano=dano;
	this.vida=vida;
	this.dinero=dinero;
  }
  
  function drawrects(){
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(this.sx,this.sy,this.swidth,this.sheight);
  }
  
  var personaje = new myrectangle(0,0,20,20,"rgb(0,50,100)",10,10,10,0);
  var troll = new myrectangle(120,40,20,20,"rgb(100,100,100)",10,10,10,10,0);
  var troll2 = new myrectangle(120,140,20,20,"rgb(50,50,50)",10,10,10,10,0);
  var orco = new myrectangle(100,240,20,20,"rgb(0,0,0)",10,10,10,10,0);
  var llave = new myrectangle(120,260,20,20,"rgb(255,255,9)",10,10,10,10,0);
  
  mapa1.push(personaje);
  mapa1.push(troll);
  mapa1.push(troll2);
  mapa1.push(orco);
  mapa1.push(llave);
  
  function init(){
    ctx = document.getElementById('canvas').getContext('2d');
    draMap(mapa1);
  }
  function dibujarFondo(){
	var i;
	var j;
	var pasox=20;
	var pasoy=20; 

	ctx.beginPath();
	   //lineas verticales
		for(i=0; i<cwidth; i+=pasox){
			ctx.moveTo(i,cheight);
			ctx.lineTo(i,0);
			ctx.stroke();
		}
		//lineas horizontales
		for (j=0; j<cheight; j+=pasoy) {
			ctx.moveTo(0,j);
			ctx.lineTo(cwidth,j);
			ctx.stroke();
		}
		ctx.closePath();
};
  
  function draMap(map){
    ctx.clearRect(0,0,cwidth,cheight);
    var i;
    for (i = 0; i < map.length; i++){
      map[i].draw();
    }
	dibujarFondo();
  }
  
  function avanzar(personaje){
	if(personaje.sx > 360){
	return false;
	}else{
    personaje.sx += Number(20);
    draMap(mapa1);
    return false;} 
  }
  
  function bajar(personaje){
    if(personaje.sy > 260){
	return false;
	}else{
	personaje.sy += Number(20);
    draMap(mapa1);
    return false;}  
  }
  
  function retroceder(personaje){
	if(personaje.sx < 20){
	return false;
	}else{
    personaje.sx -= Number(20);
    draMap(mapa1);
    return false;}  
  }
  
  function subir(personaje){
	if(personaje.sy < 20){
	return false;
	}else{
    personaje.sy -= Number(20);
    draMap(mapa1);
    return false;}  
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

function movimientoTeclado(direccion){
			switch(direccion.keyCode){
			case 87:   
				subir(personaje); 
				moverEnemigos();
				break;
				
			case 65:   
				retroceder(personaje); 
				moverEnemigos();
				break;
			
			case 83:   
				bajar(personaje);
				moverEnemigos();
				break;
				
			case 68:   
				avanzar(personaje);
				moverEnemigos();
				break;
		}
}

