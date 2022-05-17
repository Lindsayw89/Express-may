const express = require('express')
const fs=require('fs')
const path = require('path')

const app=express()


app.set('views', path.join(__dirname, 'views'))
//set allows you to set certain options for express
app.set('view engine', 'ejs')

//middleware
// bascially tells the server, anything in this file, you can use, otherwise 
//it has to be listed in one of the paths below css hint
app.use(express.static('public'))


// to extract incoming data post
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res){
	// const htmlfilepath= path.join(__dirname, 'views', 'index.html')
	// res.sendFile(htmlfilepath)
	//render renders templates with help of an engine and converts to html
	res.render('index')
})

app.get('/restaurants',  function(req, res){
	// const restaurantfilepath=path.join(__dirname, 'views', 'restaurants.html')
	// res.sendFile(restaurantfilepath)

	const filePath=path.join(__dirname, 'data', 'restaurants.json')
	const fileData=fs.readFileSync(filePath)
	const storedRestaurants=JSON.parse(fileData)

	res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants})
})

app.get('/confirm', function(req, res){
	// const confirmfilepath= path.join(__dirname, 'views', 'confirm.html')
	// res.sendFile(confirmfilepath)
	res.render('confirm')
})
app.get('/recommend', function(req, res){
	// const recommendfilepath= path.join(__dirname, 'views', 'recommend.html')
	// res.sendFile(recommendfilepath)
	res.render('recommend')

})

app.post('/recommend', function(req, res){
	const restaurant=req.body
	const filePath=path.join(__dirname, 'data', 'restaurants.json')
	const fileData=fs.readFileSync(filePath)
	const storedRestaurants=JSON.parse(fileData)

	storedRestaurants.push(restaurant)

	fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))
	res.redirect('/confirm')
})


app.get('/about', function(req, res){
	// const aboutfilepath= path.join(__dirname, 'views', 'about.html')
	// res.sendFile(aboutfilepath)
	res.render('about')
})





app.listen(3000)