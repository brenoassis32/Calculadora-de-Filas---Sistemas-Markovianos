class Grafo
{

constructor(V)
{
	this.V = V;
	this.infinito=10000;
	this.c=[];
	this.w=[];
	this.custo=[];

	for(let i=0; i<=V;i++){
		this.custo[i]=[];		
		this.c[i]=-2;
		this.w[i]=i;
		for(let j=0; j<=V;j++) {
			this.custo[i][j]=this.infinito;
			if(i==j) this.custo[i][j]=0;
		}
	}		
}

addAresta(v1, v2, cus)
{
	if(v1!=0 || v2!=0){ 
		this.custo[v1-1][v2-1]=cus;
		this.custo[v2-1][v1-1]=this.custo[v1-1][v2-1];
	}
}

prim()
{	
	let orig=0; 
	let p1= new Array();
	let p2= new Array();
	this.lst=0;
	let st=0; 
	let n=this.V;
	this.c[orig]=orig;
	let ret = [];
	let nodes = [];
	let nodes2 = [];
	let aux, naux;

	for(let t=0; t<=n; t++){
		nodes.push(t+1);
		if (this.w[t]==this.c[t]){
			if(t!=0){
				this.w[t]=-parseInt(t);
			}else this.w[t]=-1;
		}
		if (this.w[t]==t) {
			//console.log(this.w[t]+1+";");
		}
	}//printf("}<br/>");
	aux="Passo 1:";
	ret.push(aux);
	console.log("ST: "+st+";");
	aux="LST = "+st+";";
	ret.push(aux);
	aux="C = {"+ 1 +"};";
	ret.push(aux);
	nodes.splice(0,1);
	naux="C' = {"+nodes+"};";
	ret.push(naux);
	aux="ST = {};";
	ret.push(aux);
	let k=0;
//	printf("Passo 2: <br/>");
	aux="Passo 2:";
	ret.push(aux);
	let i=orig;
	while(k!=this.V){
		aux="k = "+(k+1)+";";
		ret.push(aux);
		let menor=10000000;
		for(let t=0; t<=this.V; t++){
			if (this.w[t]==t){
				for(let j=0; j<=this.V;j++){
					if (this.c[j]==j){
						if((this.custo[j][t]<menor)==true){
							menor=parseInt(this.custo[j][t]);
							p1[k]=parseInt(j);
							p2[k]=parseInt(t);
							i=parseInt(t);
						}					
					}
				}
			}
		}
		this.c[i]=parseInt(i);
		this.w[i]=-parseInt(i);
		this.lst+=parseInt(menor);
		console.log("lst = "+this.lst+";");
		aux="LST = "+this.lst+";";
		ret.push(aux);
		this.element="ST = {";
		aux="C = {";
		naux="C' = {";
		for(let t=0; t<=k;t++){
			if(t==k){
				nodes.splice(nodes.findIndex(function checknode(nodes) {return nodes == parseInt(p2[t]+1);}),1);
				naux+=nodes;
				aux+=parseInt(p1[t]+1)+","+parseInt(p2[t]+1)+"};";
				this.element+="("+parseInt(p1[t]+1)+","+parseInt(p2[t]+1)+")";
			}else{
				aux+=parseInt(p1[t]+1)+",";
				this.element+="("+parseInt(p1[t]+1)+","+parseInt(p2[t]+1)+");";
			}
		}//printf("}<br/><br/>");
		ret.push(aux);
		naux+="};"
		ret.push(naux);
		this.element+="}";
		//console.log(this.element)
		aux=this.element;
		ret.push(aux);
		k++;
	}
	console.log(ret);
	return ret;
}

retornaValorCusto(){
	return this.lst;
}

retornaValorRota(){
	return this.element;
}


}
