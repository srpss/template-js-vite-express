
const checkPermisions = async function (req, res, next) {
    try {
      if(req.headers["auth"] == undefined && req.headers["auth"][-1] == "+"){
        res.status(403).send()
      }
      let user = req.headers["auth"].substring(0, req.headers["auth"].length-1)
      let checkUser = User.findOne({name: user})
      if(checkUser.role == "admin"){
        next()
      }
  
      const record = await Record.findOne({ title: req.body.title });
    
      let resHeader = req.headers["auth"];
      let header = resHeader.substring(0, resHeader.length - 1)
     
      if(record.author == header){
        next()
      }
      else{
        res.status(403).send()
      }
    } catch (error) {
      res.status(501).send(error)
    }
  }

  module.exports = {checkPermisions}