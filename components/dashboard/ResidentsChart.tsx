"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { chartData } from "@/data/chartData";

export default function ResidentsChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6">

      <h2 className="text-2xl font-bold text-black mb-6">
        Resident Growth
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="residents"
            stroke="#000000"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}