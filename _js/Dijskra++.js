class Grafo
{

constructor(V)
{
	this.V = V;
	this.infinito=10000;
	this.rotulado=[];
	this.nrotulado=[];
	this.d=[];
	this.p=[];
	this.custo=[];

	for(var i=0; i<=V;i++){
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
	for(var t=0; t<n; t++){
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

	//Passo 2:
	while(k!=this.V+1){
	var candidato=0; 
	var cand=500;
	for(var t=0; t<n; t++){
		if(t==this.nrotulado[t]){
			if( parseInt(this.d[t]) <= (parseInt(this.d[this.ultimo]) + parseInt(this.custo[parseInt(this.ultimo)][t])) ){
//				console.log("d("++t+1+") <- "+this.d[t]+";");
			}else{
				this.d[t]=parseInt(this.d[+this.ultimo]) + parseInt(this.custo[+this.ultimo][t]);
				if(this.d[t]<this.infinito){
					this.p[t]=parseInt(this.ultimo)+1;
				}
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
	k++;
	if(candidato!=0){
		this.nrotulado[candidato]=-candidato;
		this.rotulado[candidato]=candidato;
		}else{
			this.nrotulado[candidato]=-1;
			this.rotulado[candidato]=0;
		}
	this.d[candidato]=cand;
	this.ultimo = candidato;
	}
	//Passo 3
	this.element="";
	this.cm=0;
	if(/*contador!=4*(this.V-1)+this.V ||*/ this.nrotulado[dest]==-dest){
	var i=dest;
	this.element1="C = {";
	while(i!=orig){
		if((this.p[i]-1)==orig){
			this.element="("+parseInt(this.p[i])+","+parseInt(i+1)+")"+this.element;
		}else this.element=";("+parseInt(this.p[i])+","+parseInt(i+1)+")"+this.element;
		i=this.p[i]-1;		
	}
	this.element=this.element1+this.element+"}";
	this.cm=this.d[dest];
	}else this.element="Caminho indisponível!";
}

retornaValorCusto(){
	return this.cm;
}

retornaValorRota(){
	return this.element;
}


}