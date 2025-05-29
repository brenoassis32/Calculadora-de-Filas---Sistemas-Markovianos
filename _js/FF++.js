function n_in_R(aa,bb) 
{
 	let ret=false;
	for (let a in bb) {
		if (bb[a]==aa){
			ret=true;
		}
	}
	
	return ret;
}

function empty_R(cc)
{
	console.log(cc.length);
	let dd = cc;
	for(let t=0; t<dd.length; t++){
		dd.pop();
	}
	return dd;
}


class Grafo
{

constructor(V)
{
	this.V = V;
	this.infinito=10000;
	this.rotulado=[]; 
//	this.d=[];
	this.p=[];
	this.s=[];
	this.plus=[];
	this.minus=[];
	this.R=[];
	this.y=0;

	for(var i=0; i<V+1;i++){
		this.plus[i]=[];		
		this.minus[i]=[];		

		for(var j=0; j<=V;j++) {
			this.plus[i][j]=-10000;
			this.minus[i][j]=0;
		}
	}		
}

addAresta(v1, v2, c, tipo)
{
	if(v1!=0 || v2!=0){ 
		if(tipo==0){
			this.plus[v1-1][v2-1]=c;
			this.plus[v2-1][v1-1]=c;
		}else {
			this.plus[v1-1][v2-1]=parseInt(c);
			
		}
	}
}

ff(orig,dest)
{
	orig=orig-1;
	dest=dest-1;
	var n=this.V;
	let ret = [];
	let nodes = [];
	let nodes2 = [];
	let aux, naux;


	//Passo 1:
	aux="Passo 1:";
	ret.push(aux);
	aux="y="+(this.y);
	ret.push(aux);

	for(let i=0; i<=this.V; i++){
		for(let j=0; j<=this.V; j++){
			if(parseInt(this.plus[i][j])!=-10000){
				aux="v+("+(i+1)+","+(j+1)+") = "+(this.plus[i][j])+"   v-("+(i+1)+","+(j+1)+") = "+(this.minus[i][j]);
				ret.push(aux);
			}
		}
		
	}

	this.element="Cadeias: ";
/*	this.plus=[[-10000, 10, 5, -10000, 4, -10000], [-10000, -10000, 7, 4, -10000, 3],[-10000, -10000, -10000, 2, -10000, -10000],[-10000, -10000, -10000, -10000, -10000, 2],[-10000, -10000, 1, 5, -10000, -10000],[-10000, -10000, -10000, -10000, -10000, -10000]];
	this.minus=[[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0]];
*/
	this.R.push(this.V);
	aux="R={ ";
	for (let i in this.R){
		aux+=(parseInt(this.R[i]+1))+" ";
	}aux+="}";
	ret.push(aux);


	//Passo 2:

	while( n_in_R(this.V, this.R) ){
		aux="Passo 2:";
		ret.push(aux);
		aux="R = { }";
		ret.push(aux);
		this.R = [];
		this.L = [];	
		for(let t=0; t<=n; t++){
			this.p[t]=0;
			aux="p("+(t+1)+") = "+this.p[t];
			ret.push(aux);
		}
		this.R.push(orig);
		this.L.push(orig);
		aux="R = {"+(orig+1)+"} , L = {"+(orig+1)+"}";
		ret.push(aux);
		let d=0;
		aux=" ";
		ret.push(aux);

		while( (this.L.length>0) && n_in_R(this.V, this.R)==false ){
			for (let i in this.L){
				aux="i = "+(parseInt(this.L[i])+1);
				ret.push(aux);
				
				for(let j=0; j<=n; j++){
					if( (this.plus[this.L[i]][j]>0) && (n_in_R(j, this.R)==false)){
						aux="("+(parseInt(this.L[i])+1)+","+(parseInt(j)+1)+") :";
						ret.push(aux);

						this.p[j]=this.L[i];
						this.s[j]=1;
						this.R.push(j);
						this.L.push(j);

						aux="p("+(parseInt(j)+1)+") = 1";
						ret.push(aux);
						aux="s("+(parseInt(j)+1)+") = +1";
						ret.push(aux);
						aux="R={ ";
						for (let k in this.R){
							aux+=(parseInt(this.R[k]+1))+" ";
						}aux+="}";
						ret.push(aux);
						aux="L={ ";
						for (let a in this.L){
							aux+=(parseInt(this.L[a]+1))+" ";
						}aux+=" }";
						ret.push(aux);

					}
					if( (this.minus[j][this.L[i]]>0) && (n_in_R(j, this.R)==false)){
						aux="("+(parseInt(i)+1)+","+(parseInt(j)+1)+") :";
						ret.push(aux);

						this.p[j]=this.L[i];
						this.s[j]=-1;
						this.R.push(j);
						this.L.push(j);

						aux="p("+(parseInt(j)+1)+") = 1";
						ret.push(aux);
						aux="s("+(parseInt(j)+1)+") = -1";
						ret.push(aux);
						aux="R={ ";
						for (let m in this.R){
							aux+=(parseInt(this.R[m]+1))+" ";
						}aux+="}";
						ret.push(aux);
						aux="L={ ";
						for (let b in this.L){
							aux+=(parseInt(this.L[b]+1))+" ";
						}aux+=" }";
						ret.push(aux);

					}
				}
				aux="L={ ";
				for (let ccc in this.L){
					aux+=(parseInt(this.L[ccc]+1))+" ";
				}aux+="} - { "+(parseInt(this.L[i])+1)+" }";
				ret.push(aux);
				aux=" ";
				ret.push(aux);

				if (n_in_R(this.V, this.R)){
					
					break;
				}
				this.L.shift();
				break;
			}
		}
		if(n_in_R(this.V, this.R)){
			//Passo A
			aux="Passo A:";
			ret.push(aux);

			let r = this.V;
			let C_1 = [];
			let C_2 = [];
			let delta = this.infinito;

			aux="r = "+parseInt(r+1);
			ret.push(aux);
			aux="C = { }";
			ret.push(aux);
			aux="delta = +inf ";
			ret.push(aux);
			

			while(r!=0){
				if(this.s[r]==1){
					C_1.push(this.p[r]);
					C_2.push(r);
					aux="C = { ";
					for(let i=C_1.length-1; i>=0; i--){
						aux+="("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1) + "),";
					} aux+=" }";
					ret.push(aux);


					if( this.plus[this.p[r]][r] < delta) {
						delta = this.plus[this.p[r]][r];
					}
					aux="delta = "+parseInt(delta);
					ret.push(aux);

				}if(this.s[r]==-1){
					C_2.push(this.p[r]);
					C_1.push(r);
					aux="C = { ";
					for(let i=C_1.length-1; i>=0; i--){
						aux+="("+parseInt(C_2[i]+1)+ "," + parseInt(C_1[i]+1) + "),";
					} aux+=" }";
					ret.push(aux);

					if(this.minus[r][this.p[r]] < delta) {
						delta = this.minus[r][this.p[r]];
					}
					aux="delta = "+parseInt(delta);
					ret.push(aux);
				}
				r = this.p[r];
				aux="r = "+(parseInt(r));
				ret.push(aux);
				aux=" ";
				ret.push(aux);


			}
			//Passo B:
			aux="Passo B:";
			ret.push(aux);

			this.y = this.y + delta;
			aux="y = "+(parseInt(this.y));
			ret.push(aux);

			this.element+="C={";
			for(let i=C_1.length; i>=0; i--){
				if(this.s[C_2[i]]==1){
					this.element+="("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1) + "),";
					this.plus[C_1[i]][C_2[i]] = this.plus[C_1[i]][C_2[i]] - delta;
					this.minus[C_1[i]][C_2[i]] += delta;

					aux="("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1)+") :";
					ret.push(aux);

					aux="v+("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1)+") = "+(parseInt(this.plus[C_1[i]][C_2[i]]));
					ret.push(aux);

					aux="v-("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1)+") = "+(parseInt(this.minus[C_1[i]][C_2[i]]));
					ret.push(aux);

				}
				if(this.s[C_2[i]]==-1){
					this.element+="("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1) + "),";
					this.plus[C_1[i]][C_2[i]] = this.plus[C_1[i]][C_2[i]] + delta;
					this.minus[C_1[i]][C_2[i]] = this.minus[C_1[i]][C_2[i]] - delta;

					aux="("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1)+") :";
					ret.push(aux);

					aux="v+("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1)+") = "+(parseInt(this.plus[C_1[i]][C_2[i]]));
					ret.push(aux);

					aux="v-("+parseInt(C_1[i]+1)+ "," + parseInt(C_2[i]+1)+") = "+(parseInt(this.minus[C_1[i]][C_2[i]]));
					ret.push(aux);
				}
			}
			aux="Retorne ao Passo 2!";
			ret.push(aux);
			aux="";
			ret.push(aux);
			this.element+="},";
		}
	}
	aux="Condição de parada atingida! Fluxo máximo igual a "+(parseInt(this.y));
	ret.push(aux);

	return ret;	
}

retornaValorCusto(){
	return parseInt(this.y);
}

retornaValorRota(){
	return this.element; // eu sei
}


}