import { Router } from "express"
import * as albumsCtrl from "../controllers/albums.js"

const router = Router()

router.get("/:id", isLoggedIn, albumsCtrl.show)

router.post("/search", isLoggedIn, albumsCtrl.search)

router.patch("/:id/addToCollection", isLoggedIn, albumsCtrl.addToCollection)

router.delete("/:albumId/opinions/:opinionId", isLoggedIn, albumsCtrl.deleteOpinion)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export {
  router
}