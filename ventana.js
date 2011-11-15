AREA_ANCHO = 640;
AREA_ALTO =  480;
C_ANCHO = 19;
C_ALTO = 19;
GRID_MAX_X = 32;
GRID_MAX_Y = 24;
FPS = 5;
GRIS = "#8A8A8A";
COMIDA = "#E1DC48";

var area;
var c;

window.onload = function () {
	area = document.getElementById("area");
	c = area.getContext("2d");

	var juego = new Juego();
	juego.correr();
};

/******************************************************************************/
/* Pseudo Clase Cuadro
/******************************************************************************/

var Cuadro = function (x, y) {
	this.cuaX = x;
	this.cuaY = y;
	this.posX = (x-1) * (C_ANCHO + 1);
	this.posY = (y-1) * (C_ALTO + 1);
};

Cuadro.prototype.incDerecha = function () {
	this.posX = this.posX + (C_ANCHO + 1);
	this.cuaX++;
};

Cuadro.prototype.incArriba = function () {
	this.posY = this.posY - (C_ALTO + 1);
	this.cuaY--;
};

Cuadro.prototype.incAbajo = function () {
	this.posY = this.posY + (C_ALTO + 1);
	this.cuaY++;
};

Cuadro.prototype.incIzquierda = function () {
	this.posX = this.posX - (C_ANCHO + 1);
	this.cuaX--;
};

Cuadro.prototype.getX = function () {
	return this.cuaX;
};

Cuadro.prototype.getY = function () {
	return this.cuaY;	
};

Cuadro.prototype.dibujar = function (color) {
	c.fillStyle = color;
	c.fillRect(this.posX+1,this.posY+1,C_ANCHO,C_ALTO);	
};

/******************************************************************************/
/* Pseudo Clase Mundo
/******************************************************************************/
var Mundo = function () {    /*crea el mundo*/
	this.xmax = AREA_ANCHO / (C_ANCHO + 1);
	this.ymax = AREA_ALTO / (C_ALTO + 1);
};
	
Mundo.prototype.dibujar = function () {
	var x;
	var y;
	var pasox;
	var pasoy;
		
	c.strokeStyle = "#fff";
	c.lineWidth = 1;
		
	c.beginPath();

	// dibuja las lineas verticales	
	pasox = C_ANCHO + 1;
	for (x=1; x<=AREA_ANCHO; x+=pasox) {
		c.moveTo(x,AREA_ALTO);
		c.lineTo(x,0);
		c.stroke();
	}
	
	pasoy = C_ALTO + 1;
		// dibuja las lineas horizontales
	for (y=1; y<=AREA_ALTO; y+=pasoy) {
		c.moveTo(0,y);
		c.lineTo(AREA_ANCHO,y);
		c.stroke();
	}
		
	c.closePath();			
};
/******************************************************************************/


/******************************************************************************/
/* Pseudo Clase Serpiente
/******************************************************************************/

var Jugador = function () {
 	this.cuerpo = new Array();
 	this.cuerpo[0] = new Cuadro(12,12);
 	this.direccion = 1;
};

Jugador.prototype.dibujar = function () {
	var i;	

	for (i=0; i<=this.cuerpo.length-1; i++) {
		this.cuerpo[i].dibujar(GRIS);		
	}
};

Jugador.prototype.avanzar = function () {	
	var i;
	var x, y;
	
	for (i=this.cuerpo.length-1; i>=1; i--) {
		// se pasan las coordenadas del i-1 al i
		x = this.cuerpo[i-1].getX();
		y = this.cuerpo[i-1].getY();
		
		// se agrega un nuevo cuadro
		cuadro = new Cuadro(x,y);
		this.cuerpo[i] = cuadro;
	}	
    
	switch (this.direccion) {
		case 0:			
			this.cuerpo[0].incArriba();	
		break;
		
		case 1:
			this.cuerpo[0].incDerecha();
		break;
		
		case 2:
			this.cuerpo[0].incIzquierda();	
		break;
		
		case 3:
			this.cuerpo[0].incAbajo();	
		break;
	}
		
};

Jugador.prototype.crecer = function () {	
	
	var i;
	var nuevoX;
	var nuevoY;	
	
	// se obtienen las coordenadas del ultimo cuadrito
	var ultimoX = this.cuerpo[this.cuerpo.length-1].getX();
	var ultimoY = this.cuerpo[this.cuerpo.length-1].getY();	
	
	switch (this.direccion) {
		case 0:
			nuevoX = ultimoX;
			nuevoY = ultimoY+1;
		break;
		
		case 1:
			nuevoX = ultimoX-1;
			nuevoY = ultimoY;
		break;
		
		case 2:
			nuevoX = ultimoX+1;
			nuevoY = ultimoY;
		break;
		
		case 3:
			nuevoX = ultimoX;
			nuevoY = ultimoY-1;
		break;
	}	
};

