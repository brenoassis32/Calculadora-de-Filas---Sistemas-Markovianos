this.valores=new Array(new Array());
function teste(c) {
	var formulario = document.getElementById("formulario");
	
if(!document.getElementById("line"+c)){	
	var row=document.createElement("tr");
	row.id="line"+c;
	document.getElementById("tab1").appendChild(row);

	var td1=document.createElement("td");
	td1.id="v1"+c;
	document.getElementById("line"+c).appendChild(td1);
	
	var v1=document.createElement("input");
	v1.type="number";
	v1.name="a1"+c;
	v1.min=1;
//	v1.max=formulario.vertices.value;
	v1.id="a1"+c;
	v1.required=true;
	document.getElementById("v1"+c).appendChild(v1);

	var td2=document.createElement("td");
	td2.id="v2"+c;
	document.getElementById("line"+c).appendChild(td2);

	var v2=document.createElement("input");
	v2.type="number";
	v2.name="a2"+c;
	v2.min=1;
//	v2.max=formulario.vertices.value;
	v2.id="a2"+c;
	v2.required=true;
	document.getElementById("v2"+c).appendChild(v2);

	var td3=document.createElement("td");
	td3.id="custo"+c;
	document.getElementById("line"+c).appendChild(td3);

	var custo=document.createElement("input");
	custo.type="number";
	custo.name="c"+c;
//	if(document.title!='Floyd')
	custo.min=1;
	custo.id="c"+c;
	custo.required=true;
	custo.addEventListener("keypress",function (e){
		e=c+1;
		teste(e);
	},false);
	document.getElementById("custo"+c).appendChild(custo);
	formulario.disable3.value=parseInt(formulario.disable3.value)+1;
}
}
/*
function conexao(){
	var conex=pegarIndice();	
//	document.getElementById("btn4").value=pegarIndice();
	return conex;
}
*/
function retornaResposta(){
	var formulario = document.getElementById("formulario");
	var vertices= parseInt(formulario.vertices.value);
	var conex=(document.getElementById("tab1").childNodes.length)-4;
	var contador=0;
	var result;
	if(parseInt(formulario.orig.value)>vertices || parseInt(formulario.dest.value)>vertices || formulario.orig.value==0 || formulario.dest.value==0 || formulario.vertices.value==0){
		if(formulario.orig.value==0 || formulario.dest.value==0 || formulario.vertices.value==0){
			alert("Valores não preenchidos!");
		}else{
			alert("Preencha os campos de origem e destino corretamente!");
			document.getElementById("dest").value="";
			document.getElementById("orig").value="";
		}
	}else{
		g=new Grafo(vertices-1);
		for(var c=0;c<conex;c++){
			if(parseInt(document.getElementById("a1"+c).value)>vertices || parseInt(document.getElementById("a2"+c).value)>vertices || document.getElementById("a1"+c).value==0 || document.getElementById("a2"+c).value==0 || document.getElementById("c"+c).value==0){
				contador++;
				if(document.getElementById("a1"+c).value==0 || document.getElementById("a2"+c).value==0 || document.getElementById("c"+c).value==0){
					alert("Valores não preenchidos!");
				}
				if(parseInt(document.getElementById("a1"+c).value)>vertices || parseInt(document.getElementById("a2"+c).value)>vertices) {
				alert("Vértice inputado maior que o número de vértices declarado, preencha os campos corretamente!");
				document.getElementById("a1"+c).value="";
				document.getElementById("a2"+c).value="";
				document.getElementById("c"+c).value="";
				}
			}else{
				g.addAresta(document.getElementById("a1"+c).value,document.getElementById("a2"+c).value,document.getElementById("c"+c).value,document.getElementById("cND").checked);
			}
		}
		if(contador==0){
			//g.dijskra(formulario.orig.value,formulario.dest.value);
			result=g.dijskra(formulario.orig.value,formulario.dest.value);
			formulario.disable1.value=g.retornaValorCusto();
			formulario.disable2.value=g.retornaValorRota();
		}
	}
	return result;
}

