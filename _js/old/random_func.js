
function testess(){
	g=new Random();
	let radios = document.getElementsByTagName('input');
	let selecteds = [];
	let t;
	for (var i = 0, length = radios.length; i < length; i++) {
	  if (radios[i].checked) {
		selecteds.push(radios[i].value);
	  }
	}
	if(selecteds[2]!="auto"){
		g.seed=document.getElementById('Smanual').value;
	}
	g.a=document.getElementById('Ga').value;
	g.c=document.getElementById('Gc').value;
	g.m=document.getElementById('GM').value;
	if(selecteds[2]!="auto"){
		g.seed=document.getElementById('Smanual').value;
	}
	if(selecteds[1]=="uni"){
		t=g.run(document.getElementById("runs").value, selecteds[1],document.getElementById('a').value,document.getElementById('b').value);
	}
	if(selecteds[1]=="range"){
		t=g.run(document.getElementById("runs").value, selecteds[1],document.getElementById('Ra').value,document.getElementById('Rb').value);
	}
	if(selecteds[1]=="expo"){
		t=g.run(document.getElementById("runs").value, selecteds[1],document.getElementById('Emean').value,0);
	}
	if(selecteds[1]=="uni01"){
		t=g.run(document.getElementById("runs").value, selecteds[1],0,0);
	}
	console.log(g.seed);
	
	let canvas = document.getElementById("myCanvas");
/*	canvas.id="myCanvas";
	canvas.width=300;
	canvas.height=200;
	canvas.style="border:1px solid #d3d3d3";	
*/	let ctx=canvas.getContext("2d");
	ctx.clearRect(0, 0, 300, 400);
	ctx.font="10px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	let j;
	for (j = 0; j < t.length; j++) {
		ctx.fillText(t[j], canvas.width/2, 20*j+15);
		}
//	document.getElementById("solution").appendChild(canvas);
	return t;
}




function run_desempenho_mm1(){
	
	if( document.getElementById('GL').value >= document.getElementById('GM').value){
		alert("A taxa de chegada deve ser inferior à taxa de serviço, senão a fila cresce indefinidamente!");
		document.getElementById("GL").value="";
		document.getElementById("GM").value="";
		let canvas = document.getElementById("myCanvas");
		let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		return 0;
	}else{
		let t1=[];
		let t2=[];
		let t;
		let ret = [];
		let aux;

		g=new FilasMM1(document.getElementById('GL').value,document.getElementById('GM').value,document.getElementById('Gc').value,document.getElementById('GN').value);

		t1.push("Lambda = ");
		t2.push(document.getElementById('GL').value);
		t1.push("Mi = ");
		t2.push(document.getElementById('GM').value);

		aux="Lambda = " + document.getElementById('GL').value;
		ret.push(aux);
		aux="Mi = " + document.getElementById('GM').value;
		ret.push(aux);

		t1.push("Lambda Efetivo = ");
		t2.push(g.L_eff());
		t1.push("Rho/c = ");
		t2.push(g.Rho_c());
		t1.push("L = ");
		t2.push(g.Ls());
		t1.push("Lq = ");
		t2.push(g.Lq());
		t1.push("W = ");
		t2.push(g.Ws());
		t1.push("Wq = ");
		t2.push(g.Wq());
		t=g.Pn_acumulada();

		aux="Rho/c = " + g.Rho_c();
		ret.push(aux);
		aux="Lambda efetivo = " + g.L_eff();
		ret.push(aux);
		aux="L = " + g.Ls();
		ret.push(aux);
		aux="Lq = " + g.Lq();
		ret.push(aux);
		aux="W = " + g.Ws();
		ret.push(aux);
		aux="Wq = " + g.Wq();
		ret.push(aux);
		aux="";
		ret.push(aux);


		let canvas = document.getElementById("myCanvas");
	/*	canvas.id="myCanvas";
		canvas.width=300;
		canvas.height=200;
		canvas.style="border:1px solid #d3d3d3";	
	*/	let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		ctx.font="10px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		let j;
		for (j = 0; j < t1.length; j++) {
			ctx.fillText(t1[j], 100, 10*j+15);
			ctx.fillText(t2[j], 200, 10*j+15);
			ctx.fillText(t1[j+1], 400, 10*j+15);
			ctx.fillText(t2[j+1], 500, 10*j+15);
			j++;
		}
		j=j/2 + 1;
		let k=0;
		let i=0;
		for (i = 0; i <= t.length/2; i++) {
			if(i==0){
				aux=t[i]+ "                           " + t[i+1]+ "                                          " +t[i+2];
				ret.push(aux);
			}else{
				aux=t[i]+ "             " + t[i+1]+ "             " +t[i+2];
				ret.push(aux);
			}
			ctx.fillText(t[i], 20, 20*(j+k)+15);
			ctx.fillText(t[i+1], 100, 20*(j+k)+15);
			ctx.fillText(t[i+2], 250, 20*(j+k)+15);
			i=i+2;
			k++;
		}
		k=0;
		let d = i;
		for (let l = i; l < t.length; l++) {
			//console.log(d==l);
			if(l==d){
//				aux="n"+ "                           " + "Pn"+ "                                          " +"Acumulado";
//				ret.push(aux);
				ctx.fillText("n", 330, 20*(j+k)+15);
				ctx.fillText("Pn", 420, 20*(j+k)+15);
				ctx.fillText("Acumulado", 580, 20*(j+k)+15);
				d--;
				l--;
			}else{
				aux=t[l]+ "             " + t[l+1]+ "             " +t[l+2];
				ret.push(aux);
				ctx.fillText(t[l], 330, 20*(j+k)+15);
				ctx.fillText(t[l+1], 420, 20*(j+k)+15);
				ctx.fillText(t[l+2], 580, 20*(j+k)+15);
				l=l+2;
			}
			k++;
		}

	//	document.getElementById("solution").appendChild(canvas);
		return ret;
		
	}
}


