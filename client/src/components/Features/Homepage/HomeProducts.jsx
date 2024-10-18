import ProductCards from "components/UI/Products/ProductCards";
import Section from "components/UI/Wrappers/Section";
import React from "react";

export default function HomeProducts() {
  return (
    <Section withContainer>
      <h2 className="text-2xl text-center py-6">Discover Products</h2>
      <ProductCards />
    </Section>
  );
}
