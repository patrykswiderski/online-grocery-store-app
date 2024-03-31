import { Button } from "@/components/ui/button"
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Image from "next/image";


export default async function Home() {

  const sliderList = await GlobalApi.getSliders();

  const categoryList = await GlobalApi.getCategoryList();

  const productList = await GlobalApi.getAllProducts();


  return (
    <div className="p-10 px-10 md:px-16">
      {/* Sliders */}

      <Slider sliderList = {sliderList}/>
      {/* Category List */}
      <CategoryList categoryList = {categoryList}/>

      {/* Product List */}
      <ProductList productList = {productList}/>

      {/* {Banner} */}
      <Image src='/delivery.png' width={1000} height={300} alt="banner" className="w-full h-[400px] object-contain mt-3"/>
    </div>
  );
}