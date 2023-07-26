const checkAdminPermissions = async function(req, res, next){
    try {
  
      if(req.headers["auth"] == undefined || req.headers["auth"][req.headers["auth"].length-1] != '+' ){
        res.status(403).send()
      }
      let user = req.headers["auth"].substring(0, req.headers["auth"].length-1)
      let checkUser = await User.findOne({name: user})
    
      if(checkUser.role == "admin"){
        
        next();
      } else {
       
        res.status(403).send();
      }
  
    } catch (error) {
      res.status(501).send(error)
    }
  }

  module.exports = {checkAdminPermissions}