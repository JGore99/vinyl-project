import { Router } from "express"
import * as albumsCtrl from "../controllers/albums.js"

const router = Router()

router.get("/:id", isLoggedIn, albumsCtrl.show)

router.post("/search", isLoggedIn, albumsCtrl.search)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export {
  router
}