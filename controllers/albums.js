import { Album } from "../models/albums.js"
import axios from "axios"

function search(req, res) {
  axios.get(`http://api.discogs.com/database/search?type=release&q=${req.body.search}&token=${process.env.TOKEN}&format=vinyl`)
  .then(response => {
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
  console.log("REQ PARAMS----------", req.params.id)
  axios.get(`https://api.discogs.com/database/search?type=release&q=${req.params.id}&token=${process.env.TOKEN}`)
  .then(response => {
    Album.findOne({ discogsId: response.data.id })
    .populate("collectedBy")
    .then((album) => {
      console.log("discogsId----------", response.data.id)
      res.render("albums/show", {
        title: "Album Details",
        apiResult: response.data,
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





