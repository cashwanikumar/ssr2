import React from "react";
import { Line } from "react-chartjs-2";

class PlotChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
    }

    componentDidMount() {
        console.log(this.chartReference); // returns a Chart.js instance reference
    }

    render() {
        const { news } = this.props;
        return (
            <Line
                ref={this.chartReference}
                data={{
                    labels: news.map((n) => n.objectID),
                    datasets: [
                        {
                            fill: false,
                            data: news.map((n) => n.points),
                            backgroundColor: "blue",
                            borderColor: "blue",
                        },
                    ],
                }}
                options={{
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Votes",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "ID",
                                },
                            },
                        ],
                    },
                }}
            />
        );
    }
}

export default PlotChart;
