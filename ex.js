var spawn = require('child_process').spawn;
var path = require('path')

var curDir = process.cwd();
var child = spawn('live.bat', [], {cwd: curDir});

var emotions = {'arousal_history': [0,0,0,0,0,0,0,0,0,0],
                'valence_history': [0,0,0,0,0,0,0,0,0,0]};

var emo_inf = [0,0,0,0,0,0,0];
var aff_inf = [0,0,0,0,0,0];
var loi_inf = [0,0,0];
var emo_labels = ['anger', 'boredom', 'disgust', 'fear', 'happiness', 'neutral', 'sadness'];
var aff_labels = ['agressiv', 'cheerful', 'intoxicated', 'nervous', 'neutral_abc', 'tired'];
var loi_labels = ['loi1', 'loi2', 'loi3'];				
// Load native UI library
var gui = require('nw.gui'); 
// Get the current window
var win = gui.Window.get();

function updateView(){
	plot_data['datasets'][0]['data'] = emotions['arousal_history'];
	plot_data['datasets'][1]['data'] = emotions['valence_history'];
	chart.Line(plot_data, {animation: false});
	emo_data['datasets'][0]['data'] = emo_inf;
	emo_chart.Bar(emo_data, {animation: false});
	aff_data['datasets'][0]['data'] = aff_inf;
	aff_chart.Bar(aff_data, {animation: false});
	loi_data['datasets'][0]['data'] = loi_inf;
	loi_chart.Bar(loi_data, {animation: false});
	
}

var grepStart = function(data){
    var text = data.toString();
	var match = text.match(/recording from portAudio device with index/);
	if(match != null){
	    $('.splash').fadeOut();
		child.stdout.on('data', grepValues);
        child.stderr.on('data', grepValues);
    }
}

var grepValues = function(data){
    var text = data.toString();
	var match = text.match(/LibSVM  '([A-Za-z]+)' result \(@ time: [0-9.]+\) :  ~~> ([A-Za-z0-9.-]+) <~~/);
	if(match != null){
       if(match[1] == 'arousal'){
			emotions['arousal_history'].shift();
			emotions['arousal_history'].push(parseFloat(match[2]));
		}
		else if(match[1] == 'valence'){
			emotions['valence_history'].shift();
			emotions['valence_history'].push(parseFloat(match[2]));
		}
	}
	var pattern = /prob\. class '([A-Za-z_]+[1-3]?)':\s+([0-9.]+)/g;
	while(match = pattern.exec(text)){
	    if(emo_labels.indexOf(match[1]) >= 0)
		    emo_inf[emo_labels.indexOf(match[1])] = match[2];
		else if(aff_labels.indexOf(match[1]) >= 0)
		    aff_inf[aff_labels.indexOf(match[1])] = match[2];
		else if(loi_labels.indexOf(match[1]) >= 0)
		    loi_inf[loi_labels.indexOf(match[1])] = match[2];
		if(match[1] == 'loi3')
		    updateView();
	}
}

var cleanup = function () {
    child.kill();
	var killer = spawn('kill.bat');
	killer.on('exit', function(){ win.close(true);});
}

child.stdout.on('data', grepStart);
child.stderr.on('data', grepStart);

win.on('close', cleanup);	
