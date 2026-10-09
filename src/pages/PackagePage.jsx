import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, Package as PackageIcon, MapPin, CheckCircle2, Calendar, ArrowRight, Truck, Clock, AlertCircle, ArrowLeft, Printer, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { searchPackage } from "../api/database.api.js";
import { motion } from "framer-motion";
import { getCountryFlag } from '../utils/countryFlags';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const formatDate = (dateString) => {
  if (!dateString) return 'Pending';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const PackagePage = () => {
  const { trackingId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedPackage, setFetchedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    searchPackage({ trackingId })
      .then(({ data }) => {
        setFetchedPackage(data);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [trackingId]);

  const trackingSteps = [
    { title: 'Order Dispatched', desc: 'Package registered' },
    { title: 'In Transit', desc: 'Departed sorting facility' },
    { title: 'Customs & Clearance', desc: 'Inspection verified' },
    { title: 'Out for Delivery', desc: 'On courier vehicle' },
    { title: 'Delivered', desc: 'Package received' }
  ];

  // Helper to estimate progress step (0 to 4)
  const getProgressStep = (pkg) => {
    if (!pkg) return 1;
    if (!pkg.status) return 1; // On hold
    const trackingList = pkg.shipingTracking || [];
    if (trackingList.length >= 4) return 4;
    if (trackingList.length === 3) return 3;
    if (trackingList.length === 2) return 2;
    return 1;
  };

  const currentStep = getProgressStep(fetchedPackage);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 flex flex-col items-center text-center max-w-sm"
          >
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">Locating Your Shipment</h3>
            <p className="text-xs text-slate-500">Retrieving real-time status for <span className="font-mono font-semibold text-slate-700">{trackingId}</span>...</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || (!isLoading && !fetchedPackage)) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-md text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Tracking ID Not Found</h2>
            <p className="text-slate-600 text-sm mb-6">
              We couldn't locate any package associated with tracking number <span className="font-mono font-semibold text-slate-900">{trackingId}</span>. Please verify the code and try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all"
              >
                Return to Home
              </button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Nav Back Bar */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Search
            </Link>
            <button
              onClick={handlePrint}
              className="inline-flex items-center text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" /> Print Summary
            </button>
          </div>

          {/* Main Status Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
                    <PackageIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Waybill tracking</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white">{trackingId}</h1>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 border ${
                    fetchedPackage.status
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    {fetchedPackage.status ? 'On Transit / active' : 'On Hold'}
                  </span>
                </div>
              </div>

              {/* Progress Stepper Visual Bar */}
              <div className="pt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Shipment Lifecycle</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                  {trackingSteps.map((step, idx) => {
                    const isPassed = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    return (
                      <div key={idx} className="flex flex-col items-center text-center z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 mb-2 ${
                          isCurrent
                            ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 shadow-lg scale-110'
                            : isPassed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}>
                          {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        <span className={`text-xs font-bold leading-tight ${isPassed ? 'text-white' : 'text-slate-500'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                          {step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Location Badge */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center space-x-3 bg-slate-800/60 rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Current Checkpoint</span>
                  <p className="text-sm font-bold text-white">{fetchedPackage.currentLocation || 'In Transit to destination hub'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Route & Delivery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Route Info</span>
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-xs text-slate-500 block">Origin</span>
                    <p className="text-base font-bold text-slate-900 flex items-center">
                      {fetchedPackage.originCountry} <span className="ml-2 text-xl">{getCountryFlag(fetchedPackage.originCountry)}</span>
                    </p>
                  </div>
                  <div className="flex justify-center text-blue-600">
                    <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Destination</span>
                    <p className="text-base font-bold text-slate-900 flex items-center">
                      {fetchedPackage.destinationCountry} <span className="ml-2 text-xl">{getCountryFlag(fetchedPackage.destinationCountry)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Dates</span>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500">Shipping Date</span>
                      <p className="text-sm font-bold text-slate-900">{formatDate(fetchedPackage.shipingDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                    <Clock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500">Expected Delivery</span>
                      <p className="text-sm font-bold text-slate-900">{formatDate(fetchedPackage.expectedDeliveryDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Freight Specs</span>
                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Carrier:</span>
                    <span className="font-bold text-slate-900">{fetchedPackage.carrier || 'Sussex Global'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Shipment Type:</span>
                    <span className="font-bold text-slate-900">{fetchedPackage.typeOfShipment || 'Express Air'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Remarks:</span>
                    <span className="font-semibold text-slate-700">{fetchedPackage.comments || 'Fragile - Handle with Care'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sender & Receiver Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" /> Sender Details
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Name</span>
                  <span className="font-bold text-slate-900">{fetchedPackage.senderName || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Contact Email</span>
                  <span className="font-semibold text-slate-800">{fetchedPackage.senderEmailAddress || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Phone</span>
                  <span className="font-semibold text-slate-800">{fetchedPackage.senderTelephone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Dispatch Address</span>
                  <span className="font-medium text-slate-700">{fetchedPackage.senderAddress || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center">
                <Truck className="w-5 h-5 text-emerald-600 mr-2" /> Consignee / Receiver
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Name</span>
                  <span className="font-bold text-slate-900">{fetchedPackage.receiverName || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Contact Email</span>
                  <span className="font-semibold text-slate-800">{fetchedPackage.receiverEmailAddress || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Phone</span>
                  <span className="font-semibold text-slate-800">{fetchedPackage.receiverTelephone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Delivery Address</span>
                  <span className="font-medium text-slate-700">{fetchedPackage.receiverAddress || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Package Contents Manifest */}
          {fetchedPackage.shipingContent?.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
              <h2 className="text-base font-bold text-slate-900 mb-4">Package Manifest & Contents</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Content Description</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4">Declared Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fetchedPackage.shipingContent.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{item.content}</td>
                        <td className="py-3.5 px-4 text-slate-600">{item.quantity}</td>
                        <td className="py-3.5 px-4 text-slate-600">{item.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tracking Activity History */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <h2 className="text-base font-bold text-slate-900 mb-6">Checkpoint Activity History</h2>
            {fetchedPackage.shipingTracking?.length > 0 ? (
              <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-5 before:w-0.5 before:bg-slate-200">
                {fetchedPackage.shipingTracking.map((track, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-start space-x-4 relative z-10"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-600 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex-1">
                      <p className="font-bold text-slate-900 text-sm">{track.remark}</p>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">{track.location}</p>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono">{track.datetime}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No tracking events recorded yet.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackagePage;
