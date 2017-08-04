const db = require('./db')

/*
 * GET /admin
 */
exports.adminGet = async (req, res, next) => {
  // We need to ensure key actually exists before running this.
  console.log(db.listPages(req.key))
  console.log(req.key)
  res.render('admin', {
    title: 'Admin',
    pages: await db.listPages(req.key)
  })}