function retornaResposta2(){//prim
	var formulario = document.getElementById("formulario");
	var vertices= parseInt(formulario.vertices.value);
	var conex=(document.getElementById("tab1").childNodes.length)-4;
	var contador1=0;
	var contador2=0;
	var result;
	if(formulario.vertices.value==0){
			alert("Valores não preenchidos!");
	}else{
		g=new Grafo(vertices-1);
		for(var c=0;c<conex;c++){
			if(document.getElementById("a1"+c).value>vertices || document.getElementById("a2"+c).value>vertices || document.getElementById("a1"+c).value==0 || document.getElementById("a2"+c).value==0 || document.getElementById("c"+c).value==0){
				contador1++;
				if(document.getElementById("a1"+c).value==0 || document.getElementById("a2"+c).value==0 || document.getElementById("c"+c).value==0){
					alert("Valores não preenchidos! Existem campos em branco");
				}
				if(document.getElementById("a1"+c).value>vertices || document.getElementById("a2"+c).value>vertices) {
				alert("Vértice inputado maior que o número de vértices declarado, preencha os campos corretamente!");
				}
			}else{
				g.addAresta(document.getElementById("a1"+c).value, document.getElementById("a2"+c).value, document.getElementById("c"+c).value)
				//if(document.getElementById("a1"+c).value==vertices || document.getElementById("a2"+c).value==vertices) {contador2++;}
			}
		}
		for(let t=1; t<=vertices; t++){
			for(let w=0;w<conex;w++){
				if(document.getElementById("a1"+w).value==t || document.getElementById("a2"+w).value==t) {
					contador2=parseInt(contador2)+parseInt(t);
					break;
				}
				
			}
		}
		//console.log(contador2);
		if(contador1==0 && contador2==(vertices*(vertices+1)/2)){
//			g.prim();
			result=g.prim();
			formulario.disable1.value=g.retornaValorCusto();
			formulario.disable2.value=g.retornaValorRota();
		}else{
			alert("Preencha os campos corretamente! O grafo está desconexo!");
			//document.getElementById("vertices").value="";			
		}
	}
	return result;
}


function retornaResposta3(){//ff
	var formulario = document.getElementById("formulario");
	var vertices= parseInt(formulario.vertices.value);
	var conex=(document.getElementById("tab1").childNodes.length)-4;
	var contador=0;
	var result;
	if(parseInt(formulario.orig.value)>vertices || parseInt(formulario.dest.value)>vertices || formulario.orig.value==0 || formulario.dest.value==0 || formulario.vertices.value==0){
		if(formulario.orig.value==0 || formulario.dest.value==0 || formulario.vertices.value==0){
			alert("Valores não preenchidos!");
		}else{
			alert("Preencha os campos de origem e destino corretamente!");
			document.getElementById("dest").value="";
			document.getElementById("orig").value="";
		}
	}else{
		g=new Grafo(vertices-1);
		for(var c=0;c<conex;c++){
			if(parseInt(document.getElementById("a1"+c).value)>vertices || parseInt(document.getElementById("a2"+c).value)>vertices || document.getElementById("a1"+c).value==0 || document.getElementById("a2"+c).value==0 || document.getElementById("c"+c).value==0){
				contador++;
				if(document.getElementById("a1"+c).value==0 || document.getElementById("a2"+c).value==0 || document.getElementById("c"+c).value==0){
					alert("Valores não preenchidos!");
				}
				if(parseInt(document.getElementById("a1"+c).value)>vertices || parseInt(document.getElementById("a2"+c).value)>vertices) {
				alert("Vértice inputado maior que o número de vértices declarado, preencha os campos corretamente!");
				document.getElementById("a1"+c).value="";
				document.getElementById("a2"+c).value="";
				document.getElementById("c"+c).value="";
				}
			}else{
				g.addAresta(document.getElementById("a1"+c).value,document.getElementById("a2"+c).value,document.getElementById("c"+c).value,document.getElementById("cD").checked);
			}
		}
		if(contador==0){
			//g.ff(formulario.orig.value,formulario.dest.value);
			result=g.ff(formulario.orig.value,formulario.dest.value);
			formulario.disable1.value=g.retornaValorCusto();
			formulario.disable2.value=g.retornaValorRota();
		}
	}
	return result;
}



