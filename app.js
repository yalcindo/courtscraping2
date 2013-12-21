
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
writeStream.write('LastName,'+'Name,' + 'County,'+'Indictment,'+'Defendant Number,'+'DOB,'+
	'Age Today,' + 'Offense Description,' + 'Sentencing Place,'+'Sentencing Date,'+'Sentencing Type ,'+'Age at sentence,'+
	'Jail,' + 'Parole Ineligibility,'+'Probation,'+'Penalty,' + 'Fine,'+'Lab Fee,'+ 'DEDR,'+'Restitution,'+'Judge Lastname,' + 'Judge Firstname,' + 'Comments'+'\n');

	
	request("http://php.app.com/njsent/details.php?recordID=1",function(err,response,body)
	{
		if (!err && response.statusCode == 200) {
			$ =cheerio.load(body);
			var csvString="";
			$(".results tr").each(function(i,el)
			{

				var value1=$(this).children().eq(1).text();
				var value2=$(this).children().eq(3).text();
			
				if(value1!=="" && value2!==""){
					if(csvString==="")
					{
						csvString=value1+','+value2;
					}else{
						csvString= csvString+','+value1+','+value2 ;
					}
				}else if(value1)
				{
					console.log("value1",value1);
					csvString=csvString+','+ value1;
				}else if(value2)
				{
					console.log("value2",value2);
					csvString= csvString +','+value2;
				}
			});
			  console.log(csvString);
          	writeStream.write(csvString + '\n');
         
		}
	});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
