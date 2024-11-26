//[☰MuKon]
/*******************************************
µKon is Console for Mu (µ)
author: luxool 2016
********************************************/

//ClassClosure of Konsol
(function(exports) {

	 //private var && constructor

	 var MUK_KON_VER ="2016.11.14";

	 var IdTextAreaKsl =""; //identifiant du TextArea $("#"+IdTextAreaKsl)

	 var DocTxtArea =null; //l'élement document.getElementById(IdTextAreaKsl)

	 var listofvalue= []; // a cache variable list of value

	 var cmds=[]; //the Array of each old commands enter

	 var oldcmd=-1; //counter of curent old command active

	 var nolog = true; // for debug can console log

	 var onEnter=""; //function callback on validation

	 var MacroVox={}; //object

	 

     var MuKonKlass = function (id) //Constructor initialise the Konsol

	 { IdTextAreaKsl=id;DocTxtArea = document.createElement("TEXTAREA");

		DocTxtArea.setAttribute('id', IdTextAreaKsl);

		DocTxtArea.setAttribute('style',"font-size:18px;font-weight:bold;width:100%;height:10%;position:absolute;left:0;bottom:0;");

		DocTxtArea.setAttribute('rows',3);

		hold('☰|<','[☰MuKon.2016]|<');

		DocTxtArea.setAttribute('onkeypress',IdTextAreaKsl+".WhenKeyPress(event)");

		DocTxtArea.setAttribute('onkeydown',IdTextAreaKsl+".WhenKeyDown(event)");

		DocTxtArea.setAttribute('onwheel',IdTextAreaKsl+".WhenMouseWheel(event)");

		document.body.appendChild(DocTxtArea);

   
	 }

     //function duplicated on new instance :

	 //MuKonKlass.prototype.FunctionName 

	 

	 

	//Get a Associative Array of Keyname:value of from an Attribute-list  

	GetAttributes= function(attrib) { var el=[];
		
			var StrStl=DocTxtArea.getAttribute(attrib);var atrStrStl=StrStl.split(";") ;

			for ( var item in atrStrStl ) { if (item!="") {el = atrStrStl[item].split(":"); listofvalue[el[0]]=el[1];

		if (!nolog) { console.log("item:"+atrStrStl[item]+": ==> "+el[0]+"="+el[1]);}

			}} return listofvalue;	 } //variant return listofvalue.length

		//exported as	getAtt



	

	//Get Value width a Key from Attribute-List

	//GetAttKey = function(attrib,key) { GetAttributes(attrib);return listofvalue[key];}

	//Store in Attribute-list : one Associative Array of Keyname:value;

	/*StoreAttributes=function(attrib,vals) {listofvalue=vals;var atrStrStl="";

				for ( var item in listofvalue ) {atrStrStl+=item+":"+listofvalue[item]+";"; DocTxtArea.setAttribute(attrib,atrStrStl);}}

				} } */

	//Store in an Attribute-list : one Keyname:value; 

	KeyStoreInAttribut=function (attrib,key,val) {var atrStrStl="";listofvalue=GetAtt(attrib);

		 if (!nolog) {console.log("::"+listofvalue[nm]+"<-"+nm+"<--"+val);}

			listofvalue[key]=val; 

		if (!nolog) {console.log(">>"+listofvalue[nm]+"<-"+nm+"<--"+val);}

			for ( var item in listofvalue ) {atrStrStl+=item+":"+listofvalue[item]+";"; DocTxtArea.setAttribute(attrib,atrStrStl);}}

			//exported as: StorKeyAtt

					 

	 

		// Prompteur :

	function hold(txt,holder) {	DocTxtArea.value=txt;if (!nolog) console.log(holder);

								DocTxtArea.placeholder=holder}	

		

	//DocTxtArea.setAttribute('onkeypress',"KonsolOk(event)");

	

	function WhenEnterOk(eve)

	{if (eve.keyCode==13) 

		{

		if (eve.shiftKey===true) return true; //newline

		else	

		{var cmd=DocTxtArea.value.toString().trim();

		  //send to a function Truc

		  if (cmd!="") {

				cmds.push(cmd);

				if (onEnter!=undefined) var result=onEnter(cmd);

				//and hold result

				hold('',result); 

				if(eve.preventDefault) eve.preventDefault();

				console.log(onEnter);

				}

		  

		   return false;

		}

		}

	 } //MuKonKlass.prototype.WhenKeyPress=WhenEnterOk;

	

	//internal OldCom Counter manager

	function OldComUp() {if (oldcmd>=cmds.length-1) oldcmd=0; else oldcmd++;}

	function OldComDown() {if (oldcmd<=0) oldcmd=(cmds.length)-1; else  oldcmd--; }

	function UpDateCmd() 

	{

	if (cmds[oldcmd]!=undefined) 

	   { if (DocTxtArea.value==="") hold(null,cmds[oldcmd]);

		 else {

		   if (DocTxtArea.selectionEnd-DocTxtArea.selectionStart>0)

		   {//selection:

			 

			 if (!nolog) console.log("selection:"+(DocTxtArea.selectionEnd-DocTxtArea.selectionStart));

			 DocTxtArea.setRangeText(cmds[oldcmd]);

			 //idKsl.setSelectionRange(hk.value.length,hk.value.length);

		   }

		   else {//at the end and select

				 DocTxtArea.value+="_"; 

				 DocTxtArea.setSelectionRange(DocTxtArea.value.length-1,DocTxtArea.value.length);

				 //KonsolText(cmds[oldcmd],false) ;

				}

			  }

	   }	

		

	}

	

	//

	function WhenDownKey(down)

	{ if (!nolog) console.log(down.keyCode);//   http://www.javascripter.net/faq/keycodes.htm



	if ((down.keyCode==33) || (down.keyCode==34)) //page Up Down

	 {  

	  if (down.keyCode==33)

	  { if (oldcmd>=cmds.length-1) oldcmd=0; else oldcmd++;} //µKslupOldCom

	  else //µKslDownOldCom

	  { //console.log("minus:"+cmds.length);

		 if (oldcmd<=0) oldcmd=(cmds.length)-1; else  oldcmd--;

	  }

	 

	  if (!nolog) console.log( down.keyCode+"/"+oldcmd);

	  UpDateCmd();

	  if(down.preventDefault) down.preventDefault();  

	 }

				

	if (down.keyCode==9) { //Tab insert oldcmd And With Majuscule 

		var inserted=cmds[oldcmd];

		if (inserted=="_") inserted=idKsl.placeholder;

		ReplaceText(inserted,true);

		if(down.preventDefault) down.preventDefault();

	}

	if (down.keyCode==8 && down.shiftKey===true) //Backspace key.

		{ //pop functer {(["'

		  if (!nolog) console.log("ok");

		}

	 //if(down.preventDefault) down.preventDefault();

	 return false;

	}

	

	function WhenWheel(eve)

	{ //console.log(eve.wheelDelta);

	if (eve.wheelDelta>0)  OldComUp(); else OldComDown();

	UpDateCmd() ;

	}

	

	function ReplaceText(txt,placAtEnd) //replace selectedTExt by txt or place at THE end

	{ 

	  var DocTxtAreaSelSt=DocTxtArea.selectionStart;

	  var DocTxtAreaSelEd=DocTxtArea.selectionEd;

	  var DocTxtAreaSelen=DocTxtArea.selectionEnd-DocTxtArea.selectionStart;

	  var DocTxtAreaValen=DocTxtArea.value.length; //hk.textLength 

	  

	  if (DocTxtAreaSelen) 

	   { DocTxtArea.setRangeText(txt); if(!nolog) console.log("replaced by :"+txt);

		 DocTxtArea.setSelectionRange(DocTxtAreaSelSt,txt.length);

		 if (!placAtEnd) return; //stay at start

		 DocTxtArea.setSelectionRange(DocTxtAreaSelSt+txt.length,DocTxtAreaSelSt+txt.length);return;

		 }

		 

	  if (placAtEnd)//goto end

	   {

		DocTxtArea.setRangeText(txt);

		DocTxtArea.setSelectionRange(DocTxtArea.value.length,DocTxtArea.value.length);

		DocTxtArea.focus();

	   }

	}	



	//CallBack onEnter

	function setOnEnter(fnok) {

		 if (!nolog) { console.log("setOnEnter:"+fnok+"()");}

		onEnter=fnok; DocTxtArea.setAttribute('OnValidation',fnok);return true;}

    //autres composant de la Konsole

	//exported function list are:

	 exports.MuKonKlass = MuKonKlass;

	 MuKonKlass.prototype.id = function() { return IdTextAreaKsl;}

	 MuKonKlass.prototype.getAtt=GetAttributes; 

	 MuKonKlass.prototype.StorKeyAtt=KeyStoreInAttribut; //exported	

	 MuKonKlass.prototype.WhenKeyPress=WhenEnterOk;

	 MuKonKlass.prototype.WhenMouseWheel=WhenWheel;

	 MuKonKlass.prototype.WhenKeyDown=WhenDownKey;

	 MuKonKlass.prototype.setFunctionOk=setOnEnter;

	 

	 

})(this);



//µKon the Konsol objext who abble to handle hKonObj

var µKon = µKon || { version:2017,

	cmds:[], cmd:"",oldcmd:-1,stack:[],

	idKsl:null,

	reset : function()  

		{ //if ( typeOf µKon.initialized == "undefined" ) { alert("urin");}



		}

		

};



/*KONSOLE TESTING: 



	var Truc=new MuKonKlass("Truc");

	var testoftruc = function (ok){ return eval(ok)};

	Truc.setFunctionOk(testoftruc);*/