function autofill() {
	if(document.getElementById("line1")){
		limpar();
	}	
	
		document.getElementById("vertices").value = 6;
		//document.getElementById("vertices").disabled = true;

		document.getElementById("a10").value = 1;
		//document.getElementById("a10").disabled = true;

		document.getElementById("a20").value = 2;
		//document.getElementById("a20").disabled = true;
		
		document.getElementById("c0").value = 5;
		//document.getElementById("c0").disabled = true;

		for(let c=1; c<=9; c++){
			var row=document.createElement("tr");
			row.id="line"+c;
			document.getElementById("tab1").appendChild(row);

			var td1=document.createElement("td");
			td1.id="v1"+c;
			document.getElementById("line"+c).appendChild(td1);
			
			var v1=document.createElement("input");
			v1.type="number";
			v1.name="a1"+c;
			//v1.min=1;
			v1.max=formulario.vertices.value;
			v1.id="a1"+c;
			v1.required=true;
			//v1.disabled=true;
			document.getElementById("v1"+c).appendChild(v1);

			var td2=document.createElement("td");
			td2.id="v2"+c;
			document.getElementById("line"+c).appendChild(td2);

			var v2=document.createElement("input");
			v2.type="number";
			v2.name="a2"+c;
			v2.min=1;
			v2.max=formulario.vertices.value;
			v2.id="a2"+c;
			v2.required=true;
			//v2.disabled=true;
			document.getElementById("v2"+c).appendChild(v2);

			var td3=document.createElement("td");
			td3.id="custo"+c;
			document.getElementById("line"+c).appendChild(td3);

			var custo=document.createElement("input");
			custo.type="number";
			custo.name="c"+c;
			//custo.disabled=true;
			//custo.min=1;
			custo.id="c"+c;
			custo.required=true;
			document.getElementById("custo"+c).appendChild(custo);

		} 

		document.getElementById("a11").value = 1;
		document.getElementById("a21").value = 4;
		document.getElementById("c1").value = 10;
		
		document.getElementById("a12").value = 1;
		document.getElementById("a22").value = 3;
		document.getElementById("c2").value = 4;
		
		document.getElementById("a13").value = 2;
		document.getElementById("a23").value = 4;
		document.getElementById("c3").value = 2;
		
		document.getElementById("a14").value = 2;
		document.getElementById("a24").value = 3;
		document.getElementById("c4").value = 2;
		
		document.getElementById("a15").value = 2;
		document.getElementById("a25").value = 5;
		document.getElementById("c5").value = 2;
		
		document.getElementById("a16").value = 3;
		document.getElementById("a26").value = 5;
		document.getElementById("c6").value = 5;
		
		document.getElementById("a17").value = 4;
		document.getElementById("a27").value = 5;
		document.getElementById("c7").value = 1;
		
		document.getElementById("a18").value = 4;
		document.getElementById("a28").value = 6;
		document.getElementById("c8").value = 3;
		
		document.getElementById("a19").value = 5;
		document.getElementById("a29").value = 6;
		document.getElementById("c9").value = 2;
		
		document.getElementById("cD").checked = false;
		document.getElementById("cND").checked = true;
		document.getElementById("orig").value = 1;
		document.getElementById("dest").value = 6;

		
		document.getElementById("disable3").value=10;
		document.getElementById("conex").value=10;
		console.log(document.getElementById("cD").checked);	
	
	
//	var formulario = document.getElementById("formulario");

}




