
import AdminProductTile from "@/components/admin-view/AdminProductTile"
import Productimg from "@/components/admin-view/Productimg"
import CommanForm from "@/components/common/CommanForm"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { useToast } from '@/hooks/use-toast'


import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"


const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: "",
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

export default function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()
  const { toast } = useToast();


  async function onSubmit(event) {
    event.preventDefault();

    // if (!uploadedImageUrl) {
    //   alert("Please wait for the image to finish uploading.");
    //   return;
    // }
    (currentEditedId !== null)
      ?
      (dispatch(editProduct({
        id: currentEditedId,
        formData
      })).then((data) => {
        console.log(data, 'edit');

        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null);
        }
      }
      ))
      :
      (dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then((data) => {
        console.log("Product added:", data);
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProductsDialog(false)
          setImageFile(null);
          setFormData(initialFormData)
          //toast message
          toast({
            title: "Product added successfully",
            description: "Your product has been added!",
            variant: "default",
          });
        }
      }).catch(error => {
        console.error("Failed to add product:", error);
      })
      );
  }

  //delete function
  function handleDelete(getCurrentProductId) {
    if (!getCurrentProductId) {
      console.error("Error: No product ID provided for deletion");
      return;
  }
    dispatch(deleteProduct(getCurrentProductId))
      .then((data) => {
        if (data?.payload?.success) {
            dispatch(fetchAllProducts());
        }
      })

  }


  function isFormValid() {
    return Object.keys(formData)
      .map(key => formData[key] !== '')
      .every(item => item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])


  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)} className="bg-black text-white">Add New Product</Button>
      </div>
      {/* product render */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0
            ?
            productList.map((productItem) => {
              return (<AdminProductTile
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                product={productItem}
                handleDelete={handleDelete}
              />)
            })
            :
            null
        }
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}

      >
        <SheetContent side="right" className='overflow-auto bg-gray-50'>
          <SheetHeader>
            <SheetTitle>{
              currentEditedId !== null
                ?
                'Edit Product'
                :
                'Add New Product'
            }
            </SheetTitle>
          </SheetHeader>
          <Productimg
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommanForm
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null
                  ?
                  "Edit"
                  :
                  "Add"
              }
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
