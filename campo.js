
var tablero,fondo,militar,boom,label,bombas,minas,silencio;
var i = true;

var Grafico = function(url)
{
	this.imagen = new Image();
	this.imagen.src = url;
	this.X = 0;
	this.Y = 0;
}
Grafico.prototype.confirmar = function()
{	
	Dibujar();
};

var teclas = {

	Up: 38,
	Down: 40,
	Left: 37,
	Right: 39
};


var pos = [0,0];

function Inicio() 
{

	aleatorio();

	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d");

	label = document.getElementById("label");

	var silencio = document.getElementById("Mute");

	silencio.addEventListener("click",silenciar);

	fondo = new Grafico("suelo.jpg");
	militar = new Grafico("militar.png");
	boom = new Grafico("boom.png");
	soldado = new Grafico("soldado.png");

	fondo.imagen.onload = fondo.confirmar;
	militar.imagen.onload = militar.confirmar

	document.addEventListener("keydown",teclado);

} 

function Dibujar()
{
	tablero.drawImage(fondo.imagen, fondo.X, fondo.Y);

	if( minas[pos[1]][pos[0]] == 1)
	{
		var posx = pos[0]*100;
		var posy = pos[1]*100; 
		tablero.drawImage(boom.imagen, posx, posy);
		label.innerText = "Perdiste!. Vuelve a intentar!";
		militar.X = 0;
		militar.Y = 0;
		pos[0]=0;
		pos[1]=0;
		tablero.drawImage(militar.imagen, militar.X, militar.Y);

	}
	else if( minas[pos[1]][pos[0]] == "Fin")
	{
		var posx = pos[0]*100;
		var posy = pos[1]*100; 
		tablero.drawImage(soldado.imagen, 300,300);
		document.removeEventListener("keydown",teclado);
		label.style.color = "green";
		label.innerText = "Ganaste!.. Felicitaciones Soldado.";
		var boton = document.getElementById("boton");
		boton.style.visibility = "visible";
		boton.addEventListener("click",reiniciar);
			
	}
    else
    {
    	tablero.drawImage(militar.imagen, militar.X, militar.Y);
    	label.innerText = "";

    }
  
	
}
function reiniciar()
{
	aleatorio();
	label.innerText = "";
	boton.style.visibility = "hidden";
	boton.removeEventListener("click",reiniciar);
	militar.X = 0;
	militar.Y = 0;
	pos[0]=0;
	pos[1]=0;
	tablero.drawImage(fondo.imagen, fondo.X, fondo.Y);
	tablero.drawImage(militar.imagen, militar.X, militar.Y);
	document.addEventListener("keydown",teclado);


}

function teclado(evento)
{
	var codigo = evento.keyCode;

	if (codigo==teclas.Up)
	{	
		if (militar.Y > 0)
		{
			militar.Y -= 100;
			pos[1] -= 1 ;  
		}
	}

	else if (codigo==teclas.Down)
	{
		if (militar.Y < 500)
		{
			militar.Y += 100;
			pos[1] += 1;
		}
	}

	else if (codigo==teclas.Left)
	{
		if (militar.X > 0)
		{
			militar.X -= 100;
			pos[0] -= 1;		}
	}
	else if (codigo==teclas.Right)
	{	
		if (militar.X < 500)
		{
			militar.X += 100;
			pos[0] += 1;
		}
	}

	Dibujar();

}

function aleatorio()
{
	bombas = new Array(17);
	for (var i = bombas.length-1; i >= 0; i--) 
	{
		var numero = Math.round(Math.random());
		bombas[i]=numero;
	};
	minas = [[ "Inicio", 0, bombas[0], bombas[1], bombas[2], bombas[3] ],
			 [ bombas[4], 0, bombas[5], 0, 0, 0 ],
			 [ 0, 0, bombas[6], 0, bombas[7], 0 ],
			 [ 0, bombas[8], bombas[9], 0, bombas[10], 0 ],
			 [ 0, 0, 0, 0, bombas[11], 0 ],
			 [ bombas[12], bombas[13], bombas[14], bombas[15], bombas[16], "Fin" ]];
	
}

function silenciar()
{
	var audio = document.getElementById("audio");

	if(i==true)
	{
		document.getElementById("Mute").value = "Play Music";
		audio.muted = true;
		i = false;
	}
	else if(i==false)
	{
		i = true;
		document.getElementById("Mute").value = "Stop Music";
		audio.muted = false;

	}

}