function run_desempenho_mm1n(){
	
	if( parseInt(document.getElementById('GN').value) > parseInt(document.getElementById('GN').max) ){
		alert("Comprimento de fila maior que o algoritmo suporta! Ajustado para "+document.getElementById('GN').max);
		document.getElementById("GN").value=document.getElementById('GN').max;
		let canvas = document.getElementById("myCanvas");
		let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		return 0;
	}else{
		let t1=[];
		let t2=[];
		let t;
		let ret = [];
		let aux;

		g=new FilasMM1N(parseInt(document.getElementById('GL').value),parseInt(document.getElementById('GM').value),parseInt(document.getElementById('Gc').value),parseInt(document.getElementById('GN').value) );

		t1.push("Lambda = ");
		t2.push(document.getElementById('GL').value);
		t1.push("Mi = ");
		t2.push(document.getElementById('GM').value);

		aux="Lambda = " + document.getElementById('GL').value;
		ret.push(aux);
		aux="Mi = " + document.getElementById('GM').value;
		ret.push(aux);

		t1.push("Lambda Efetivo = ");
		t2.push(g.L_eff());
		t1.push("Rho/c = ");
		t2.push(g.Rho_c());
		t1.push("L = ");
		t2.push(g.Ls());
		t1.push("Lq = ");
		t2.push(g.Lq());
		t1.push("W = ");
		t2.push(g.Ws());
		t1.push("Wq = ");
		t2.push(g.Wq());
		t=g.Pn_acumulada();

		aux="Rho/c = " + g.Rho_c();
		ret.push(aux);
		aux="Lambda efetivo = " + g.L_eff();
		ret.push(aux);
		aux="L = " + g.Ls();
		ret.push(aux);
		aux="Lq = " + g.Lq();
		ret.push(aux);
		aux="W = " + g.Ws();
		ret.push(aux);
		aux="Wq = " + g.Wq();
		ret.push(aux);
		aux="";
		ret.push(aux);


		let canvas = document.getElementById("myCanvas");
	/*	canvas.id="myCanvas";
		canvas.width=300;
		canvas.height=200;
		canvas.style="border:1px solid #d3d3d3";	
	*/	let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		ctx.font="10px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		let j;
		for (j = 0; j < t1.length; j++) {
			ctx.fillText(t1[j], 100, 10*j+15);
			ctx.fillText(t2[j], 200, 10*j+15);
			ctx.fillText(t1[j+1], 400, 10*j+15);
			ctx.fillText(t2[j+1], 500, 10*j+15);
			j++;
		}
		j=j/2 + 1;
		let k=0;
		let i=0;
		for (i = 0; i <= t.length/2; i++) {
			if(i==0){
				aux=t[i]+ "                           " + t[i+1]+ "                                          " +t[i+2];
				ret.push(aux);
			}else{
				aux=t[i]+ "             " + t[i+1]+ "             " +t[i+2];
				ret.push(aux);
			}
			ctx.fillText(t[i], 20, 20*(j+k)+15);
			ctx.fillText(t[i+1], 100, 20*(j+k)+15);
			ctx.fillText(t[i+2], 250, 20*(j+k)+15);
			i=i+2;
			k++;
		}
		k=0;
		let d = i;
		for (let l = i; l < t.length; l++) {
			//console.log(d==l);
			if(l==d){
//				aux="n"+ "                           " + "Pn"+ "                                          " +"Acumulado";
//				ret.push(aux);
				ctx.fillText("n", 330, 20*(j+k)+15);
				ctx.fillText("Pn", 420, 20*(j+k)+15);
				ctx.fillText("Acumulado", 580, 20*(j+k)+15);
				d--;
				l--;
			}else{
				aux=t[l]+ "             " + t[l+1]+ "             " +t[l+2];
				ret.push(aux);
				ctx.fillText(t[l], 330, 20*(j+k)+15);
				ctx.fillText(t[l+1], 420, 20*(j+k)+15);
				ctx.fillText(t[l+2], 580, 20*(j+k)+15);
				l=l+2;
			}
			k++;
		}

	//	document.getElementById("solution").appendChild(canvas);
		return ret;
		
	}
}


