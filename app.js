
/**
 * Module dependencies.
 */
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream1 = fs.createWriteStream("file1.csv");
var writeStream2 = fs.createWriteStream("file2.csv");
var writeStream3 = fs.createWriteStream("file3.csv");
var writeStream4 = fs.createWriteStream("file4.csv");
var writeStream5 = fs.createWriteStream("file5.csv");
var writeStream6 = fs.createWriteStream("file6.csv");
var writeStream7 = fs.createWriteStream("file7.csv");
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
 
var header='Name,' + 'County,'+'Indictment,'+'Defendant Number,'+'DOB,'+
		'Age Today,' + 'Offense Description,' + 'Sentencing Place,'+'Sentencing Date,'+'Sentencing Type ,'+'Age at sentence,'+
		'Jail,' + 'Parole Ineligibility,'+'Probation,'+'Penalty,' + 'Fine,'+'Lab Fee,'+ 'DEDR,'+'Restitution,'+'Judge,' + 'Comments'+'\n';



var getCourtData=function(num){
	if(1===num){
		writeStream1.write(header);
	}
	if (50001===num){
		writeStream2.write(header);
	}
	if(100001===num){
		writeStream3.write(header);
	}
	if(150001===num){
		writeStream4.write(header);
	}
	if(200001===num){
		writeStream5.write(header);
	}
	if(250001===num){
		writeStream6.write(header);
	}
	if(300001===num){
		writeStream7.write(header);
	}
	if(347000<num){
		console.log("It is done");
		return;
	}
	

	request("http://php.app.com/njsent/details.php?recordID="+num,function(err,response,body)
	{
		if (!err && response.statusCode == 200) {
			$ =cheerio.load(body);
			var tableOrder=$(".results tr td");

			var name=tableOrder.eq(1).text();
			 	name=name.replace(",","");
			var county=tableOrder.eq(3).text();   
       		var indicment=tableOrder.eq(5).text();
       		indicment=indicment.replace(",","");
       		var defNum =tableOrder.eq(7).text();
       		var dob =tableOrder.eq(9).text();
       		var ageToday=tableOrder.eq(11).text();
       		var offDesc=tableOrder.eq(14).text();
       		  offDesc=offDesc.replace("\n","");
       		  offDesc=offDesc.replace(/,/g,"");
       		var place=tableOrder.eq(17).text();tableOrder.eq(7).text();
       		var date=tableOrder.eq(19).text();
       		var type =tableOrder.eq(21).text();
       		var ageAtSentence=tableOrder.eq(23).text();
       		var jail=tableOrder.eq(25).text();
       		var paroleIn=tableOrder.eq(27).text();
       		var prob=tableOrder.eq(29).text();
       		var penalty=tableOrder.eq(32).text();
       			penalty=penalty.replace(/,/g,"");
       		var fine=tableOrder.eq(34).text();
       			fine=fine.replace(/,/g,"");
       		var labFee=tableOrder.eq(36).text();
       			labFee=labFee.replace(/,/g,"");
       		var dedr=tableOrder.eq(38).text();
       			dedr=dedr.replace(",","");
       		var restituion=tableOrder.eq(40).text();
       		    restituion=restituion.replace(",","");
       		var judge=tableOrder.eq(43).text();
       			judge=judge.replace(",","");
       		var comments=tableOrder.eq(45).text();
       		    comments=comments.replace(/;/g,"");
       		    comments=comments.replace(/,/g,"");
       		  
         		console.log(name,county,indicment,defNum,dob,ageToday,
         	offDesc,place,date,type,ageAtSentence,jail,paroleIn,
         	prob,penalty,fine,labFee,dedr,restituion,judge,comments);
		}
		
		if(num<=50000){
			writeStream1.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}
		if(50000<num && num<=100000)
		{
			writeStream2.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}
		if(100000<num && num<=150000)
		{
			writeStream3.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}
		if(150000<num && num<=200000)
		{
			writeStream4.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}
		if(200000<num && num<=250000)
		{
			writeStream5.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}
		if(200000<num && num<=250000)
		{
			writeStream6.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}

		if(300000<num)
		{
			writeStream7.write(name+','+county+','+indicment+','+defNum+','+dob+','+ageToday+','+offDesc+','+place+','+date+','+type+','+ageAtSentence+','+jail+','+paroleIn+','+prob+','+penalty+','+fine+','+labFee+','+dedr+','+restituion+','+judge+','+comments+'\n');
		}
	});

    // waits 5 seconds between each record
    setTimeout(function(){
	   	num++;
	   	getCourtData(num);
   	},3000);
   
};
// initiliaze the process
getCourtData(1);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
