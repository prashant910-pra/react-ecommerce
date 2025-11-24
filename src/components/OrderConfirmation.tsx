import React from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderConfirmationProps {
  orderId: string;
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, onContinueShopping }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-left">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold text-lg">{orderId}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Order Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Estimated Delivery</p>
                <p className="font-medium">{estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-left">Order Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-green-600 rounded-full p-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Order Placed</p>
                    <p className="text-xs text-gray-500">Confirmed</p>
                  </div>
                </div>

                <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-gray-300 rounded-full p-2">
                    <Package className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Processing</p>
                    <p className="text-xs text-gray-500">1-2 days</p>
                  </div>
                </div>

                <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-gray-300 rounded-full p-2">
                    <Truck className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Shipped</p>
                    <p className="text-xs text-gray-500">3-4 days</p>
                  </div>
                </div>

                <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-gray-300 rounded-full p-2">
                    <Home className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Delivered</p>
                    <p className="text-xs text-gray-500">5-7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              We'll send you shipping confirmation and tracking information to your email.
            </p>
            <p className="text-sm text-gray-500">
              Questions about your order? Contact our support team.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onContinueShopping} size="lg">
              Continue Shopping
            </Button>
            <Button variant="outline" size="lg">
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;