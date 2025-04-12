import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/1.avif';
import bannerTwo from '../../assets/2.avif';
import bannerThree from '../../assets/3.avif';
import bannerFour from '../../assets/shopping-male.jpg';
import { Button } from '@/components/ui/button';
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilterdProducts, fetchproductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile';
import { useNavigate } from 'react-router-dom';
import Nike from '../../assets/nike.jpg'
import Adidas from '../../assets/adidas.jpg'
import Puma from '../../assets/puma.jpg'
import Levis from '../../assets/levis.jpg'
import Zara from '../../assets/zara.jpg'
import Hm from '../../assets/h_m.jpg'
import { useToast } from '@/hooks/use-toast';
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice';
import ProductDetailsDailog from '@/components/shopping-view/ProductDetailsDailog';

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Nike },
  { id: "adidas", label: "Adidas", icon: Adidas },
  { id: "puma", label: "Puma", icon: Puma },
  { id: "levi", label: "Levi's", icon: Levis },
  { id: "zara", label: "Zara", icon: Zara },
  { id: "h&m", label: "H&M", icon: Hm },
];

export default function ShoppingHome() {


  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const { toast } = useToast()


  const slides = [bannerOne, bannerTwo, bannerThree, bannerFour];


  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      //category : men
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  function handleGetProductDetails(getCurrentProductId) {

    dispatch(fetchproductDetails(getCurrentProductId))
  }
  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
        className: "bg-red-500 text-white"
      });
      return;
    }

    dispatch(addTocart({ userId: user.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems({ userId: user.id }));
          toast({
            title: "Product added to cart successfully",
            variant: "success",
            className: "bg-green-500 text-white"
          });
        } else {
          toast({
            title: data?.payload?.message || "Failed to add product to cart",
            variant: "destructive",
            className: "bg-red-500 text-white"
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast({
          title: error?.message || "Error adding product to cart",
          variant: "destructive",
          className: "bg-red-500 text-white"
        });
      });
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilterdProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])


  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [productDetails])
 


  return (
    <>
      <div className='flex flex-col min-h-screen overflow-hidden'>
        <div className='relative w-full h-[600px] overflow-hidden'>
          {
            slides.map((slide, index) => {
              return (
                <img src={slide}
                  key={index}
                  className={`${index === currentSlide ? 'opacity-100 ' : 'opacity-0 z-0 pointer-events-none'} absolute top-0 w-full h-full object-cover transition-opacity duration-1000`}

                />
              )
            })
          }
          <Button variant="outline" size="icon" className="absolute top-1/2 left-4 transform translate-y-1/2 bg-white/80"
            onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % (slides.length)
            )}

          >
            <ChevronLeftIcon className='w-4 h-4' />
          </Button>
          <Button variant="outline" size="icon" className="absolute top-1/2 right-4 transform translate-y-1/2 bg-white/80"
            onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % (slides.length)
            )}
          >
            <ChevronRightIcon className='w-4 h-4' />
          </Button>
        </div>

        <section className='py-12 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {
                categoriesWithIcon.map((categoryItem, index) => {
                  return (
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleNavigateToListingPage(categoryItem, 'category')}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />

                        <span className='font-bold'>{categoryItem.label}</span>
                      </CardContent>
                    </Card>
                  )
                })
              }
            </div>
          </div>
        </section>

        <section className='py-12 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {
                brandsWithIcon.map((brandItem, index) => {
                  return (
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img src={brandItem.icon} alt={brandItem.label} className="w-12 h-12 mb-4 object-contain" />
                        <span className='font-bold'>{brandItem.label}</span>
                      </CardContent>
                    </Card>
                  )
                })
              }
            </div>
          </div>
        </section>

        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {
                productList && productList.length > 0
                  ?
                  productList.map((productItem => <ShoppingProductTile product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                  ))
                  :
                  null
              }
            </div>
          </div>
        </section>
        {productDetails && (
          <ProductDetailsDailog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
          />
        )}
      </div>
    </>
  )
}
