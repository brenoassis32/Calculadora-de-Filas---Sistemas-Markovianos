class Random
{

constructor()
{
	var d = new Date();
	this.a=16807;
	this.c=0;
	this.m=2147483647;
	this.seed=d.getTime();
	//this.d=[];
	//this.p=[];
	//this.custo=[];

}
/*
retornaValorCusto(){
	return this.cm;
}

retornaValorRota(){
	return this.element;
}
*/
NextOne(value){
	let val=value;
	let nextone;
	nextone = (this.a*val+this.c) % this.m;
	return nextone;	
}

Uni01(value){
	var self = this;
	let val=value;
	let u;
	val = self.NextOne(val);
	this.seed= val;	
	u = (val)/(this.m - 1);	
	return u;
}

Expo(mean,value){
	let val=value;
	let u;
	var self = this;
	val = self.NextOne(val);
	u = self.Uni01(val);
	this.seed= val;
	return -1*mean*Math.log(u);
}

Uni(value,bound_1,bound_2){
	var self = this;
	let val=value;
	let u;
	let a=bound_1;
	let b=bound_2;
	let new1 =0;

	val = self.NextOne(val);
	u = self.Uni01(val);
	this.seed= val;
	new1= parseFloat(a) + parseFloat(u*(b - a));
	return new1;
}

UniRange(value,bound_1,bound_2){
	var self = this;
	let val=value;
	let new1 =0;
	let u;
	let a=bound_1;
	let b=bound_2;
	
	val = self.NextOne(val);
	u = self.Uni01(val);
	this.seed= val;
	new1= parseFloat(a) + parseFloat(u*(b - a));
	return parseInt(new1);
}

/*double Inv_Uni(double unif){
	double u;
	int a,b;
	a = 1;
	b = 60;
	
	//valor = NextOne(valor);
	//u = Uni01(valor);

	return (unif-a)/(b - a);
}

unsigned long int RetornaPseudoAleatorio(double valor){
	int i,a;
	unsigned long int sequencia[10]; 
	 
	a=16807;
	i=0;
	sequencia[0] = valor*(m-1);

	sequencia[i+1] = (sequencia[i]/a) % m;
	//cout<< "Semente : "<<sequencia[i]<<endl;
	//cout<< "Valor : "<<sequencia[i+1]<<endl;
	
	return sequencia[i+1];	
}
*/

run(n_runs,dist,lower,upper) {
	
//	FILE *arquivo;
//	arquivo = fopen("Gerador.csv","wt");
//	arquivo = fopen("Gerador.txt","wt");
	var self = this;
	let valor01,valor1;
	let valorU;
	let i=0;
	let ret = [];
//	console.log(i);
//	console.log(n_runs);
//	console.log(this.seed);
//	console.log(this.a);
//	console.log(this.c);
//	console.log(this.m);
	while(i<n_runs){
//		console.log(i);
//		console.log(this.seed);
		if(dist=="uni01"){
			valorU = self.Uni01(this.seed);
//			console.log(valorU);						
		}
		if(dist=="uni"){
			valorU = self.Uni(this.seed,lower,upper);
//			console.log(valorU);			
		}
		if(dist=="range"){
			valorU = self.UniRange(this.seed,lower,upper);
//			console.log(valorU);						
		}
		if(dist=="expo"){
			valorU = self.Expo(lower,this.seed);
//			console.log(valorU);			
		}
//		fprintf(arquivo, "%d;%d;%d\n", valor,valorU,semente);
		//fprintf(arquivo, "%d\t%.3f\t%.f\n", valor,valorU,valorU);
//		fprintf(arquivo, "%d\t%lf\t%d\n", valor,valor01,valorU);
		ret.push(valorU);
		i++;
	}

	return ret;
	//fclose(arquivo);

}
}

