import { Button } from "@/components/ui/button"
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";


export default async function Home() {

  const sliderList = await GlobalApi.getSliders();

  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div className="p-10 px-10 md:px-16">
      {/* Sliders */}
      <Slider sliderList = {sliderList}/>
      {/* CategoryList */}
      <CategoryList categoryList = {categoryList}/>
    </div>
  );
}