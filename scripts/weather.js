var baseYahooURL = "https://query.yahooapis.com/v1/public/yql?q=",
	selectedCity = "广州",
	placeHolder = "",
	unit = "C",
	$city = $('#city');

function init() {
    getWoeid(selectedCity);

    $city.keypress(function(){
    	if (event.which === 13) {  //按回车键
    		selectedCity = $city.val();
    		getWoeid(selectedCity);
    		$city.blur();
    	}
    });

    $city.focus(function(event){
    	placeHolder = $city.val(); //将变量赋值到文本框中
    	$city.val("");  //清空文本框
    	$city.css("border-bottom", "1px solid #f5f8fc"); //设置样式
    });

    $city.blur(function(event){
    	if($city.val() === ""){
    		$city.val(placeHolder);
    	}
    });

    $('#btn').click(function(){
    	$('#btn').html() === "F" ? ($('#btn').html("C"), unit = "C") : ($('#btn').html("F"), unit = "F");
    	getWoeid(selectedCity);
    })
}

function getWoeid(city) {
    var woeidYQL = 'select woeid from geo.placefinder where text = "' + city + ' "&format=json';
    var jsonURL = baseYahooURL + woeidYQL;
    $.getJSON(jsonURL, woeidDownloaded);
}

function getWeatherInfo(woeid){
	var weatherYQL = 'select * from weather.forecast where woeid = ' + woeid + ' and u = " ' + unit + ' " &format=json';
	var jsonURL = baseYahooURL + weatherYQL;
	$.getJSON(jsonURL, weatherInfoDownloaded);
}

function woeidDownloaded(data) {
    var woeid = null;
    if (data.query.count <= 0) {
        $city.val('No city found');
        $('#deg').html('');
        setImage(999, $('#big')[0]);
        for (var i = 1; i <= 5; i++) {
            $('#forecast' + i).html("");
            setImage(999, $("#forecast-img" + i));
            $('#forecast-img' + i).html("");
        }
        return;
    }else if(data.query.count == 1){
    	woeid = data.query.results.Result.woeid;
    }else {
    	woeid = data.query.results.Result[0].woeid;
    }
    console.log(woeid); //识别天气预报城市的地区代号
    getWeatherInfo(woeid);
}

function weatherInfoDownloaded(data){
	$city.val(selectedCity);
	$('#deg').html( tempConvert(data.query.results.channel.item.condition.temp) + " °" + unit.toUpperCase());
	setImage(data.query.results.channel.item.condition.code, $('#big'));
	for (var i = 1; i <= 5; i++) {
		var fc = data.query.results.channel.item.forecast[i-1];
        $('#forecast' + i).html(fc.day);
        setImage(fc.code, $("#forecast-img" + i));
        $('#forecast-deg' + i).html( tempConvert(parseInt(fc.low) + parseInt(fc.high)) / 2 + " °" + unit.toUpperCase());
    }
}

function setImage(code, image) {
    switch (parseInt(code)) {
        case 0:
            image.html("&#xe608")
            break;
        case 1:
            image.html("&#xe608")
            break;
        case 2:
            image.html("&#xe603")
            break;
        case 3:
            image.html("&#xe608")
            break;
        case 4:
            image.html("&#xe608")
            break;
        case 5:
            image.html("&#xe60b")
            break;
        case 6:
            image.html("&#xe60a")
            break;
        case 7:
            image.html("&#xe60b")
            break;
        case 8:
            image.html("&#xe60e")
            break;
        case 9:
            image.html("&#xe60e")
            break;
        case 10:
            image.html("&#xe60e")
            break;
        case 11:
            image.html("&#xe60e")
            break;
        case 12:
            image.html("&#xe60e")
            break;
        case 13:
            image.html("&#xe60b")
            break;
        case 14:
            image.html("&#xe60b")
            break;
        case 15:
            image.html("&#xe60b")
            break;
        case 16:
            image.html("&#xe60b")
            break;
        case 17:
            image.html("&#xe60f")
            break;
        case 18:
            image.html("&#xe60f")
            break;
        case 19:
            image.html("&#xe60f")
            break;
        case 20:
            image.html("&#xe605")
            break;
        case 21:
            image.html("&#xe605")
            break;
        case 22:
            image.html("&#xe605")
            break;
        case 23:
            image.html("&#xe605")
            break;
        case 24:
            image.html("&#xe603")
            break;
        case 25:
            image.html("&#xe600")
            break;
        case 26:
            image.html("&#xe604")
            break;
        case 27:
            image.html("&#xe609")
            break;
        case 28:
            image.html("&#xe604")
            break;
        case 29:
            image.html("&#xe609")
            break;
        case 30:
            image.html("&#xe60c")
            break;
        case 31:
            image.html("&#xe60d")
            break;
        case 32:
            image.html("&#xe606")
        case 33:
            image.html("&#xe60d")
            break;
        case 34:
            image.html("&#xe606")
        case 35:
            image.html("&#xe60f")
            break;
        case 36:
            image.html("&#xe606")
        case 37:
            image.html("&#xe608")
            break;
        case 38:
            image.html("&#xe608")
            break;
        case 39:
            image.html("&#xe608")
            break;
        case 40:
            image.html("&#xe60a")
            break;
        case 41:
            image.html("&#xe60b")
            break;
        case 42:
            image.html("&#xe60b")
            break;
        case 43:
            image.html("&#xe60b")
            break;
        case 44:
            image.html("&#xe604")
            break;
        case 45:
            image.html("&#xe608")
            break;
        case 46:
            image.html("&#xe60b")
            break;
        case 47:
            image.html("&#xe608")
            break;
        case 3200:
            image.html("&#xe601")
            break;
        case 999:
            image.html("&#xe606")
            break;
        default:
            image.html("&#xe601")
            break;
    }
}

function tempConvert(temp){
	if(unit === "C"){
		return parseInt((temp - 32) / 1.8);
	}else{
		return temp;
	}
}


$(document).ready(function(){
	init();
})

