import React from "react";

// components

import SummaryStats from "components/Stats/SummaryStats.js";

export default function ProjectsStats({stats}) {
  console.log("Stats",stats);
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
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="fas fa-code-branch"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <SummaryStats
                  statSubtitle="MERGED"
                  statTitle={stats.get("merged")}
                  statArrow=""
                  statPercent={stats.get("percent_merged")}
                  statPercentColor="text-emerald-500"
                  statDescripiron="of Merge Requests are merged"
                  statIconName="fas fa-check-circle"
                  statIconColor="bg-orange-500"
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
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
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
