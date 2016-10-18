var IP = "10.21.254.23:3000";
var qrcodeURL = 'https://api.qrserver.com/v1/create-qr-code/?data=http://'+IP+'&size=420x420&margin=0'
var globalData = {
	cars:{
		"veyron":{
			brandName: "BUGATTI",
			carContent: "Its Excellent Exterior, muscular look and awesome mettalic colour is beyond comparison.",
			ground: "Very low ground clearance.",
			mileage: "34300MPH",
			engine: "8.0-litre 16 cylinder produces 987bhp and 1250Nm"
		},
		"gallardo":{
			brandName: "Lamborghini ",
			carContent: "Few vehicles are capable of turning heads as much as a Lamborghini.",
			ground: "Very low ground clearance.",
			mileage: "12400MPH",
			engine: "5.2 liter V10 engine with 560 bph"
		},
		"f50":{
			brandName: "Ferrari",
			carContent: "The f50 Italia is Ferrari's mid-engined V8 sports car with retractable hard top.",
			ground: "Very low ground clearance.",
			mileage: "32300mph",
			engine: "4.5-litre V8 direct fuel injection engine with 562bph"
		},
		"camaro":{
			brandName: "Chevrolet",
			carContent: "With low roof line and sports the familiar but more aggressive Camaro grille.",
			ground: "Very low ground clearance.",
			mileage: "24000mph",
			engine: "6.0 liter V10 engine with 890 bph"
		}
	},
	msgs:{
		"welcome":"Hello. You are near a virtual car experience Kiosk. Scan the QR code to experience our new arrivals. Or you can open the URL mentioned below."
	}
};