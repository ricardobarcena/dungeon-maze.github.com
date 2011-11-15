	
	var x1 = 0;
	var y1 = 0;	
	function moverJugador(direccion){
		switch(direccion.keyCode){
			case 38:   
					y -=5;
					document.getElementById("image").style.top = String(y)+"px";
				break;
				
				case 39:   
					x -=5;
					document.getElementById("image").style.right = String(x)+"px";
				break;
			
				case 40:   
					y +=5;
					document.getElementById("image").style.top = String(y)+"px";
				break;
				
				case 37:   
					x +=5;
					document.getElementById("image").style.right = String(x)+"px";
				break;
			
		}
	}
	