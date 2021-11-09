import { Album } from '../models/albums.js'
import { AlbumOpinion } from '../models/albumOpinion.js'

function create(req, res) {
  req.body.author = req.user.profile._id
  req.body.album = req.params.id

  AlbumOpinion.create(req.body)
  .then(opinion => {
    Album.findById(req.params.id)
    .then(album => {
      album.opinions.push(opinion._id)
      album.save()
      .then(() => {
        res.redirect(`/albums/${album.discogsId}`)
      })
    })
  })
}


export {
  create
}