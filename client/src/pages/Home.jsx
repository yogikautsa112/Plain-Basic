import HomeCategories from "../components/Features/Homepage/HomeCategories";
import HomeImageItem from "../components/Features/Homepage/HomeImageItem";
import HomeSlogan from "../components/Features/Homepage/HomeSlogan";
import BaseLayout from "../components/Layouts/BaseLayout";

export default function Home() {
  return (
    <BaseLayout>
      <HomeImageItem
        text="PLAIN BASIC"
        image="/assets/images/banner-1.png"
        textClassName="text-5xl lg:text-8xl 2xl:text-[10rem]"
        imageClassName="h-[300px] lg:h-[500px] xl:h-[700px] 2xl:h-[800px]"
      />
      <HomeCategories />
      <HomeSlogan />
    </BaseLayout>
  );
}
