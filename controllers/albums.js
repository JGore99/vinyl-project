import { Album } from "../models/albums.js"
import { AlbumOpinion } from '../models/albumOpinion.js'
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
  // console.log("REQ PARAMS----------", req.params.id)
  axios.get(`https://api.discogs.com/releases/${req.params.id}?token=${process.env.TOKEN}`)
  .then(response => {
    // console.log("discogsId----------", response.data.tracklist)
    Album.findOne({ discogsId: response.data.id })
    .populate("collectedBy")
    .populate({
      path: 'opinions', 
      populate: {
        path: 'author'
      }
    })
    .then((album) => {
      res.render("albums/show", {
        title: "Album Details",
        apiResult: response.data,
        album,
        artist: response.data.artists_sort,
        albumTitle: response.data.title,
        image: response.data.images[0].uri,
        tracklist: response.data.tracklist,
        userHasAlbum: album?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
        userHasOpinion: album?.opinions.some(opinion => opinion.author.equals(req.user.profile._id)), 
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

function deleteOpinion(req, res) {
  console.log("REQBODY--------", req.body)
  console.log("REQPARAMS--------", req.params.albumId)
  Album.findById(req.params.albumId)
  .then((album) => {
    AlbumOpinion.findByIdAndDelete(req.params.opinionId)
    .then(() => {
      res.redirect(`/albums/${album.discogsId}`)
    })
  })
}

export {
  search,
  show,
  addToCollection,
  deleteOpinion
}





