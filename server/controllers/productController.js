// Our productController currently just gets our products out
// of the database and sends them back to the frontend.
// Feel free to check out the ../../db/products/get_products
// query to see what that query looks like.
module.exports = {
  getProducts: (req, res) => {
    const db = req.app.get('db')
    db.products.get_products().then(products => {
      res.status(200).send(products)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}