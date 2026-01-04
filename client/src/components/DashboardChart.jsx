import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardChart = ({ data }) => (
    <div style={{ height: 250, background: "#fff", padding: 20, borderRadius: 12 }}>
        <h5>Cash Overview</h5>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="amount" fill="#7c3aed" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default DashboardChart;
