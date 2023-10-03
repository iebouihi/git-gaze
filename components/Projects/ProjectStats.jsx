import React from "react";

// components

import SummaryStats from "components/Stats/SummaryStats.js";

export default function ProjectsStats({stats}) {
  //console.log("Stats",stats);
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <SummaryStats
                  statSubtitle="MERGE REQUESTS"
                  statTitle={stats.get("total")}
                  statArrow=""
                  statPercent={stats.get("percent_merged")}
                  statPercentColor="text-emerald-500"
                  statDescripiron={"("+stats.get("merged") + " merged)"}
                  statIconName="fas fa-code-branch"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <SummaryStats
                  statSubtitle="Notes & Reviews"
                  statTitle={stats.get("average_note_per_mr") + " note/MR"}
                  statArrow=""
                  statPercent="70"
                  statPercentColor="text-red-500"
                  statDescripiron="of Merge Requests are not commented"
                  statIconName="fas fa-comments"
                  statIconColor="bg-red-500"
                />
                
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <SummaryStats
                  statSubtitle="MEMBERS"
                  statTitle={stats.get("members")}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-orange-500"
                  statDescripiron="Total Members"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <SummaryStats
                  statSubtitle="AI analysis score"
                  statTitle="1 of 5"
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron="Quality of the project reviewed by AI"
                  statIconName="fas fa-robot"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
