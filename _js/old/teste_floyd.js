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
	v1.max=formulario.vertices.value;
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
	v2.max=formulario.vertices.value;
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
	//custo.min=1;
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
		
		document.getElementById("disable3").value=10;
		document.getElementById("conex").value=10;
		console.log(document.getElementById("cD").checked);	
	
	
//	var formulario = document.getElementById("formulario");

}




function autofill_kruskal() {
	if(!document.getElementById("line1")){	
	
		document.getElementById("vertices").value = 6;
		//document.getElementById("vertices").disabled = true;

		document.getElementById("a10").value = 1;
		//document.getElementById("a10").disabled = true;

		document.getElementById("a20").value = 2;
		//document.getElementById("a20").disabled = true;
		
		document.getElementById("c0").value = 5;
		//document.getElementById("c0").disabled = true;

		for(let c=1; c<9; c++){
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
		
		document.getElementById("a18").value = 5;
		document.getElementById("a28").value = 6;
		document.getElementById("c8").value = 2;
		
		
		document.getElementById("disable3").value=9;
		document.getElementById("conex").value=9;
	}

}


function autofill_dijkstra() {
	if(!document.getElementById("line1")){	
	
		document.getElementById("vertices").value = 6;
		//document.getElementById("vertices").disabled = true;

		document.getElementById("a10").value = 1;
		//document.getElementById("a10").disabled = true;

		document.getElementById("a20").value = 2;
		//document.getElementById("a20").disabled = true;
		
		document.getElementById("c0").value = 5;
		//document.getElementById("c0").disabled = true;

		for(let c=1; c<9; c++){
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
		
		document.getElementById("a18").value = 5;
		document.getElementById("a28").value = 6;
		document.getElementById("c8").value = 2;
		
//		document.getElementById("cD").checked = false;
//		document.getElementById("cND").checked = true;
		document.getElementById("orig").value = 1;
		document.getElementById("dest").value = 6;
//		document.getElementById("cND").disabled = true;
		
		document.getElementById("disable3").value=9;
	}
	
}