class FilasMM1
{

constructor(L,M,c,N)
{
	this.L=L;
	this.M=M;
	this.c=c;
	this.N=N;
	this.rho = (this.L) / (this.M);


}

Rho_c(){
	return (this.L) /(this.M * this.c);	
}

L_eff(){
	var self = this;

	if( this.N == 1000000){
			return this.L;
	}else{
		return (this.L) * (1- self.Pn(this.N));
	}
}

P0(){
	return  1- this.rho; 
}


Pn(n){
	var self = this;
	let nn =n;
	return (Math.pow(this.rho,nn)) * self.P0();
}

Ls(){
	return  this.L / (this.M- this.L); 
}

Lq(){
	return  ((this.L)^2) / (this.M * (this.M- this.L)); 
}


Ws(){
	return  1 / (this.M - this.L); 
}

Wq(){
	return  this.L / (this.M * (this.M - this.L)); 
}




Pn_acumulada() {
	var self = this;
	let n =0;
	let acc=0;
	let ret = [];
	
	ret.push("n");
	ret.push("Pn");
	ret.push("Acumulado");
	ret.push(0);
	ret.push(self.P0());
	
	acc+=self.P0();
	ret.push(acc);
	n++;
	
	while( acc < 0.99999 && n<57){
		ret.push(n);

		ret.push(self.Pn(n));

		acc+=self.Pn(n);
		ret.push(acc);

		n++;
	}
	return ret;

}
}


class FilasMM1N
{

constructor(L,M,c,N)
{
	this.L=L;
	this.M=M;
	this.c=c;
	this.N=N;
	this.rho = (this.L) / (this.M);


}

Rho_c(){
	return (this.L) /(this.M * this.c);	
}

L_eff(){
	var self = this;

	return (this.L) * (1 - self.Pn(this.N) );
}

P0(){
	if(this.rho == 1){
		return  1 / ((this.N) + 1);
	}else{
		return  (1 - (this.rho)) / ( 1 - Math.pow(this.rho,(this.N) + 1) );		
	}
	 
}


Pn(n){
	var self = this;

	if(this.rho == 1){
		return  self.P0();
	}else{
		return (Math.pow((this.rho),n)) * (self.P0());		
	}
}

Ls(){
	if(this.rho == 1){
		return  (this.N)/2;
	}else{
		return ((1 -((this.N) + 1) * (Math.pow((this.rho),(this.N))) + (this.N) * (Math.pow(this.rho,this.N +1))) * (this.rho)) / ((1 - (this.rho)) * (1 - Math.pow((this.rho),(this.N) + 1)));		
	}
}

Lq(){
	var self = this;
	
	return  ( (self.Ls()) - (self.L_eff())/ (this.M) ); 
}


Ws(){
	var self = this;
	
	return  ( self.Ls()) / (self.L_eff() ); 
}

Wq(){
	var self = this;
	
	return  ( self.Lq() )/ (self.L_eff() ); 
}




Pn_acumulada() {
	var self = this;
	let n =0;
	let acc=0;
	let ret = [];
	
	ret.push("n");
	ret.push("Pn");
	ret.push("Acumulado");
	ret.push(0);
	ret.push(self.P0());
	
	acc+=self.P0();
	ret.push(acc);
	n++;
	
	while( n <= this.N){
		ret.push(n);

		ret.push(self.Pn(n));

		acc+=self.Pn(n);
		ret.push(acc);

		n++;
	}
	return ret;

}
}


function fact(x) {
	//var self = this;
	if(x==0) {
		return 1;
	}
	return x * fact(x-1);
}


