import { Router } from "express"
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()

//http://localhost:3000/profiles/
router.get("/", isLoggedIn, profilesCtrl.index)

//http://localhost:3000/profiles/:id
router.get("/:id", isLoggedIn, profilesCtrl.show)

// http://localhost:3000/profiles/:id/edit
router.get("/:id", isLoggedIn, profilesCtrl.edit)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/auth/google")
}

export {
  router
}