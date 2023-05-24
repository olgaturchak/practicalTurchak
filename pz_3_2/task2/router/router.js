const Router = require("express").Router
const pagesController = require("../controllers/PagesController")

const router = new Router()

router.get("/", pagesController.login)
router.post("/test", pagesController.test)
router.post("/test/result", pagesController.result)
router.post("/test/result/saved", pagesController.saveResultsMiddleware)




module.exports = router