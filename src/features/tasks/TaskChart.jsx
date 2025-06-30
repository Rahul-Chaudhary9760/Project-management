import React from "react";
import { Pie } from "react-chartjs-2";
import { 
    ArcElement,
    Chart as ChartJS,
    Tooltip,
    Legend
} from "chart.js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
  const states = ["todo", "inprogress", "done"];
  const labels = ["To Do", "In Progress", "Done"];
  const colors = ["#facc15", "#38bdf8", "#4ade80"];

  const data = {
    labels,
    datasets: [
      {
        data: states.map((state) => tasks.filter((t) => t.state === state).length),
        backgroundColor: colors,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 12 }
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div style={{ width: 180, height: 180 }}>
          <Pie data={data} options={options} width={180} height={180} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskChart;