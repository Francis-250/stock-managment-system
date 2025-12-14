import { formatDistanceToNow } from "date-fns";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function RecentActivities({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Recent Activities
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Recent Activities
      </h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-full ${
                  activity.type === "IN"
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                {activity.type === "IN" ? (
                  <TrendingUp
                    className="text-green-600 dark:text-green-400"
                    size={20}
                  />
                ) : (
                  <TrendingDown
                    className="text-red-600 dark:text-red-400"
                    size={20}
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {activity.product?.name || "Unknown Product"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.type === "IN" ? "Stock In" : "Stock Out"} •{" "}
                  {activity.quantity} units
                  {activity.createdBy &&
                    ` • by ${activity.createdBy.firstName} ${activity.createdBy.lastName}`}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
