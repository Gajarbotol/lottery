import { Card } from "@/components/ui/card"
import { FaQrcode, FaWheelchair, FaUniversalAccess } from "react-icons/fa"

export default function LotteryTicket() {
  return (
    <Card className="w-80 h-48 bg-gradient-to-b from-pink-100 to-pink-200 p-2 font-sans">
      <div className="border-2 border-gray-300 h-full rounded-sm p-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs">
            <div className="font-bold text-blue-600">THAI GOVERNMENT LOTTERY</div>
            <div>สลากกินแบ่งรัฐบาล</div>
          </div>
          <div className="text-2xl font-bold">123456</div>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">1 DECEMBER 2021</div>
          <div className="text-sm">1 ธันวาคม 2564</div>
        </div>
        
        <div className="flex-grow flex">
          <div className="w-1/3 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-12 h-12 text-blue-500">
                <path d="M50 15 L85 85 L15 85 Z" fill="currentColor" />
                <circle cx="50" cy="45" r="10" fill="white" />
              </svg>
            </div>
          </div>
          <div className="w-2/3 flex flex-col justify-between">
            <div className="flex justify-between">
              <FaQrcode className="text-2xl" />
              <div className="flex space-x-1">
                <FaWheelchair className="text-lg" />
                <FaUniversalAccess className="text-lg" />
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs">PRICE</div>
              <div className="text-2xl font-bold text-pink-600">฿80</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs">
          <div>0412XXX</div>
          <div className="flex space-x-2">
            <div>PERIOD 12</div>
            <div>SET NO XX</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
