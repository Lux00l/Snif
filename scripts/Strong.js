
this.Strong = class Strong extends String 
{ 
  constructor(str) {
    super(str);
	this.val="";
	this.dat=str;
	this.len=0;
  }
	toString()	{return this.dat;}
	valueOf()	{return this.val;}
	codeAt(i)	{ return this.dat.charCodeAt(i);}
	car(i) 		{ return this.dat.charAt(i);}
	size() 		{this.len=this.dat.length;return this.len;}
	ofJedi()	{this.len=this.dat.length;return this;}
	cod(i) 		{ if (i<0) i=this.dat.length+i; 
    if (i>this.dat.length-1) return false;
	return this.codeAt(i); }
	cat(c) 		{
	 if (c>64 && c<91) return 3;//isMaj
	 if (c>96 && c<123) return 2;//isMin
	 if (c>=48 && c<=57) return 1;//isNum
	 return 0;	 }		
	Xspace() 	{ //ExLaCHAINE[MaisPasçà] ->Ex La CHAINE
    if (this.toString()==="") return "";
	NeedSpace=false;a="";for(i=0;i<this.length-1;i++)
	{   c=this.codeAt(i);d=this.codeAt(i+1);
        isMaj=(c>64&&c<91);isMin=(c>96)&&(c<123);isNum=(c>=48 &&c<=57);
		isAlpha=(isMaj||isMin);//isAlpha
		isAlNum=(isAlpha||isNum);//isAlphaNum
		beMaj=(d>64&&d<91);beMin=(d>96)&&(d<123);beNum=(d>=48 &&d<=57);
		beAlpha=(beMaj||beMin);//beAlpha
		beAlNum=(beAlpha||beNum);//beAlphaNum
		link=(d==95||d==44||d==45||d==46||d==39||d==64||d==33);//_-.,'@! 
		minNot=(c>96)&&(c<123)&&(d<=96||d>=123)&&(!link);
		NoNum=(c>=48 &&c<=57)&&(d<47||d>57)&&(!link);
		MajNum=(c>64&&c<91)&&(!(d>64&&d<91));
		MajMin=(c>64&&c<91)&&(!(d>96&&d<123));
		notMaj=(!(c>64&&c<91))&&(d>64&&d<91);
		//isAlpha=(!NeedSpace&&(isMaj))||()
		NeedSpace=(minNot||notMaj);
        // a+=(minNot||notMaj)?String.fromCharCode(c)+' ':String.fromCharCode(c);//toLowerCase();
	     a+=(minNot||notMaj)?String.fromCharCode(c)+' ':String.fromCharCode(c);//toLowerCase();
	} return a+String.fromCharCode(d);
 }
    WordAt(i)	{ 
	    var j=1;
		var k=i;if (i<0) j=-1;
		var c=this.cod(i);
		if (!c) return false;
		var M=this.cat(c);//M is Modal N is Next
		var W=String.fromCharCode(c);
		var done=false;var append=false;var same;
		var N=0;var l=0;
		//var reject=0;
		while (!done)
		{append=false;
		i+=j;c=this.cod(i);
		if (!c) done=true;
		 else
		 {N=this.cat(c);same=(N==M);}
		
		if (!done)
		switch (M)
		{ 	case 0 :  //other Symbol
				if (!same)  {
								if (j>0 && N==1 ) 
								{
								if (W.length==1	&& ((W=="+" || W=="-") ))
									{ M=1;append=true;break;}
								}	
							    done=true;append=false;
							} else 
							{	
								append=true;
							} break; 
			case 1 : //integer
				if (!same)  {   if (j<0 && N==0 ) 
								{ // + - stop 
	                              console.log("Bang:"+N+":"+c+":"+W.length);
								  if (c==43 || c==45) 
								  {done=true;append=true;break;}	
							     //  . 
								}
								else { done=true;append=false;}
							} else {append=true;} break;
			case 2 : //Minus
				if (!same) 	{  	
								if (j<0 && N==3) 
								{done=true;append=true;break;}		
								
								done=true;append=false;
								
							} else {append=true;} break;
			case 3 : //Majus 
				if (!same)  { //isMaj if-> Len(W)=1
				
								if (j>0 && W.length==1 && N==2)
								{ done=false;append=true;M=N;
								} else {done=true;append=false;}
							} else 
							{ //Same : But SUPERTest = SUPER+Test != SUPERT+est
								
									var l=this.cat(this.cod(i+j));
									if (l==2) {append=false;done=true;}
									else { append=true;}
								
								
							} break;
		}//switch
		//append
		
		if (append) 
			{ W=(j-1)?String.fromCharCode(c)+W:W+String.fromCharCode(c);}
		} //while
		
		this.val=W;l=this.dat.length;//>=:W.len:l  <0=:0:l-w.len
		if (arguments.length!=2)
			this.dat=this.substring((i>=0)?i:0,(i>=0)?l:l-W.length);
console.log("[dat:"+this.dat+"][W:"+W+"][Wlen:"+W.length+"][l:"+l+"]("+((i>=0)?i:0)+"-"+((i>=0)?l:l-W.length)+")");		
		
		return W;//i
		
 }	 
	//StackLike Function
	pop()		{ if (this.dat!=="") this.WordAt(-1) ;else this.val="" ;
					return this.ofJedi(); }
	pull()	 	{ if (this.dat!=="") this.WordAt(0) ;else this.val="" ;
					return this.ofJedi();	}
	put()		{ if (arguments.length>0) 
						{if (typeof arguments[0]=='object') 
								this.val=arguments[0].toString;
						if (typeof arguments[0]=='string') 
								this.val=arguments[0];	
						}	
						this.dat=this.val.concat(this.dat);
						return this.ofJedi();}
	push()		{ if (arguments.length>0) 
						{if (typeof arguments[0]=='object') 
								this.val=arguments[0].toString;
						if (typeof arguments[0]=='string') 
								this.val=arguments[0];	
						}	
						this.dat=this.dat.concat(this.val);
						return this.ofJedi();}
	dup() 	 	{ if (this.dat!=="") this.dat+=this.WordAt(-1,true);
					return this.ofJedi();}
	dip() 	 	{ if (this.dat!=="") this.dat=this.WordAt(0,true)+this.dat;
					return this.ofJedi();}
	
	//toArray //reset
	// A0a.	
	//popuntilfind("=:")  Exec(""); Compil("")
	
 /*
 iter() //String25 // .Popint(iftrueInt++PushInt)
 { i=this.length()-1;n='';
   while (i>0  && ((this.codeAt(i)>=48 && this.codeAt(i)<=57 ) || this.car(i)=="-") )//|| (this.charAt(i)=="+") )
	 {n=this.car(i)+n;i--;}
  //
  if (arguments.length==0) return parseInt(n); // "Truc25".iter() return 25
  if (typeof arguments[0] === 'number' ) 
  { if (isNaN(parseInt(n))){ n=0; } else {n=parseInt(n);}
	n=(n+arguments[0]);
	return this.dat.substr(0,i+1)+n ;
  }	
 }
  */
}