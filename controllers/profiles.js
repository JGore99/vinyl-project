import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      title: "Ducks im a row",
      // user: req.user ? req.user : null,
      profiles,
    })
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        // user: req.user ? req.user : null,
        userProfile,
      })
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

export {
  index,
  show,
  update
}