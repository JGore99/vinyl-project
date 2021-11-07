import { Album } from "../models/albums.js"
import axios from "axios"

function search(req, res) {
  axios.get(`https://api.discogs.com/database/search?q=${req.body.search}&token=${process.env.TOKEN}`)
  .then(response => {
    console.log("target!!!!",response.data.results[3].title)
    res.render('albums/results', {
      title: 'Search results',
      apiResult: response.data.results
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  axios.get(`https://api.discogs.com/database/search?q=${req.params.id}&token=${process.env.TOKEN}`)
  .then(response => {
    Album.findOne({ discogsId: response.data.id })
    .then((album) => {
      res.render("albums/show", {
        title: "Album Details",
        apiResult: response.data.results,
        album,
        userHasAlbum: album?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  search,
  show
}