import { Link } from "react-router-dom";
import {
  Package,
  BarChart3,
  Users,
  FileText,
  ArrowRight,
  Check,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="text-blue-600" size={28} />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                StockFlow
              </span>
            </div>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Manage Your Inventory with{" "}
              <span className="text-blue-600">Confidence</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Track products, monitor stock levels, and generate insights in
              real-time. StockFlow helps businesses of all sizes maintain
              optimal inventory control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Managing</span>
                <ArrowRight size={20} />
              </Link>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Current Stock
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    2,847
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Products
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      1,234
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Categories
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      48
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Low Stock Alerts
                    </span>
                    <span className="font-semibold text-red-600">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to stay in control
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for operations teams who need real-time visibility without
              the complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Product Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Add, edit, and organize products with SKUs, images, and
                categories
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3
                  className="text-green-600 dark:text-green-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Track movements, identify trends, and make data-driven decisions
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Team Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Multiple users with role-based access and activity tracking
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
              <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText
                  className="text-orange-600 dark:text-orange-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Detailed Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Generate comprehensive reports on stock movements and history
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why businesses trust StockFlow
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                    <Check
                      className="text-green-600 dark:text-green-400"
                      size={16}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      No learning curve
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Intuitive interface that your team can start using
                      immediately
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                    <Check
                      className="text-green-600 dark:text-green-400"
                      size={16}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Complete transparency
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Every stock movement is tracked and attributed to specific
                      users
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                    <Check
                      className="text-green-600 dark:text-green-400"
                      size={16}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Fast and responsive
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Built for speed with instant updates across your
                      organization
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                    <Check
                      className="text-green-600 dark:text-green-400"
                      size={16}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Secure by design
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Role-based access control and secure authentication
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    10k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Products Tracked
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    &lt;100ms
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Response Time
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Monitoring
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to take control of your inventory?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using StockFlow to streamline
            their operations
          </p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            <span>Get Started Now</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Package className="text-blue-600" size={24} />
              <span className="font-bold text-white">StockFlow</span>
            </div>
            <div className="text-sm">
              © 2025 StockFlow. Built for modern inventory management.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
