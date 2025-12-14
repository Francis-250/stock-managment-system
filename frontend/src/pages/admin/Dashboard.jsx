import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import StockChart from "../../components/StockChart";
import RecentActivities from "../../components/RecentActivities";
import api from "../../lib/axios";
import { Loader } from "lucide-react";

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
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </>
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
            {loading ? (
              <>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {stats && (
                  <div className="lg:col-span-2">
                    <StockChart stats={stats} movements={chartData} />
                  </div>
                )}
                {recentActivities && (
                  <div className="lg:col-span-1">
                    <RecentActivities activities={recentActivities} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
