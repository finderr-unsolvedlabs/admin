import React from "react";
import Navbar from "@components/Navbar";
import ShopByBrands from "@components/Brand/ShopByBrands";
// import SearchBar from "@components/Search/SearchBar";
import Footer from "@components/Footer";
import Stores from "@components/Store/Stores";
import ReactGA from "react-ga4";
import ShopByCategories from "@components/Categories/ShopByCategories";
import { IHomePageProps } from "@/services/interfaces/pages/home";
import { fetchData } from "@/services/api";
import { CarouselWithRatio } from "@/components/Carasouel/CarousalWithRatio";
import { EventCarousal } from "@/components/Carasouel/EventCarousal";
import { StoriesComponent } from "@components/Stories";
import { HandpickedProducts } from "@/components/PageSections/HandpickedProducts";
import SearchBar from "@/components/Search/SearchBar";
import { TextWelcome } from "@/components/WelcomeSection";

const trackingId = "G-L2FXB5H2TE"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

export const getServerSideProps = async () => {
  return fetchData("website/pages/home")
    .then(({ data }) => {
      return {
        props: {
          data: data.data,
        },
      };
    })
    .catch((error) => {
      console.error(`can not fetch data for home`);
      console.error(error);
    });
};

export interface IBanner {
  image: string;
  link?: string;
}

export default function Home({
  data: {
    featured_brands,
    featured_categories,
    featured_products,
    diwali_picks,
    featured_stores,
    events,
    offers,
    stories,
  },
}: IHomePageProps) {
  React.useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "home",
    });
  }, []);

  const banners: IBanner[] = [
    {
      image:
        "https://finderrimages1.s3.ap-south-1.amazonaws.com/Banner+Images/Diwali+Banner.png",
      link: "https://shop.finderr.co.in/diwali-picks",
    },
  ];

  return (
    <div className="w-[95vw] mx-auto">
      <Navbar />
      <SearchBar />
      <StoriesComponent stories={stories} />
      <CarouselWithRatio banners={banners} heightPercent={43} />
      <TextWelcome />
      <ShopByCategories categoryList={featured_categories} />
      <HandpickedProducts
        products={diwali_picks}
        title="Diwali's Handpicked"
        action={{ label: "View More", url: "/diwali-picks" }}
      />
      <EventCarousal events={events} offers={offers} />
      <ShopByBrands brands={featured_brands} />
      <Footer />
    </div>
  );
}
