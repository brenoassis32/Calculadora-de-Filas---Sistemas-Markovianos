document.addEventListener("change",function(){//funcao enviar conexao
	document.getElementById("conex").value=document.getElementById("disable3").value;
	document.getElementById("a10").max=document.getElementById("vertices").value;
	document.getElementById("a20").max=document.getElementById("vertices").value;
},false);


function adicionar(){
	var c=(document.getElementById("tab1").childNodes.length)-4;
	teste(c);	
}

function limpar(){
	var list = document.getElementById("tab1");
	while(list.lastChild!=list.childNodes[4]){
		list.removeChild(list.lastChild);
	}
	document.getElementById("disable3").value=1;
}

function remover(){
	var list = document.getElementById("tab1");
	if(list.lastChild!=list.childNodes[4]){
		list.removeChild(list.lastChild);
		document.getElementById("disable3").value=parseInt(document.getElementById("disable3").value)-1;
	}
}

function hardreset(){
	limpar();
	document.getElementById("vertices").disabled = false;
	document.getElementById("a10").disabled = false;
	document.getElementById("a20").disabled = false;
	document.getElementById("c0").disabled = false;
	document.getElementById("cD").disabled = false;
	document.getElementById("cND").disabled = false;

	document.getElementById("vertices").value = 0;
	document.getElementById("a10").value = 0;
	document.getElementById("a20").value = 0;
	document.getElementById("c0").value = 0;
	document.getElementById("cD").checked = true;
}
