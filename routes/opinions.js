import { Router } from "express"
import * as opinionsCtrl from "../controllers/opinions.js"

const router = Router()

// http://localhost:3000/opinions/:id
router.post("/:id", isLoggedIn, opinionsCtrl.create)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
export {
  router
}