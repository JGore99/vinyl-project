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
    console.log("discogsId----------", response.data.tracklist)
    Album.findOne({ discogsId: response.data.id })
    .populate("collectedBy")
    .then((album) => {
      res.render("albums/show", {
        title: "Album Details",
        apiResult: response.data,
        artist: response.data.artists_sort,
        albumTitle: response.data.title,
        image: response.data.images[0].uri,
        tracklist: response.data.tracklist,
        userHasAlbum: album?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToCollection(req, res) {
  req.body.collectedBy = req.user.profile._id
  Album.findOne({ discogsId: req.params.id })
  .then((album) => {
    if (album) {
      album.collectedBy.push(req.user.profile._id)
      album.save()
      .then(() => {
        res.redirect(`/albums/${req.params.id}`)
      })
    } else {
      Album.create(req.body)
      .then(() => {
        res.redirect(`/albums/${req.params.id}`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  search,
  show,
  addToCollection
}