function run_desempenho_mmc(){
	let rhoc=0;
//	console.log(rhoc);
	rhoc= (document.getElementById('GL').value)/( document.getElementById('GM').value * document.getElementById('Gc').value);
	//console.log(rhoc);
	if( rhoc >= 1){
		alert("A taxa de ocupação dos servidores deve ser inferior a um, senão a fila cresce indefinidamente!");
		document.getElementById("GL").value="";
		document.getElementById("GM").value="";
		let canvas = document.getElementById("myCanvas");
		let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		return 0;
	}else{
		let t1=[];
		let t2=[];
		let t;
		let ret = [];
		let aux;

		g=new FilasMMc(document.getElementById('GL').value,document.getElementById('GM').value,document.getElementById('Gc').value,document.getElementById('GN').value);

		t1.push("Lambda = ");
		t2.push(document.getElementById('GL').value);
		t1.push("Mi = ");
		t2.push(document.getElementById('GM').value);

		aux="Lambda = " + document.getElementById('GL').value;
		ret.push(aux);
		aux="Mi = " + document.getElementById('GM').value;
		ret.push(aux);

		t1.push("Lambda Efetivo = ");
		t2.push(g.L_eff());
		t1.push("Rho/c = ");
		t2.push(g.Rho_c());
		t1.push("L = ");
		t2.push(g.Ls());
		t1.push("Lq = ");
		t2.push(g.Lq());
		t1.push("W = ");
		t2.push(g.Ws());
		t1.push("Wq = ");
		t2.push(g.Wq());
		t=g.Pn_acumulada();

		aux="Rho/c = " + g.Rho_c();
		ret.push(aux);
		aux="Lambda efetivo = " + g.L_eff();
		ret.push(aux);
		aux="L = " + g.Ls();
		ret.push(aux);
		aux="Lq = " + g.Lq();
		ret.push(aux);
		aux="W = " + g.Ws();
		ret.push(aux);
		aux="Wq = " + g.Wq();
		ret.push(aux);
		aux="";
		ret.push(aux);


		let canvas = document.getElementById("myCanvas");
	/*	canvas.id="myCanvas";
		canvas.width=300;
		canvas.height=200;
		canvas.style="border:1px solid #d3d3d3";	
	*/	let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		ctx.font="10px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		let j;
		for (j = 0; j < t1.length; j++) {
			ctx.fillText(t1[j], 100, 10*j+15);
			ctx.fillText(t2[j], 200, 10*j+15);
			ctx.fillText(t1[j+1], 400, 10*j+15);
			ctx.fillText(t2[j+1], 500, 10*j+15);
			j++;
		}
		j=j/2 + 1;
		let k=0;
		let i=0;
		for (i = 0; i <= t.length/2; i++) {
			if(i==0){
				aux=t[i]+ "                           " + t[i+1]+ "                                          " +t[i+2];
				ret.push(aux);
			}else{
				aux=t[i]+ "             " + t[i+1]+ "             " +t[i+2];
				ret.push(aux);
			}
			ctx.fillText(t[i], 20, 20*(j+k)+15);
			ctx.fillText(t[i+1], 100, 20*(j+k)+15);
			ctx.fillText(t[i+2], 250, 20*(j+k)+15);
			i=i+2;
			k++;
		}
		k=0;
		let d = i;
		for (let l = i; l < t.length; l++) {
			//console.log(d==l);
			if(l==d){
//				aux="n"+ "                           " + "Pn"+ "                                          " +"Acumulado";
//				ret.push(aux);
				ctx.fillText("n", 330, 20*(j+k)+15);
				ctx.fillText("Pn", 420, 20*(j+k)+15);
				ctx.fillText("Acumulado", 580, 20*(j+k)+15);
				d--;
				l--;
			}else{
				aux=t[l]+ "             " + t[l+1]+ "             " +t[l+2];
				ret.push(aux);
				ctx.fillText(t[l], 330, 20*(j+k)+15);
				ctx.fillText(t[l+1], 420, 20*(j+k)+15);
				ctx.fillText(t[l+2], 580, 20*(j+k)+15);
				l=l+2;
			}
			k++;
		}

	//	document.getElementById("solution").appendChild(canvas);
		return ret;
		
	}
}


