import { Router } from 'express'
import * as indexCtrl from "../controllers/index.js"

const router = Router()

router.get("/", indexCtrl.index)

// router.get('/', function (req, res) {
//   res.render('index', { title: 'Home Page', user: req.user ? req.user : null })
// })

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}


export {
  router
}