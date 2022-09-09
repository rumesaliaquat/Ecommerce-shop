const express = require("express");
const app = express();
const { route } = require("express");
const router = express.Router();
const ProductModel = require("../models/productModel.js");

const api = process.env.API_URL;


router.get(`${api}/products`, (req, res) => {
    ProductModel.find({}, (err, data) => {
        if (err) {
          res.send(err).status(400);
          console.log(err);
        } else {
          res.send(data).status(200);
          console.log(data);
        }
      });
});
// router.get(`${api}/products/:id`, (req, res) => {
//   let id = req.params.id;
//   ProductModel.find({ _id: id }, (err, data) => {
//     if (err) {
//       res.send(err).status(400);
//     } else {
//       res.send(data).status(200);
//     }
//   });
// });
router.post(`${api}/products`, (req, res) => {
    const { productName, image, countInStock } = req.body;
   console.log(req.body);
    let errArr = [];
  
    if (!productName) {
      errArr.push("Required : Product Name");
    }
    if (!image) {
      errArr.push("Required : Image");
    }
    if (!countInStock) {
      errArr.push("Required : Stock Limit");
    }
  
    if (errArr && errArr.length > 0) {
        res.send(errArr).status(404);
        console.log(errArr);
      return;
    }
  
    let productObj = new ProductModel({
        productName,
        image,
        countInStock,
        createdAt: new Date()
    });
    console.log(productObj);
    productObj.save((err, result) => {
      if (err) {
          res.send(err).status(404);
          console.log(err);
      } else {
          res.send(result).status(200);
          console.log(result)
      }
    });
});
// router.put("/:id", (req, res) => {});
// router.delete("/:id", (req, res) => {});

module.exports = router;