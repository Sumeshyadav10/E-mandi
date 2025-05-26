import { useState, useEffect } from 'react';
import {
  UsersIcon, ShoppingBagIcon, CurrencyDollarIcon, ChartBarIcon,
  ArrowTrendingUpIcon, ArrowTrendingDownIcon, EllipsisVerticalIcon,
  CalendarIcon, ChartPieIcon, MapPinIcon, GlobeAltIcon,
  CreditCardIcon, TruckIcon, ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend,
  RadialLinearScale
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend,
  RadialLinearScale
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading effect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Enhanced stats data with more metrics
  const stats = [
    { 
      name: 'Total Revenue',
      value: '$845,678',
      change: '+22.5%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'emerald',
      details: 'vs. last month'
    },
    {
      name: 'Active Users',
      value: '18,243',
      change: '+12.1%',
      trend: 'up',
      icon: UsersIcon,
      color: 'blue',
      details: 'current online: 432'
    },
    {
      name: 'Conversion Rate',
      value: '4.28%',
      change: '-0.4%',
      trend: 'down',
      icon: ChartBarIcon,
      color: 'purple',
      details: 'avg. per session'
    },
    {
      name: 'Avg. Order Value',
      value: '$268.92',
      change: '+18.2%',
      trend: 'up',
      icon: ShoppingCartIcon,
      color: 'orange',
      details: '2,847 total orders'
    }
  ];

  // Detailed sales data for area chart
  const salesData = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        label: 'Today',
        data: [30, 45, 35, 50, 49, 60, 70, 91],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Yesterday',
        data: [25, 38, 30, 35, 40, 50, 55, 65],
        borderColor: '#9333EA',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Revenue by product category
  const categoryData = {
    labels: [
      'Electronics', 'Fashion', 'Home & Living',
      'Beauty', 'Sports', 'Books', 'Others'
    ],
    datasets: [{
      data: [35, 25, 20, 15, 12, 8, 5],
      backgroundColor: [
        '#4F46E5', '#9333EA', '#06B6D4',
        '#10B981', '#F59E0B', '#EF4444', '#6B7280'
      ]
    }]
  };

  // Traffic sources data
  const trafficData = {
    labels: [
      'Direct', 'Organic Search', 'Paid Search',
      'Social Media', 'Email', 'Referral'
    ],
    datasets: [{
      label: 'Traffic Sources',
      data: [65, 85, 55, 45, 35, 25],
      backgroundColor: [
        'rgba(79, 70, 229, 0.7)',
        'rgba(147, 51, 234, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
    }]
  };

  // Recent orders with detailed information
  const recentOrders = [
    {
      id: 1,
      customer: 'John Doe',
      avatar: '👤',
      product: 'iPhone 15 Pro Max',
      amount: '$1,299.99',
      status: 'Completed',
      date: '2024-03-10 14:30',
      payment: 'Credit Card',
      location: 'New York, US'
    },
    {
      id: 2,
      customer: 'Alice Smith',
      avatar: '👤',
      product: 'MacBook Air M2',
      amount: '$1,499.99',
      status: 'Processing',
      date: '2024-03-10 13:45',
      payment: 'PayPal',
      location: 'London, UK'
    },
    {
      id: 3,
      customer: 'Robert Johnson',
      avatar: '👤',
      product: 'AirPods Pro',
      amount: '$249.99',
      status: 'Pending',
      date: '2024-03-10 12:15',
      payment: 'Apple Pay',
      location: 'Toronto, CA'
    },
    {
      id: 4,
      customer: 'Emma Wilson',
      avatar: '👤',
      product: 'iPad Pro 12.9"',
      amount: '$1,099.99',
      status: 'Completed',
      date: '2024-03-10 11:30',
      payment: 'Credit Card',
      location: 'Sydney, AU'
    }
  ];

  // Top selling products with detailed metrics
  const topProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Electronics',
      sales: 1234,
      revenue: '$1,603,766',
      growth: '+23%',
      stock: 458,
      rating: 4.8
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      category: 'Electronics',
      sales: 856,
      revenue: '$2,568,000',
      growth: '+18%',
      stock: 234,
      rating: 4.9
    },
    {
      id: 3,
      name: 'AirPods Pro',
      category: 'Electronics',
      sales: 2345,
      revenue: '$586,250',
      growth: '+31%',
      stock: 1245,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Apple Watch Series 9',
      category: 'Electronics',
      sales: 945,
      revenue: '$425,250',
      growth: '+15%',
      stock: 678,
      rating: 4.6
    }
  ];

  // Sales performance metrics
  const performanceMetrics = {
    labels: ['Sales', 'Marketing', 'Support', 'Development', 'Design'],
    datasets: [{
      label: 'Current Period',
      data: [85, 75, 90, 80, 85],
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      fill: true
    }]
  };

  return (
    <div className="space-y-6 ">
      {/* Enhanced Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back! Here's what's happening today
            </p>
            <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
              Live Updates
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none rounded-lg border-gray-300 pl-3 pr-10 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <ChartBarIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent dark:from-gray-800 to-transparent dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg bg-${stat.color}-100 p-3 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.name}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <span className={`flex items-center text-sm ${
                    stat.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.trend === 'up' 
                      ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                      : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                    }
                    {stat.change}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {stat.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sales Analytics
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Hourly sales performance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Yesterday</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <Line 
              data={salesData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)',
                    },
                    ticks: {
                      callback: (value) => `$${value}k`
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                interaction: {
                  mode: 'nearest',
                  axis: 'x',
                  intersect: false
                }
              }} 
            />
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Distribution
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                By product category
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <ChartPieIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut 
              data={categoryData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                    }
                  }
                },
                cutout: '75%'
              }} 
            />
          </div>
        </div>
      </div>

      {/* Traffic Sources & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Traffic Sources
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Visitor acquisition channels
              </p>
            </div>
          </div>
          <div className="h-[300px]">
            <Bar 
              data={trafficData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)',
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Metrics
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Department performance analysis
              </p>
            </div>
          </div>
          <div className="h-[300px]">
            <Radar 
              data={performanceMetrics}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      stepSize: 20
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Orders
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Latest transactions
                </p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{order.avatar}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.customer}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            {order.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.product}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <CreditCardIcon className="w-3 h-3 mr-1" />
                        {order.payment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.amount}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {order.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Top Products */}
        <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Top Selling Products
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Best performers this month
                </p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View Report
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {topProducts.map((product) => (
              <div key={product.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {product.growth}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.category}
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.revenue}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.sales} units
                    </p>
                  </div>
                </div>
                {/* Stock Level Indicator */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Stock Level</span>
                    <span className="text-gray-700 dark:text-gray-300">{product.stock} units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${(product.stock / 2000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;