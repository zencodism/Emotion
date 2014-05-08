var plot_data = {
	labels : [-9, -8, -7, -6, -5, -4, -3, -2, -1, "now"],
	datasets : [
		{
			fillColor : "rgba(220,110,110,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,110,110,1)",
			pointStrokeColor : "#fff",
			data : [0,0,0,0,0,0,0,0,0,0]
		},
		{
			fillColor : "rgba(110,110,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(110,110,220,1)",
			pointStrokeColor : "#fff",
			data : [0,0,0,0,0,0,0,0,0,0]
		}
	]
}

var emo_data = {
	labels : ["Anger", "Boredom", "Disgust", "Fear", "Happiness", "Neutral", "Sadness"],
	datasets : [
		{
			fillColor : "rgba(110,220,110,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : [0,0,0,0,0,0,0]
		}
	]
}

var aff_data = {
	labels : ["Aggressive", "Cheerful", "Intoxicated", "Nervous", "Neutral", "Tired"],
	datasets : [
		{
			fillColor : "rgba(220,220,110,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : [0,0,0,0,0,0]
		}
	]
}

var loi_data = {
	labels : ["Low", "Medium", "High"],
	datasets : [
		{
			fillColor : "rgba(110,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : [0,0,0]
		}
	]
}

var ctx = document.getElementById("plot").getContext("2d");
var chart = new Chart(ctx);
chart.Line(plot_data, {animation: false});
var emoctx = document.getElementById("emo_plot").getContext("2d");
var emo_chart = new Chart(emoctx);
emo_chart.Bar(emo_data, {animation: false});
var affctx = document.getElementById("aff_plot").getContext("2d");
var aff_chart = new Chart(affctx);
aff_chart.Bar(aff_data, {animation: false});
var loictx = document.getElementById("loi_plot").getContext("2d");
var loi_chart = new Chart(loictx);
loi_chart.Bar(loi_data, {animation: false});
