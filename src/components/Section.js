import React from "react";

function Section({ onChange = false }) {
  function handleSectionChange(val) {
    onChange(val);
  }
  return (
    <>
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium leading-6 text-white"
        >
          Section
        </label>
        <div className="my-2 font-normal">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block font-normal rounded-md w-full border-0 py-1.5 text-white bg-[#0D1117] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option _ngcontent-qii-c267="" value=""></option>
            <option
              _ngcontent-qii-c267=""
              value="arts"
              class="ng-star-inserted"
            >
              {" "}
              arts{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="automobiles"
              class="ng-star-inserted"
            >
              {" "}
              automobiles{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="books/review"
              class="ng-star-inserted"
            >
              {" "}
              books/review{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="business"
              class="ng-star-inserted"
            >
              {" "}
              business{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="fashion"
              class="ng-star-inserted"
            >
              {" "}
              fashion{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="food"
              class="ng-star-inserted"
            >
              {" "}
              food{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="health"
              class="ng-star-inserted"
            >
              {" "}
              health{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="home"
              class="ng-star-inserted"
            >
              {" "}
              home{" "}
              <span _ngcontent-qii-c267="" class="ng-star-inserted">
                {" "}
                (default){" "}
              </span>
            </option>
            <option
              _ngcontent-qii-c267=""
              value="insider"
              class="ng-star-inserted"
            >
              {" "}
              insider{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="magazine"
              class="ng-star-inserted"
            >
              {" "}
              magazine{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="movies"
              class="ng-star-inserted"
            >
              {" "}
              movies{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="nyregion"
              class="ng-star-inserted"
            >
              {" "}
              nyregion{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="obituaries"
              class="ng-star-inserted"
            >
              {" "}
              obituaries{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="opinion"
              class="ng-star-inserted"
            >
              {" "}
              opinion{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="politics"
              class="ng-star-inserted"
            >
              {" "}
              politics{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="realestate"
              class="ng-star-inserted"
            >
              {" "}
              realestate{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="science"
              class="ng-star-inserted"
            >
              {" "}
              science{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="sports"
              class="ng-star-inserted"
            >
              {" "}
              sports{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="sundayreview"
              class="ng-star-inserted"
            >
              {" "}
              sundayreview{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="technology"
              class="ng-star-inserted"
            >
              {" "}
              technology{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="theater"
              class="ng-star-inserted"
            >
              {" "}
              theater{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="t-magazine"
              class="ng-star-inserted"
            >
              {" "}
              t-magazine{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="travel"
              class="ng-star-inserted"
            >
              {" "}
              travel{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="upshot"
              class="ng-star-inserted"
            >
              {" "}
              upshot{" "}
            </option>
            <option _ngcontent-qii-c267="" value="us" class="ng-star-inserted">
              {" "}
              us{" "}
            </option>
            <option
              _ngcontent-qii-c267=""
              value="world"
              class="ng-star-inserted"
            >
              {" "}
              world{" "}
            </option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Section;