function autofill_prim() {
//	if(!document.getElementById("line1")){	
	if(document.getElementById("line1")){
		limpar();
	}	
	
		document.getElementById("vertices").value = 6;
		//document.getElementById("vertices").disabled = true;

		document.getElementById("a10").value = 1;
		//document.getElementById("a10").disabled = true;

		document.getElementById("a20").value = 2;
		//document.getElementById("a20").disabled = true;
		
		document.getElementById("c0").value = 5;
		//document.getElementById("c0").disabled = true;

		for(let c=1; c<=9; c++){
			var row=document.createElement("tr");
			row.id="line"+c;
			document.getElementById("tab1").appendChild(row);

			var td1=document.createElement("td");
			td1.id="v1"+c;
			document.getElementById("line"+c).appendChild(td1);
			
			var v1=document.createElement("input");
			v1.type="number";
			v1.name="a1"+c;
			v1.min=1;
			v1.max=formulario.vertices.value;
			v1.id="a1"+c;
			v1.required=true;
			//v1.disabled=true;
			document.getElementById("v1"+c).appendChild(v1);

			var td2=document.createElement("td");
			td2.id="v2"+c;
			document.getElementById("line"+c).appendChild(td2);

			var v2=document.createElement("input");
			v2.type="number";
			v2.name="a2"+c;
			v2.min=1;
			v2.max=formulario.vertices.value;
			v2.id="a2"+c;
			v2.required=true;
			//v2.disabled=true;
			document.getElementById("v2"+c).appendChild(v2);

			var td3=document.createElement("td");
			td3.id="custo"+c;
			document.getElementById("line"+c).appendChild(td3);

			var custo=document.createElement("input");
			custo.type="number";
			custo.name="c"+c;
			//custo.disabled=true;
			custo.min=1;
			custo.id="c"+c;
			custo.required=true;
			document.getElementById("custo"+c).appendChild(custo);

		}

		document.getElementById("a11").value = 1;
		document.getElementById("a21").value = 4;
		document.getElementById("c1").value = 10;
		
		document.getElementById("a12").value = 1;
		document.getElementById("a22").value = 3;
		document.getElementById("c2").value = 4;
		
		document.getElementById("a13").value = 2;
		document.getElementById("a23").value = 4;
		document.getElementById("c3").value = 2;
		
		document.getElementById("a14").value = 2;
		document.getElementById("a24").value = 3;
		document.getElementById("c4").value = 2;
		
		document.getElementById("a15").value = 2;
		document.getElementById("a25").value = 5;
		document.getElementById("c5").value = 2;
		
		document.getElementById("a16").value = 3;
		document.getElementById("a26").value = 5;
		document.getElementById("c6").value = 5;
		
		document.getElementById("a17").value = 4;
		document.getElementById("a27").value = 5;
		document.getElementById("c7").value = 1;
		
		document.getElementById("a18").value = 4;
		document.getElementById("a28").value = 6;
		document.getElementById("c8").value = 3;
		
		document.getElementById("a19").value = 5;
		document.getElementById("a29").value = 6;
		document.getElementById("c9").value = 2;
		
		
		document.getElementById("disable3").value=10;
		document.getElementById("conex").value=10;
//	}

}


function autofill_dijkstra() {
//	if(!document.getElementById("line1")){	
	if(document.getElementById("line1")){
		limpar();
	}	
	
		document.getElementById("vertices").value = 6;
		//document.getElementById("vertices").disabled = true;

		document.getElementById("a10").value = 1;
		//document.getElementById("a10").disabled = true;

		document.getElementById("a20").value = 2;
		//document.getElementById("a20").disabled = true;
		
		document.getElementById("c0").value = 5;
		//document.getElementById("c0").disabled = true;

		for(let c=1; c<=9; c++){
			var row=document.createElement("tr");
			row.id="line"+c;
			document.getElementById("tab1").appendChild(row);

			var td1=document.createElement("td");
			td1.id="v1"+c;
			document.getElementById("line"+c).appendChild(td1);
			
			var v1=document.createElement("input");
			v1.type="number";
			v1.name="a1"+c;
			v1.min=1;
			v1.max=formulario.vertices.value;
			v1.id="a1"+c;
			v1.required=true;
			//v1.disabled=true;
			document.getElementById("v1"+c).appendChild(v1);

			var td2=document.createElement("td");
			td2.id="v2"+c;
			document.getElementById("line"+c).appendChild(td2);

			var v2=document.createElement("input");
			v2.type="number";
			v2.name="a2"+c;
			v2.min=1;
			v2.max=formulario.vertices.value;
			v2.id="a2"+c;
			v2.required=true;
			//v2.disabled=true;
			document.getElementById("v2"+c).appendChild(v2);

			var td3=document.createElement("td");
			td3.id="custo"+c;
			document.getElementById("line"+c).appendChild(td3);

			var custo=document.createElement("input");
			custo.type="number";
			custo.name="c"+c;
			//custo.disabled=true;
			custo.min=1;
			custo.id="c"+c;
			custo.required=true;
			document.getElementById("custo"+c).appendChild(custo);

		}

		document.getElementById("a11").value = 1;
		document.getElementById("a21").value = 4;
		document.getElementById("c1").value = 10;
		
		document.getElementById("a12").value = 1;
		document.getElementById("a22").value = 3;
		document.getElementById("c2").value = 4;
		
		document.getElementById("a13").value = 2;
		document.getElementById("a23").value = 4;
		document.getElementById("c3").value = 2;
	
		document.getElementById("a14").value = 2;
		document.getElementById("a24").value = 3;
		document.getElementById("c4").value = 2;
		
		document.getElementById("a15").value = 2;
		document.getElementById("a25").value = 5;
		document.getElementById("c5").value = 2;
		
		document.getElementById("a16").value = 3;
		document.getElementById("a26").value = 5;
		document.getElementById("c6").value = 5;
		
		document.getElementById("a17").value = 4;
		document.getElementById("a27").value = 5;
		document.getElementById("c7").value = 1;

		
		document.getElementById("a18").value = 4;
		document.getElementById("a28").value = 6;
		document.getElementById("c8").value = 3;

		
		document.getElementById("a19").value = 5;
		document.getElementById("a29").value = 6;
		document.getElementById("c9").value = 2;
		
//		document.getElementById("cD").checked = false;
//		document.getElementById("cND").checked = true;
//		document.getElementById("orig").value = 1;
//		document.getElementById("dest").value = 6;
//		document.getElementById("cND").disabled = true;
		
//		document.getElementById("disable3").value=9;
//	}

		document.getElementById("cD").checked = false;
		document.getElementById("cND").checked = true;
		document.getElementById("orig").value = 1;
		document.getElementById("dest").value = 6;

		
		document.getElementById("disable3").value=10;
		document.getElementById("conex").value=10;
		console.log(document.getElementById("cD").checked);	

	
}



