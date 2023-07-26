const checkAuth = function (req, res, next) {
    try {
      if(req.headers["auth"] == undefined && req.headers["auth"][-1] == "+"){
        res.status(403).send()
      }
      next()
    } catch (error) {
      res.status(501).send(error)
    }
  }

module.exports = {checkAuth}