class FilasMMc
{

constructor(L,M,c,N)
{
	this.L=L;
	this.M=M;
	this.c=c;
	this.N=N;
	this.rho = (this.L) / (this.M);


}

Rho_c(){
	return (this.L) /(this.M * this.c);	
}

L_eff(){
	var self = this;

	if( this.N == 1000000){
			return this.L;
	}else{
		return (this.L) * (1- self.Pn(this.N));
	}
}

P0(){
	var self = this;
	let p1 = Math.pow(this.rho,this.c)*(1/(1 - self.Rho_c() ))/(fact(this.c));
	let p2=0;
	for(let i =0; i<=(this.c - 1); i++){
		p2+= (Math.pow(this.L,i))/((Math.pow(this.M,i))* fact(i))
	}
	
	return  1 / ( p1 + p2 );		
	 
}


Pn(n){
	var self = this;

	if( n< this.c){
		return  (Math.pow((this.rho),n))*self.P0()/fact(n);
	}else{
		return  (Math.pow((this.rho),n))*self.P0()/( (Math.pow((this.c),n - this.c)) *  fact(this.c));
	}
}

Ls(){
	var self = this;
	
	return  ( (self.Lq()) + self.L_eff()/this.M);
	
}

Lq(){
	var self = this;
	
	return  ( (self.Rho_c())* (Math.pow(this.rho,this.c)) * (self.P0())) / ((Math.pow((1 - self.Rho_c()),2)) * fact(this.c)) ; 
}


Ws(){
	var self = this;
	
	return  ( self.Ls()) / (self.L_eff() ); 
}

Wq(){
	var self = this;
	
	return  ( self.Lq() )/ (self.L_eff() ); 
}




Pn_acumulada() {
	var self = this;
	let n =0;
	let acc=0;
	let ret = [];
	
	ret.push("n");
	ret.push("Pn");
	ret.push("Acumulado");
	ret.push(0);
	ret.push(self.P0());
	
	acc+=self.P0();
	ret.push(acc);
	n++;
	
	while( acc < 0.99999 && n<57){
		ret.push(n);

		ret.push(self.Pn(n));

		acc+=self.Pn(n);
		ret.push(acc);

		n++;
	}
	return ret;

}
}


class FilasMMcN
{

constructor(L,M,c,N)
{
	this.L=L;
	this.M=M;
	this.c=c;
	this.N=N;
	this.rho = (this.L) / (this.M);


}

Rho_c(){
	return (this.L) /(this.M * this.c);	
}

L_eff(){
	var self = this;
	return (this.L) * (1- self.Pn(parseInt(this.N)));
}

P0(){
	var self = this;
	if(self.Rho_c() == 1){
		let p1 = Math.pow(this.rho,this.c)*(this.N - this.c +1)/fact(this.c);
		let p2=0;
		for(let i =0; i<=(this.c - 1); i++){
			p2+= (Math.pow(this.L,i))/((Math.pow(this.M,i))* fact(i))
		}
		return  1 / ( p1 + p2 );
	}else{
		let p1 = Math.pow(this.rho,this.c)*(1 - Math.pow(self.Rho_c(),this.N - this.c + 1))/((1 - self.Rho_c() )* fact(this.c));
		let p2=0;
		for(let i =0; i<=(this.c - 1); i++){
			p2+= (Math.pow(this.L,i))/((Math.pow(this.M,i))* fact(i))
		}
		return  1 / ( p1 + p2 );		
	}
}


Pn(n){
	var self = this;

	if( n< this.c){
		return  (Math.pow((this.rho),n))*self.P0()/fact(n);
	}else{
		return  (Math.pow((this.rho),n))*self.P0()/( (Math.pow((this.c), n - this.c)) * fact(this.c));
	}
}

Ls(){
	var self = this;
	
	return  ( (self.Lq()) + self.L_eff()/this.M);
	
}

Lq(){
	var self = this;
	if(self.Rho_c() == 1){
		return  ( (Math.pow(this.rho,this.c)) * (self.P0()) * (this.N - this.c) * (this.N - this.c +1)) / (2*fact(this.c) ); 
	}else{
		return  ( (Math.pow(this.rho, this.c)) *(self.Rho_c())* (self.P0()) * (1 - ( this.N - this.c + 1) * Math.pow(self.Rho_c(), this.N -  this.c ) + ( this.N - this.c )*Math.pow(self.Rho_c(), this.N - this.c + 1) ) ) / ((Math.pow(1 - self.Rho_c(),2))*fact(this.c) ); 
	}
	
}


Ws(){
	var self = this;
	
	return  ( self.Ls()) / (self.L_eff() ); 
}

Wq(){
	var self = this;
	
	return  ( self.Lq() )/ (self.L_eff() ); 
}




Pn_acumulada() {
	var self = this;
	let n =0;
	let acc=0;
	let ret = [];
	
	ret.push("n");
	ret.push("Pn");
	ret.push("Acumulado");
	ret.push(0);
	ret.push(self.P0());
	
	acc+=self.P0();
	ret.push(acc);
	n++;
	
	while( n <= this.N){
		ret.push(n);

		ret.push(self.Pn(n));

		acc+=self.Pn(n);
		ret.push(acc);

		n++;
	}
	return ret;

}
}

