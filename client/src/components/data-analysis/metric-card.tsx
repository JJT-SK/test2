import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  secondaryText?: string;
  changePercent?: number;
  isPositive?: boolean;
}

const MetricCard = ({ 
  title, 
  value, 
  suffix = "", 
  secondaryText, 
  changePercent, 
  isPositive = true 
}: MetricCardProps) => {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-dark-light mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-dark">
            {value}{suffix}
          </p>
          {secondaryText && (
            <p className="text-xs text-dark-light mt-1">{secondaryText}</p>
          )}
        </div>
        
        {changePercent !== undefined && (
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{Math.abs(changePercent).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
