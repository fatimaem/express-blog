const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
//allows form to use other methods than only GET,POST
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://fatima:26031967@cluster0.dhwvdbe.mongodb.net/test',{
    useNewUrlParser:true,
    
})
app.set('view engine', 'ejs')

//can access form variables via req.body in endpoints
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/',async (req,res) => {
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render("index",{articles:articles})
})
app.use('/articles',articleRouter)

app.listen(9000)