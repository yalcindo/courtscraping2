
/**
 * Module dependencies.
 */
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");
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
writeStream.write('Name,' + 'County,'+'Indictment,'+'Defendant Number,'+'DOB,'+
	'Age Today,' + 'Offense Description,' + 'Sentencing Place,'+'Sentencing Date,'+'Sentencing Type ,'+'Age at sentence,'+
	'Jail,' + 'Parole Ineligibility,'+'Probation,'+'Penalty,' + 'Fine,'+'Lab Fee,'+ 'DEDR,'+'Restitution,'+'Judge,' + 'Comments'+'\n');

	request("http://php.app.com/njsent/details.php?recordID=1",function(err,response,body)
	{
		if (!err && response.statusCode == 200) {
			$ =cheerio.load(body);
			var csvString="";
			$(".results tr").each(function(i,el)
			{

				var column1=$(this).children().eq(1).text();
				var column2=$(this).children().eq(3).text();
				
				column1 = column1.replace(";", "");
				column2 = column2.replace(";", "");
				column1 = column1.replace(",", "");
				column2 = column2.replace(",", "");
				if(i!==0 && i!==4 && i!==6 && i!==10 && i!==13)
				{
					if(column1==="")
					{
						column1="No information"
					}
					if(column2==="")
					{
						column2="No information"
					}
				}
			
				if(column1!=="" && column2!==""){
					if(csvString==="")
					{
						csvString=column1+','+column2;
					}else{
						csvString= csvString+','+column1+','+column2 ;
					}
				}else if(column1)
				{
					csvString=csvString+','+ column1;
				}else if(column2)
				{
					csvString= csvString +','+column2;
				}
			});
			 
          	writeStream.write(csvString + '\n');
         
		}
	});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
