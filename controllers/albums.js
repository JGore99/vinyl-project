import { Album } from "../models/albums.js"
import axios from "axios"

function search(req, res) {
  axios.get(`https://api.discogs.com/database/search?q=${req.body.search}&token=${process.env.TOKEN}`)
  .then(response => {
    console.log(response.data.results)
    res.render('albums/results', {
      title: 'Search results',
      results: response.data.results
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
}

export {
  search,
  show
}