const router = require('express').Router()
let Post = require('../models/post.model')



router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err))
});


router.route('/add').post((req, res) => {
    const title = req.body.title
    const body = req.body.body
    const newPost = new Post({
        title,
        body
    })

    newPost.save()
        .then(() => res.json('Post Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post Deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {

            post.title = req.body.title
            post.body = req.body.body


            post.save()
                .then(() => res.json("Post Updated"))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})



module.exports = router