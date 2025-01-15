import { useParams } from "react-router-dom";
import { Download, Loader2, Package as PackageIcon, MapPin, CheckCircle2, ArrowDown, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { searchPackage } from "../api/database.api.js";
import { motion } from "framer-motion";
import { getCountryFlag } from '../utils/countryFlags';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Package = () => {
  const { trackingId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedPackage, setFetchedPackage] = useState();

  useEffect(() => {
    setIsLoading(true);
    searchPackage({ trackingId })
      .then(({ data }) => {
        setFetchedPackage(data);
        console.log(data);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [trackingId]);

  const StatusBadge = ({ status }) => (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2
        ${status ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
    >
      <CheckCircle2 className="h-4 w-4" />
      {status ? 'On Transit' : 'On Hold'}
    </motion.span>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-gray-600 font-medium">Loading package details...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-center items-center mb-6">
              <img src="/images/logo.JPG" alt="" className="w-48 h-4w-48" />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <PackageIcon className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold text-gray-900">Package Tracking</h1>
                  </div>
                  <p className="text-gray-500">Tracking ID: {trackingId}</p>
                </div>
                {fetchedPackage && <StatusBadge status={fetchedPackage.status} />}
              </div>

              {fetchedPackage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Location</p>
                    <p className="font-medium text-gray-900">{fetchedPackage.currentLocation}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {fetchedPackage && (
            <div className="space-y-8">

              {/* Package Information Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-xl font-semibold mb-6">Sender Details</h2>
                  <div className="space-y-4">
                    <InfoRow label="Name" value={fetchedPackage.senderName} />
                    <InfoRow label="Email" value={fetchedPackage.senderEmailAddress} />
                    <InfoRow label="Phone" value={fetchedPackage.senderTelephone} />
                    <InfoRow label="Address" value={fetchedPackage.senderAddress} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-xl font-semibold mb-6">Receiver Details</h2>
                  <div className="space-y-4">
                    <InfoRow label="Name" value={fetchedPackage.receiverName} />
                    <InfoRow label="Email" value={fetchedPackage.receiverEmailAddress} />
                    <InfoRow label="Phone" value={fetchedPackage.receiverTelephone} />
                    <InfoRow label="Address" value={fetchedPackage.receiverAddress} />
                  </div>
                </motion.div>
              </div>

              {/* Extra Information*/}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-xl font-semibold mb-6">Package Details</h2>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">From - To</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">
                            {fetchedPackage.originCountry} {getCountryFlag(fetchedPackage.originCountry)}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14m-7-7l7 7-7 7" />
                          </svg>
                        </div>

                        <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">
                            {fetchedPackage.destinationCountry} {getCountryFlag(fetchedPackage.destinationCountry)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <p className="text-sm text-gray-500">Shipping Date</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatDate(fetchedPackage.shipingDate)}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <p className="text-sm text-gray-500">Expected Delivery</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatDate(fetchedPackage.expectedDeliveryDate)}
                        </p>
                      </div>
                    </div>

                    <InfoRow label="Shiping Carrier" value={fetchedPackage.carrier} />
                    <InfoRow label="Type of Shipment" value={fetchedPackage.typeOfShipment} />
                    <InfoRow label="Comments" value={fetchedPackage.comments} />
                  </div>
                </motion.div>
              </div>

              {/* Package Contents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-xl font-semibold mb-6">Package Contents</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4">Content</th>
                        <th className="text-left py-3 px-4">Quantity</th>
                        <th className="text-left py-3 px-4">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchedPackage.shipingContent?.map((item, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-3 px-4">{item.content}</td>
                          <td className="py-3 px-4">{item.quantity}</td>
                          <td className="py-3 px-4">{item.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold mb-6">Tracking Timeline</h2>
                <div className="space-y-8">
                  {fetchedPackage.shipingTracking?.map((track, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="flex gap-4 relative"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{track.remark}</p>
                        <p className="text-sm text-gray-500">{track.location}</p>
                        <p className="text-sm text-gray-400">{track.datetime}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <Download className="mr-2 h-5 w-5" /> Download Details
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

export default Package;