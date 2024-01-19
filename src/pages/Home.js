import React, { useState } from "react";
import Body from "../components/Body";
import Feed from "../components/Feed";
import Select from "../components/Select";

export const sectionOptions = [
  { name: "World", value: "world" },
  { name: "United States", value: "us" },
  { name: "Upshot", value: "upshot" },
  { name: "Travel", value: "travel" },
  { name: "T-Magazine", value: "t-magazine" },
  { name: "Theater", value: "theater" },
  { name: "Technology", value: "technology" },
  { name: "Sunday Review", value: "sundayreview" },
  { name: "Sports", value: "sports" },
  { name: "Science", value: "science" },
  { name: "Real Estate", value: "realestate" },
  { name: "Politics", value: "politics" },
  { name: "Opinion", value: "opinion" },
  { name: "Obituaries", value: "obituaries" },
  { name: "NY Region", value: "nyregion" },
  { name: "Movies", value: "movies" },
  { name: "Magazine", value: "magazine" },
  { name: "Insider", value: "insider" },
  { name: "Home (Default)", value: "home" },
  { name: "Health", value: "health" },
  { name: "Food", value: "food" },
  { name: "Fashion", value: "fashion" },
  { name: "Business", value: "business" },
  { name: "Books/Review", value: "books/review" },
  { name: "Automobiles", value: "automobiles" },
  { name: "Arts", value: "arts" },
];

function Home() {
  const [section, setSection] = useState("home");
  const [country, setCountry] = useState("in");

  const countryOptions = [
    { name: "Argentina", value: "ar" },
    { name: "Australia", value: "au" },
    { name: "Austria", value: "at" },
    { name: "Belgium", value: "be" },
    { name: "Brazil", value: "br" },
    { name: "Bulgaria", value: "bg" },
    { name: "Canada", value: "ca" },
    { name: "China", value: "cn" },
    { name: "Colombia", value: "co" },
    { name: "Cuba", value: "cu" },
    { name: "Czech Republic", value: "cz" },
    { name: "Egypt", value: "eg" },
    { name: "France", value: "fr" },
    { name: "Germany", value: "de" },
    { name: "Greece", value: "gr" },
    { name: "Hong Kong", value: "hk" },
    { name: "Hungary", value: "hu" },
    { name: "India", value: "in" },
    { name: "Indonesia", value: "id" },
    { name: "Ireland", value: "ie" },
    { name: "Israel", value: "il" },
    { name: "Italy", value: "it" },
    { name: "Japan", value: "jp" },
    { name: "Latvia", value: "lv" },
    { name: "Lithuania", value: "lt" },
    { name: "Malaysia", value: "my" },
    { name: "Mexico", value: "mx" },
    { name: "Morocco", value: "ma" },
    { name: "Netherlands", value: "nl" },
    { name: "New Zealand", value: "nz" },
    { name: "Nigeria", value: "ng" },
    { name: "Norway", value: "no" },
    { name: "Philippines", value: "ph" },
    { name: "Poland", value: "pl" },
    { name: "Portugal", value: "pt" },
    { name: "Romania", value: "ro" },
    { name: "Russia", value: "ru" },
    { name: "Saudi Arabia", value: "sa" },
    { name: "Serbia", value: "rs" },
    { name: "Singapore", value: "sg" },
    { name: "Slovakia", value: "sk" },
    { name: "Slovenia", value: "si" },
    { name: "South Africa", value: "za" },
    { name: "South Korea", value: "kr" },
    { name: "Sweden", value: "se" },
    { name: "Switzerland", value: "ch" },
    { name: "Taiwan", value: "tw" },
    { name: "Thailand", value: "th" },
    { name: "Turkey", value: "tr" },
    { name: "UAE", value: "ae" },
    { name: "Ukraine", value: "ua" },
    { name: "United Kingdom", value: "gb" },
    { name: "United States", value: "us" },
    { name: "Venezuela", value: "ve" },
  ];

  function handleSectionChange(e) {
    setSection(e);
  }

  function handleCountryChange(e) {
    setCountry(e);
  }
  return (
    <div className="timeline max-w-xl mx-auto">
      <p className="text-center font-bold my-5">Latest Global News</p>

      <div className="flex gap-4">
        <Select
          onChange={handleSectionChange}
          options={sectionOptions}
          title={"Section"}
          value={section}
        />

        {/* <Select
          onChange={handleCountryChange}
          options={countryOptions}
          title={"Country"}
          value={country}
        /> */}
      </div>
      <Feed section={section} />
    </div>
  );
}

export default Home;