function run_desempenho_mmcN(){
	
	if( parseInt(document.getElementById('GN').value) > parseInt(document.getElementById('GN').max) ){
		alert("Comprimento de fila maior que o algoritmo suporta! Ajustado para "+document.getElementById('GN').max);
		document.getElementById("GN").value=document.getElementById('GN').max;
		let canvas = document.getElementById("myCanvas");
		let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		return 0;
	}else{
		let t1=[];
		let t2=[];
		let t;
		let ret = [];
		let aux;

		g=new FilasMMcN(document.getElementById('GL').value,document.getElementById('GM').value,document.getElementById('Gc').value,document.getElementById('GN').value);

		t1.push("Lambda = ");
		t2.push(document.getElementById('GL').value);
		t1.push("Mi = ");
		t2.push(document.getElementById('GM').value);

		aux="Lambda = " + document.getElementById('GL').value;
		ret.push(aux);
		aux="Mi = " + document.getElementById('GM').value;
		ret.push(aux);

		t1.push("Lambda Efetivo = ");
		t2.push(g.L_eff());
		t1.push("Rho/c = ");
		t2.push(g.Rho_c());
		t1.push("L = ");
		t2.push(g.Ls());
		t1.push("Lq = ");
		t2.push(g.Lq());
		t1.push("W = ");
		t2.push(g.Ws());
		t1.push("Wq = ");
		t2.push(g.Wq());
		t=g.Pn_acumulada();

		aux="Rho/c = " + g.Rho_c();
		ret.push(aux);
		aux="Lambda efetivo = " + g.L_eff();
		ret.push(aux);
		aux="L = " + g.Ls();
		ret.push(aux);
		aux="Lq = " + g.Lq();
		ret.push(aux);
		aux="W = " + g.Ws();
		ret.push(aux);
		aux="Wq = " + g.Wq();
		ret.push(aux);
		aux="";
		ret.push(aux);


		let canvas = document.getElementById("myCanvas");
	/*	canvas.id="myCanvas";
		canvas.width=300;
		canvas.height=200;
		canvas.style="border:1px solid #d3d3d3";	
	*/	let ctx=canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 700);
		ctx.font="10px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		let j;
		for (j = 0; j < t1.length; j++) {
			ctx.fillText(t1[j], 100, 10*j+15);
			ctx.fillText(t2[j], 200, 10*j+15);
			ctx.fillText(t1[j+1], 400, 10*j+15);
			ctx.fillText(t2[j+1], 500, 10*j+15);
			j++;
		}
		j=j/2 + 1;
		let k=0;
		let i=0;
		for (i = 0; i <= t.length/2; i++) {
			if(i==0){
				aux=t[i]+ "                           " + t[i+1]+ "                                          " +t[i+2];
				ret.push(aux);
			}else{
				aux=t[i]+ "             " + t[i+1]+ "             " +t[i+2];
				ret.push(aux);
			}
			ctx.fillText(t[i], 20, 20*(j+k)+15);
			ctx.fillText(t[i+1], 100, 20*(j+k)+15);
			ctx.fillText(t[i+2], 250, 20*(j+k)+15);
			i=i+2;
			k++;
		}
		k=0;
		let d = i;
		for (let l = i; l < t.length; l++) {
			//console.log(d==l);
			if(l==d){
//				aux="n"+ "                           " + "Pn"+ "                                          " +"Acumulado";
//				ret.push(aux);
				ctx.fillText("n", 330, 20*(j+k)+15);
				ctx.fillText("Pn", 420, 20*(j+k)+15);
				ctx.fillText("Acumulado", 580, 20*(j+k)+15);
				d--;
				l--;
			}else{
				aux=t[l]+ "             " + t[l+1]+ "             " +t[l+2];
				ret.push(aux);
				ctx.fillText(t[l], 330, 20*(j+k)+15);
				ctx.fillText(t[l+1], 420, 20*(j+k)+15);
				ctx.fillText(t[l+2], 580, 20*(j+k)+15);
				l=l+2;
			}
			k++;
		}

	//	document.getElementById("solution").appendChild(canvas);
		return ret;
		
	}
}

