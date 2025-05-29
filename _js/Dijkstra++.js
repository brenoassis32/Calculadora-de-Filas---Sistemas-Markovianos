class Grafo
{

constructor(V)
{
	this.V = V;
	this.infinito=1000000;
	this.rotulado=[];
	this.nrotulado=[];
	this.d=[];
	this.p=[];
	this.custo=[];

	for(var i=0; i<V+1;i++){
		this.custo[i]=[];		
		this.rotulado[i]=-2;
		this.nrotulado[i]=i;
		for(var j=0; j<=V;j++) {
			this.custo[i][j]=this.infinito;
			if(i==j) this.custo[i][j]=0;
		}
	}		
}

addAresta(v1, v2, c, tipo)
{
	if(v1!=0 || v2!=0){ 
		if(tipo==1){
			this.custo[v1-1][v2-1]=c;
			this.custo[v2-1][v1-1]=c;
		}else this.custo[v1-1][v2-1]=c;
	}
}

dijskra(orig,dest)
{
	orig=orig-1;
	dest=dest-1;
	var n=this.V+1;
	var k=0;
	var contador=0;
	//Passo 1:	
	this.rotulado[orig]=orig;
	this.d[orig]=0;
	this.p[orig]=0;
	this.ultimo=orig;
	let ret = [];
	let nodes = [];
	let nodes2 = [];
	let aux, naux;

	aux="Passo 1:";
	ret.push(aux);
	aux="R = {"+(orig+1)+"};";
	ret.push(aux);

	for(var t=0; t<n; t++){
		nodes.push(t+1);
		if (this.nrotulado[t]==this.ultimo){
			if(t!=0){
				this.nrotulado[t]=-t;
			}else this.nrotulado[t]=-1;
		}
		if (this.nrotulado[t]==t) {
			this.d[t]=this.infinito;
			this.p[t]=parseInt(n)+1;
		}
	}

	nodes.splice(nodes.findIndex(function checknode(nodes) {return nodes == parseInt(orig+1);}),1);
	aux="NR = {"+nodes+"};";
	ret.push(aux);


	aux="d("+(orig+1)+") = "+ this.d[orig]+";    p("+(orig+1)+") = "+this.p[orig]+";";
	ret.push(aux);

	for(var t=1; t<n; t++){
		aux="d("+(t+1)+") = +inf;    p("+(t+1)+") = "+(this.V+2)+";";
		ret.push(aux);
	}

	//Passo 2:
	while(this.ultimo != dest){
	aux="Passo 2:";
	ret.push(aux);
	aux="k = "+k+";";
	ret.push(aux);
	var candidato=0; 
	var cand=1000000;
	for(let t=0; t<n; t++){
		if(t==this.nrotulado[t]){
			if( parseInt(this.d[t]) <= (parseInt(this.d[this.ultimo]) + parseInt(this.custo[parseInt(this.ultimo)][t])) ){
				if(parseInt(this.d[t])==parseInt(this.infinito)){
					naux="d("+(t+1)+") = +inf;";
					ret.push(naux);
				}else{
					naux="d("+(t+1)+") = "+this.d[t]+";    ";
					ret.push(naux);
				}

			}else{
				this.d[t]=parseInt(this.d[+this.ultimo]) + parseInt(this.custo[+this.ultimo][t]);
				naux="d("+(t+1)+") = "+this.d[t]+";    ";
				if(this.d[t]<this.infinito){
					this.p[t]=parseInt(this.ultimo)+1;
					naux+="p("+(t+1)+") = "+this.p[t] +";";
					ret.push(naux);
				}else {ret.push(naux);}
			}
			if(this.d[t]<=cand){
				cand=+this.d[t];
				candidato=t;
			}
			if(this.d[t]==this.infinito){
				contador++;
			}
		}
		
	}
	if(candidato!=0){
		this.nrotulado[candidato]=-candidato;
		this.rotulado[candidato]=candidato;
		}else{
			this.nrotulado[candidato]=-1;
			this.rotulado[candidato]=0;
		}
	this.d[candidato]=cand;
	this.ultimo = candidato;


	aux="R = {";
	for(t=0; t<n; t++){
		if (this.rotulado[t]>=0) aux+=(this.rotulado[t]+1)+" ";
	}aux+="}";
	ret.push(aux);

	aux="NR = {";
	for(t=0; t<n; t++){
		if (this.nrotulado[t]==t) aux+=(this.nrotulado[t]+1)+" ";
	}aux+="}";
	ret.push(aux);

	aux="último = "+(this.ultimo+1)+";";
	ret.push(aux);

	if(this.d[this.ultimo]<cand){
		aux="d("+(this.ultimo+1)+") = "+this.d[this.ultimo]+";";
		ret.push(aux);
		aux="p("+(this.ultimo+1)+") = "+this.p[this.ultimo]+";";
		ret.push(aux);
		aux="último = "+(this.ultimo+1)+";";
		ret.push(aux);
	}//else printf("<br/>");
	//Passo 3
	aux="Passo 3:";
	ret.push(aux);
	if(this.ultimo != dest){
		aux="Nodo "+(dest+1)+" não rotulado. Retorne ao Passo 2";
		ret.push(aux);
	}else{
		aux="Nodo "+(dest+1)+" rotulado. PARE! Recuperando o caminho ótimo: ";
		ret.push(aux);
	}
	k++;
	}





	this.element="";
	this.cm=0;
	if(/*contador!=4*(this.V-1)+this.V ||*/ this.nrotulado[dest]==-dest){
	var i=dest;
	let nnaux;
	aux="";
	naux="C = {";
	this.element1="C = {";
	while(i!=orig){
		nnaux="p("+(i+1)+") = "+this.p[i]+";";
		ret.push(nnaux);
		if((this.p[i]-1)==orig){
			this.element="("+parseInt(this.p[i])+","+parseInt(i+1)+")"+this.element;
			aux="("+parseInt(this.p[i])+","+parseInt(i+1)+")"+aux;
		}else{
			this.element=";("+parseInt(this.p[i])+","+parseInt(i+1)+")"+this.element;
			aux=";("+parseInt(this.p[i])+","+parseInt(i+1)+")"+aux;
		}
		i=this.p[i]-1;		
	}
	this.element=this.element1+this.element+"}";
	naux+=aux+"}";
	nnaux="O caminho mínimo do nó "+(orig+1)+" ao nó "+(dest+1)+" e dado por:";
	ret.push(nnaux);
	ret.push(naux);
	this.cm=this.d[dest];
	}else{
		this.element="Caminho indisponível!";
		aux="Caminho indisponível!";
		ret.push(aux);
	}

	console.log(ret);
	return ret;
}

retornaValorCusto(){
	return this.cm;
}

retornaValorRota(){
	return this.element;
}


}