Jugador.prototype.enroscada = function () {
	var i;
	var cabezaX = this.cuerpo[0].getX();
	var cabezaY = this.cuerpo[0].getY();	
	var rosca = false;
		
	
	for (i=1; i<=this.cuerpo.length-1; i++) {
		if ((cabezaX == this.cuerpo[i].getX()) && (cabezaY == this.cuerpo[i].getY()))
			rosca = true;
	}
	
	return rosca;
};

Jugador.prototype.cambiarDir = function (direccion) {	
	this.direccion = direccion;	
};

Jugador.prototype.getposX = function () {
	return this.cuerpo[0].getX();
};

Jugador.prototype.getposY = function () {	
	return this.cuerpo[0].getY();
};

/******************************************************************************/


/******************************************************************************/
/* Pseudo Clase Manejador de Eventos
/******************************************************************************/

var ManejadorDeEventos = function(jugador) {
	
	this.tecla = function(e) {
	
			// se obtiene el evento
			var evento = e || window.event;						
		
			switch (evento.keyCode) {
				case 97:
					jugador.cambiarDir(2);
				break;
		    
				case 100:
					jugador.cambiarDir(1);
				break;
		    
				case 115:
					jugador.cambiarDir(3);				
				break;	
		    
				case 119:
					jugador.cambiarDir(0);				
				break;
			}				
		
			return 0;
	};
	
	document.body.addEventListener('keypress', this.tecla, false);
};

/******************************************************************************/
/* Pseudo Clase Alimento
/******************************************************************************/

var Alimento = function () {
	this.cuadro;
	this.crear();
};

Alimento.prototype.crear = function () {
	
	var x,y;
	
	x = 1 + Math.floor(Math.random() * GRID_MAX_X);
	y = 1 + Math.floor(Math.random() * GRID_MAX_Y);
	
	this.cuadro = new Cuadro(x,y);	
	
	return this.cuadro;
};

Alimento.prototype.dibujar = function () {
	this.cuadro.dibujar(COMIDA);	
};

Alimento.prototype.getX = function () {
	return this.cuadro.getX();
};

Alimento.prototype.getY = function () {
	return this.cuadro.getY();
};

/******************************************************************************/


/******************************************************************************/
/* Pseudo Clase Juego
/******************************************************************************/

var Juego = function () {

	// var intervalId = setInterval(this.correr, 1000 / JUEGO_FPS);	
	this.mundo = new Mundo();
	this.juga = new Jugador();
	this.comida = new Alimento();
		
	this.manejador = new ManejadorDeEventos(this.juga);
	
	// tecnica para resolver el problema del setInterval que pierde la referencia al objeto del metodo
	// que se le pasa como parametro
	var date = new Date();
	this.key = date.getTime() + date.getMilliseconds(); // Genero una key, se pueden usar otras técnicas
	objetosMiClase = new Array();
	objetosMiClase[this.key] = this; // La instancia se guarda a sí misma en la colección	
	this.intervalo = this.iniciarIntervalo();
};

Juego.prototype.correr = function () {
	
	this.juga.avanzar();
	this.chequear();
	area.width = area.width;
		
	this.mundo.dibujar();
	this.comida.dibujar();
	this.juga.dibujar();	
	
};

Juego.prototype.iniciarIntervalo = function () {
	var intervalId = setInterval('objetosMiClase[' + this.key + '].correr()',1000/ FPS);
	return intervalId;
};

Juego.prototype.reset = function () {
	this.intervalo.clear;
	var juego = new Juego;
	juego.correr();
};

Juego.prototype.fin = function () {
	alert("Perdiste! Presiona Aceptar para comenzar de nuevo");
	this.reset();
};

Juego.prototype.chequear = function () {	
	var x,y;
	
	// posicion de la cabeza de la serpiente
	x = this.juga.getposX();
	y = this.juga.getposY();
	
	// chequeo de fin de juego
	if ((x>GRID_MAX_X) || (x<1) || (y<1) || (y>GRID_MAX_Y) || (this.juga.enroscada())) {
		this.fin();
	}

	// chequeo de comida
	if ((x==this.comida.getX()) && (y==this.comida.getY())) {
		this.juga.crecer();
		this.comida.crear();
	}	
};

/******************************************************************************/

