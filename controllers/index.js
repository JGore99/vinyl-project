function index(req, res) {
  res.render("index", {
    title: "I've got that on vinyl",
    // user: req.user ? req.user : null
  })
}

export {
  index
}