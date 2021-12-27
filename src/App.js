import { useEffect, useState } from "react";
import Chart from "./component/chart";

import "./styles.css";

export default function App() {
  const [employee, setEmployee] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const managerID = urlParams.get("reporting_manager_id");
  console.log(managerID);

  async function getEmployee() {
    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetch(
      `https://be.platform.simplifii.com/api/v1/custom/getChartDataForLocationTrackingRatio?reporting_manager_id=${managerID}`,
      requestOptions
    );
    const result = await response.json();
    const data = await result.response.data;
    console.log(data);
    setEmployee(data);
  }
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="App">
      <h1 className="my-2" style={{ fontWeight: "bold" }}>
        Location Tracking Score
      </h1>
      <div className="gridStyle">
        {employee.map((employee, index) => {
          return (
            <>
              <div style={{ width: "100%" }}>
                <Chart
                  chartData={{
                    labels: employee["data"].map((e) => e["date"]),
                    datasets: [
                      {
                        label: employee["name"],
                        data: employee["data"].map((e) => e["last_7_days_avg"]),
                        backgroundColor: [
                          index % 2 == 0
                            ? "rgba(91, 123, 251, 0.6)"
                            : "rgba(99, 133, 238, 0.9)",
                          "rgba(54, 162, 235, 0.6)",
                          "rgba(255, 206, 86, 0.6)",
                          "rgba(75, 192, 192, 0.6)",
                          "rgba(153, 102, 255, 0.6)",
                          "rgba(255, 159, 64, 0.6)",
                          "rgba(255, 99, 132, 0.6)"
                        ]
                      }
                    ]
                  }}
                  empName={employee["name"]}
                  last30days={employee.customer_visits_in_last_30_days}
                  trackRatio={employee["data"][0]["tracking_ratio"]}
                  trackDiff={
                    ((employee["data"][employee.data.length - 1][
                      "last_30_days_avg"
                    ] -
                      employee["data"][0]["last_30_days_avg"]) /
                      employee["data"][employee.data.length - 1][
                        "last_30_days_avg"
                      ]) *
                    100
                  }
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