function autofill_ff() { //ff
//	if(!document.getElementById("line1")){	
	if(document.getElementById("line1")){
		limpar();
	}	
	
		document.getElementById("vertices").value = 6;
		//document.getElementById("vertices").disabled = true;

		document.getElementById("a10").value = 1;
		//document.getElementById("a10").disabled = true;

		document.getElementById("a20").value = 2;
		//document.getElementById("a20").disabled = true;
		
		document.getElementById("c0").value = 5;
		//document.getElementById("c0").disabled = true;

		for(let c=1; c<=9; c++){
			var row=document.createElement("tr");
			row.id="line"+c;
			document.getElementById("tab1").appendChild(row);

			var td1=document.createElement("td");
			td1.id="v1"+c;
			document.getElementById("line"+c).appendChild(td1);
			
			var v1=document.createElement("input");
			v1.type="number";
			v1.name="a1"+c;
			v1.min=1;
			v1.max=formulario.vertices.value;
			v1.id="a1"+c;
			v1.required=true;
			//v1.disabled=true;
			document.getElementById("v1"+c).appendChild(v1);

			var td2=document.createElement("td");
			td2.id="v2"+c;
			document.getElementById("line"+c).appendChild(td2);

			var v2=document.createElement("input");
			v2.type="number";
			v2.name="a2"+c;
			v2.min=1;
			v2.max=formulario.vertices.value;
			v2.id="a2"+c;
			v2.required=true;
			//v2.disabled=true;
			document.getElementById("v2"+c).appendChild(v2);

			var td3=document.createElement("td");
			td3.id="custo"+c;
			document.getElementById("line"+c).appendChild(td3);

			var custo=document.createElement("input");
			custo.type="number";
			custo.name="c"+c;
			//custo.disabled=true;
			custo.min=1;
			custo.id="c"+c;
			custo.required=true;
			document.getElementById("custo"+c).appendChild(custo);

		}


		document.getElementById("a11").value = 1;
		document.getElementById("a21").value = 3;
		document.getElementById("c1").value = 4;
		
		document.getElementById("a12").value = 2;
		document.getElementById("a22").value = 4;
		document.getElementById("c2").value = 4;
		
		document.getElementById("a13").value = 2;
		document.getElementById("a23").value = 5;
		document.getElementById("c3").value = 2;
		
		document.getElementById("a14").value = 3;
		document.getElementById("a24").value = 2;
		document.getElementById("c4").value = 1;
		
		document.getElementById("a15").value = 3;
		document.getElementById("a25").value = 4;
		document.getElementById("c5").value = 2;
		
		document.getElementById("a16").value = 3;
		document.getElementById("a26").value = 5;
		document.getElementById("c6").value = 5;
		
		document.getElementById("a17").value = 4;
		document.getElementById("a27").value = 5;
		document.getElementById("c7").value = 1;
		
		document.getElementById("a18").value = 4;
		document.getElementById("a28").value = 6;
		document.getElementById("c8").value = 7;
		
		document.getElementById("a19").value = 5;
		document.getElementById("a29").value = 6;
		document.getElementById("c9").value = 5;



		document.getElementById("cD").checked = true;
		document.getElementById("orig").value = 1;
		document.getElementById("dest").value = 6;

		
		document.getElementById("disable3").value=10;
		document.getElementById("conex").value=10;

	
}
