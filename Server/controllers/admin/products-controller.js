const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");



const handleImageUpload = async (req, res) => {
    try {

        const b64 = req.file.buffer.toString('base64');
        const base64Image = `data:${req.file.mimetype};base64,${b64}`;

        const result = await imageUploadUtil(base64Image);

        // console.log("Image uploaded successfully:", result); //success message
        return res.status(200).json({ success: true, message: "Image uploaded successfully", result });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured",
        })
    }
}

//add new products
const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body

        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}



//fetch all products
const fetchAllProducts = async (req, res) => {
    try {

        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

//edit a producsts
const editProducts = async (req, res) => {
    try {

        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;

        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.price = price === '' ? 0 : price || findProduct.price
        findProduct.salePrice =salePrice === '' ? 0 : salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}




//delete a products
// const deleteProducts = async (req, res) => {
//     try {

//         const { id } = req.params
//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found",
//             });
//         }
//         res.status.json({
//             success : true,
//             message : 'Product delete Successfully',
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Error occured'
//         })
//     }
// }
const mongoose = require("mongoose");  // Import mongoose for ObjectId validation

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if ID exists in request
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID format",
            });
        }

        // Find and delete the product by ID
        const product = await Product.findByIdAndDelete(id);

        // If product is not found
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Successfully deleted the product
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product",
        });
    }
};



module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProducts, deleteProducts }