import { useParams } from "react-router-dom";
import { Download, Loader2, Package as PackageIcon, MapPin, Calendar, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { searchPackage } from "../api/database.api.js";
import CustomAlert from '../components/ui/CustomAlert';

const Package = () => {
  const { trackingId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedPackage, setFetchedPackage] = useState();

  useEffect(() => {
    console.log('Tracking ID:', trackingId);


    setIsLoading(true);
    searchPackage({ trackingId })
      .then(({ data }) => {
        setFetchedPackage(data.trackingPackage);
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
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status ? 'bg-primary-100 text-primary-700' : 'bg-red-100 text-red-700'
      }`}>
      {status ? 'On Transit' : 'On Hold'}
    </span>
  );

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary flex items-center gap-2">
            <PackageIcon className="h-8 w-8" />
            Package Tracking Details
          </h1>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading package information...</span>
            </div>
          )}

          {error && (
            <CustomAlert variant="destructive" title="Error">
              Failed to load package information. Please try again later.
            </CustomAlert>
          )}

          {fetchedPackage && (
            <div className="space-y-6">
              <Section title={
                <div className="flex justify-between items-center">
                  <span>Tracking ID: {fetchedPackage.trackingId}</span>
                  <StatusBadge status={fetchedPackage.status} />
                </div>
              }>
                {/* Package Details Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Current Location
                      </h3>
                      <p className="text-gray-600">{fetchedPackage.currentLocation}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Expected Delivery
                      </h3>
                      <p className="text-gray-600">{fetchedPackage.expectedDeliveryDate}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Route
                      </h3>
                      <p className="text-gray-600">
                        {fetchedPackage.originCountry} → {fetchedPackage.destinationCountry}
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              <div className="grid gap-6 md:grid-cols-2">
                <Section title="Sender Information">
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {fetchedPackage.senderName}</p>
                    <p><strong>Email:</strong> {fetchedPackage.senderEmailAddress}</p>
                    <p><strong>Phone:</strong> {fetchedPackage.senderTelephone}</p>
                    <p><strong>Address:</strong> {fetchedPackage.senderAddress}</p>
                  </div>
                </Section>

                <Section title="Receiver Information">
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {fetchedPackage.receiverName}</p>
                    <p><strong>Email:</strong> {fetchedPackage.receiverEmailAddress}</p>
                    <p><strong>Phone:</strong> {fetchedPackage.receiverTelephone}</p>
                    <p><strong>Address:</strong> {fetchedPackage.receiverAddress}</p>
                  </div>
                </Section>
              </div>

              <Section title="Package Contents">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Content</th>
                        <th className="text-left py-2">Quantity</th>
                        <th className="text-left py-2">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchedPackage.shipingContent && fetchedPackage.shipingContent.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{item.content}</td>
                          <td className="py-2">{item.quantity}</td>
                          <td className="py-2">{item.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section title="Tracking History">
                <div className="space-y-4">
                  {fetchedPackage.shipingTracking && fetchedPackage.shipingTracking.map((track, index) => (
                    <div key={index} className="flex items-start gap-4 border-b last:border-0 pb-4">
                      <div className="w-32 flex-shrink-0">
                        <p className="text-sm text-gray-600">{track.datetime}</p>
                      </div>
                      <div>
                        <p className="font-medium">{track.remark}</p>
                        <p className="text-sm text-gray-600">{track.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="flex justify-center">
                <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <Download className="mr-2 h-4 w-4" /> Download Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Package;