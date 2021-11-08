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
  axios.get(`https://api.discogs.com/releases/${req.params.id}?token=${process.env.TOKEN}`)
  .then(response => {
    console.log("discogsId----------", response.data.images[0])
    // Album.findOne({ discogsId: response.data.id })
    // .populate("collectedBy")
    // .then((album) => {
    //   res.render("albums/show", {
    //     title: "Album Details",
    //     apiResult: response.data,
    //     album,
    //     userHasAlbum: album?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
    //   })
    // })
    res.render("albums/show", {
          title: "Album Details",
          apiResult: response.data,
          image: response.data.images[0].uri
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





