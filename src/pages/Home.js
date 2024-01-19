import React, { useState } from "react";
import Body from "../components/Body";
import Feed from "../components/Feed";
import Select from "../components/Select";

export const sectionOptions = [
  {
    name: "General",
    value: "general",
  },
  {
    name: "Business",
    value: "business",
  },
  {
    name: "Entertainment",
    value: "entertainment",
  },
  {
    name: "Health",
    value: "health",
  },
  {
    name: "Science",
    value: "science",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Technology",
    value: "technology",
  },
];

function Home() {
  const [section, setSection] = useState("general");
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
      <h2 className="text-center font-bold my-5">Latest Global News </h2>
      <div className="flex gap-4">
        <Select
          onChange={handleSectionChange}
          options={sectionOptions}
          title={"Section"}
          value={section}
        />

        <Select
          onChange={handleCountryChange}
          options={countryOptions}
          title={"Country"}
          value={country}
        />
      </div>
      <Feed section={section} country={country} />
    </div>
  );
}

export default Home;
