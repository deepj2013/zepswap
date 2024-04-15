import React from "react";
import { AiTwotoneBulb } from "react-icons/ai";

function DashboardDetails() {
  return (
    <div className="h-screen w-full overflow-scroll">
      <div className="flex flex-wrap justify-between gap-10 mt-20">
        {[1, 1, 1, 1, 1, 1,].map((ele) => {
          return <Card />;
        })}
      </div>
    </div>
  );
}

export default DashboardDetails;

const Card = () => {
  return (
    <div className="w-[22rem]  ">
      <div class="max-w-sm p-6  bg-theme/80 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <AiTwotoneBulb className="text-white text-6xl " />

        <a href="#">
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            33333
          </h5>
        </a>
        <p class="mb-3 font-normal text-white dark:text-gray-400">
          Go to this step by step guideline process on how to certify for your
          weekly benefits:
        </p>
        <a
          href="#"
          class="inline-flex font-medium items-center text-background hover:underline"
        >
          Get Details
         
        </a>
      </div>
    </div>
  );
};
