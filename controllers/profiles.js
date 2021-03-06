import { Profile } from "../models/profile.js"
import { Album } from "../models/albums.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      title: "User Profiles",
      // user: req.user ? req.user : null,
      profiles,
    })
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("friends")
  .then(profile => {
    Album.find({collectedBy: profile._id})
    .then(albums => {
      Profile.findById(req.user.profile)
      .then(userProfile => {
        console.log("ALBUMS______", albums)
        res.render("profiles/show", {
          title: `${profile.name}'s profile`,
          profile,
          // user: req.user ? req.user : null,
          userProfile,
          albums
        })
      })
    }) 
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render("profiles/edit", {
      title: `Editing ${profile.name}'s profile`,
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body)
  .then(profile => {
    res.redirect(`/profiles/${profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect('/')
  })
}


function removeFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  show,
  edit,
  update,
  addFriend,
  removeFriend
}
