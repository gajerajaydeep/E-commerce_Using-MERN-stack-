const express = require('express');

const { handleImageUpload,
addProduct,
editProducts,
fetchAllProducts,
deleteProducts
} = require('../../controllers/admin/products-controller')

const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/add',addProduct)
router.put('/edit/:id',editProducts)
router.delete('/delete/:id',deleteProducts)
router.get('/get',fetchAllProducts)


module.exports = router;