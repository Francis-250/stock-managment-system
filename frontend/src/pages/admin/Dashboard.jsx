import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import StockChart from "../../components/StockChart";
import RecentActivities from "../../components/RecentActivities";
import api from "../../lib/axios";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const [statsRes, chartRes, activitiesRes] = await Promise.all([
          api.get("/stats"),
          api.get("/stats/chart-data"),
          api.get("/stats/recent-activities"),
        ]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
        setRecentActivities(activitiesRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        closed={closed}
        setClosed={setClosed}
      />

      <main
        className={`dash-container ${
          collapsed ? "dash-container-ds-collapsed" : "dash-container-ds"
        }`}
      >
        <Header setClosed={setClosed} />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                Loading stats...
              </div>
            ) : stats ? (
              <>
                <StatCard
                  title="Total Products"
                  value={stats.products}
                  icon="📦"
                  color="bg-blue-500"
                />
                <StatCard
                  title="Total Categories"
                  value={stats.categories}
                  icon="📂"
                  color="bg-green-500"
                />
                <StatCard
                  title="Total Users"
                  value={stats.users}
                  icon="👥"
                  color="bg-purple-500"
                />
                <StatCard
                  title="Total Stock Items"
                  value={stats.stocks}
                  icon="📊"
                  color="bg-orange-500"
                />
              </>
            ) : (
              <div className="col-span-full text-center py-8">
                No data available
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {!loading && stats && (
              <div className="lg:col-span-2">
                <StockChart stats={stats} movements={chartData} />
              </div>
            )}

            {!loading && recentActivities && (
              <div className="lg:col-span-1">
                <RecentActivities activities={recentActivities} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
