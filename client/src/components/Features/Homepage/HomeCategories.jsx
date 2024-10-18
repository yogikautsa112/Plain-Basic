import React from "react";
import HomeImageItem from "./HomeImageItem";
import "./Homepage.css";

export default function HomeCategories() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 xl:items-start">
      <HomeImageItem
        text="Woman"
        className="xl:col-span-2 xl:row-span-2"
        textClassName="text-xl lg:text-2xl xl:text-3xl"
        image="/assets/images/woman-cat.png"
        imageClassName="h-[150px] md:h-[250px] lg:h-[300px]"
      />
      <HomeImageItem
        text="New Arrival"
        className="xl:row-span-3 xl:col-span-3"
        textClassName="text-xl lg:text-2xl xl:text-3xl"
        image="/assets/images/new-arrival-cat.png"
        imageClassName="h-[150px] md:h-[250px] lg:h-[300px] xl:h-[600px]"
      />
      <HomeImageItem
        className="xl:col-span-1 xl:row-span-1"
        text="Kid"
        textClassName="text-xl lg:text-2xl xl:text-3xl"
        image="/assets/images/kid-cat.png"
        imageClassName="h-[150px] md:h-[250px] lg:h-[300px]"
      />

      <HomeImageItem
        text="Man"
        className="xl:col-span-1 xl:row-span-1"
        textClassName="text-xl lg:text-2xl xl:text-3xl"
        image="/assets/images/men-cat.png"
        imageClassName="h-[150px] md:h-[250px] lg:h-[300px]"
      />
    </div>
  );
}
