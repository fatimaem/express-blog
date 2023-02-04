const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/add',(req,res)=>{
    res.render('articles/add',{article:new Article()})
})
router.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article:article})
})
router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/details',{article:article})
})
router.post('/',async (req,res)=>{
    let article = new Article({
        title : req.body.title,
        markdown: req.body.markdown,
        description: req.body.description
    })
    try{
       article = await article.save();
       res.redirect(`/articles/${article.slug}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/add',{article:article})
    }
   
})
router.put('/:id', async(req,res)=>{
   let article = await Article.findById(req.params.id)
    article.title = req.body.title
    article.markdown = req.body.markdown
    article.description = req.body.description
    try{
    article = await article.save();
    res.redirect(`/articles/${article.slug}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/edit',{article:article})
    }
})
router.delete('/:id', async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
module.exports = router;