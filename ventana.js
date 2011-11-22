 /*Ventana.html*/
 	var seleccionado="";
	$(document).ready(function(){
		$('#juego').hide();
		$('#Guerrero').corner();
		$('#Clérigo').corner();
		$('#Valkiria').corner();
		var personajes=['Guerrero','Clérigo','Valkiria'];
		$('#ingreso').hide();
		$('#lucha').hide();
		
		$('#seleccionJugadores li img').click(function(){
			if(seleccionado==this.id){		
				seleccionado="";
				$('#ingreso').hide();
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
  var ctx2;
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
  var troll = new myrectangle(120,40,20,20,"rgb(0,204,0)",5,10,10,5,0);
  var troll2 = new myrectangle(120,140,20,20,"rgb(255,0,51)",5,10,10,5,0);
  var orco = new myrectangle(100,240,20,20,"rgb(51,153,255)",10,12,20,10,0);
  var llave = new myrectangle(120,260,20,20,"rgb(255,255,102)",0,0,0,0,0);
  
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
	colision();
    return false;} 
  }
  
  function bajar(personaje){
    if(personaje.sy > 260){
	return false;
	}else{
	personaje.sy += Number(20);
    draMap(mapa1);
	colision();
    return false;}  
  }
  
  function retroceder(personaje){
	if(personaje.sx < 20){
	return false;
	}else{
    personaje.sx -= Number(20);
    draMap(mapa1);
	colision();
    return false;}  
  }
  
  function subir(personaje){
	if(personaje.sy < 20){
	return false;
	}else{
    personaje.sy -= Number(20);
    draMap(mapa1);
	colision();
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
				colision();
				break;
				
			case 65:   
				retroceder(personaje); 
				moverEnemigos();
				colision();
				break;
			
			case 83:   
				bajar(personaje);
				moverEnemigos();
				colision();
				break;
				
			case 68:   
				avanzar(personaje);
				moverEnemigos();
				colision();
				break;
		}
}
function colision(){

	if(troll.sx==troll2.sx && troll.sy==troll2.sy){
		moverEnemigos();
	}
		if(troll.sx==orco.sx && troll.sy==orco.sy){
			moverEnemigos();
		}
			if(troll2.sx==orco.sx && troll2.sy==orco.sy){
				moverEnemigos();
			}
				if(troll.sx==llave.sx && troll.sy==llave.sy){
					moverEnemigos();
				}
					if(troll2.sx==llave.sx && troll2.sy==llave.sy){
						moverEnemigos();
					}
						if(troll2.sx==llave.sx && troll2.sy==llave.sy){
							moverEnemigos();
						}
						
							if(personaje.sx==troll.sx && personaje.sy==troll.sy){
									alert('golpeaste al troll');
									$('#arriba').hide();
									$('#botones').hide();
									$('#lucha').show();
									
								}
									if(personaje.sx==troll2.sx && personaje.sy==troll2.sy){
										alert('golpeaste al troll 2');
										$('#arriba').hide();
										$('#botones').hide();
										$('#lucha').show();
										
									}
										if(personaje.sx==orco.sx && personaje.sy==orco.sy){
													alert('golpeaste al orco');
													$('#arriba').hide();
													$('#botones').hide();
													$('#lucha').show();	
										}
											if(personaje.sx==llave.sx && personaje.sy==llave.sy){
													
											}
}
