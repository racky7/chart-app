import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
export default function Chart(props) {
  console.log(props.tracking_ratio);
  return (
    <Card
      className="shadow-sm my-3"
      style={{ margin: "5px", borderRadius: "12px" }}
    >
      <div className="chart">
        <div style={{ padding: "20px" }}>
          <h4
            className="card-title my-3"
            style={{ color: "#242424", textAlign: "left" }}
          >
            {props.empName}
          </h4>
          <span
            style={{
              fontWeight: "bold",
              color: "#4084DE",
              fontSize: 35,
              float: "left"
            }}
          >
            {props.trackRatio} %
          </span>
          {props.trackDiff.toFixed(1) < 0 ? (
            <span
              style={{
                fontWeight: "bold",
                color: "#CB3837",
                fontSize: 22,
                float: "right"
              }}
            >
              ▼{props.trackDiff.toFixed(1) * -1} %
            </span>
          ) : (
            <span
              style={{
                fontWeight: "bold",
                color: "#08B535",
                fontSize: 20,
                float: "right"
              }}
            >
              ▲{props.trackDiff.toFixed(1)} %
            </span>
          )}
        </div>

        <div className="canvas-container">
          <Line
            data={props.chartData}
            options={{
              legend: {
                display: false
              },

              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: false
                    },
                    gridLines: {
                      display: false,
                      drawBorder: false
                    }
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      display: false
                    },
                    gridLines: {
                      display: false,
                      drawBorder: false
                    }
                  }
                ]
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }}
          />
        </div>
        <p>Customer visits last 30 days : {props.last30days}</p>
      </div>
    </Card>
  );
}
