module.exports = (req, res, next) => {
  // if ((req.body && req.body.key) || (req.params && req.params.key)) {
  //   req.user = 'xyz'
  // } else {
  //   // passport.authenticate()
  // }

  req.user = 'xyz'
}
