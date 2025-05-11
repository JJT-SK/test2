import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProtocols } from "@/hooks/use-protocols";
import { FaCheck } from "react-icons/fa";
import { Protocol } from "@shared/schema";

const ProtocolItem = ({ protocol, onCheckIn }: { protocol: Protocol, onCheckIn: (id: number) => void }) => {
  const progress = (protocol.currentDay / protocol.duration) * 100;
  
  return (
    <div className="p-3 border border-gray-100 rounded-lg">
      <div className="flex justify-between mb-2">
        <h3 className="text-sm font-medium text-dark">{protocol.name}</h3>
        <span className={`
          ${progress > 80 ? 'bg-green-100 text-secondary' : 
            progress > 50 ? 'bg-blue-100 text-primary' : 
            'bg-yellow-100 text-yellow-600'} 
          text-xs px-2 py-0.5 rounded-full
        `}>
          Day {protocol.currentDay}/{protocol.duration}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div 
          className={`
            ${progress > 80 ? 'bg-secondary' : 
              progress > 50 ? 'bg-primary' : 
              'bg-yellow-500'} 
            h-1.5 rounded-full
          `} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <button className="text-xs text-primary hover:text-blue-700">View Details</button>
        <button 
          className={`
            ${protocol.isCompleted ? 
              'bg-green-50 hover:bg-green-100 text-secondary' : 
              'bg-light hover:bg-gray-200 text-dark-medium'} 
            text-xs px-3 py-1 rounded
          `}
          onClick={() => onCheckIn(protocol.id)}
        >
          <FaCheck className="inline mr-1" /> 
          {protocol.isCompleted ? 'Completed' : 'Check-in'}
        </button>
      </div>
    </div>
  );
};

const CurrentProtocolsCard = () => {
  const { protocols, isLoading, checkInProtocol, createProtocol } = useProtocols();

  const handleAddProtocol = () => {
    // Redirect to protocols page
    window.location.href = "/protocols";
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-dark">Current Protocols</CardTitle>
          <a href="/protocols" className="text-sm text-primary hover:underline">Manage All</a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 custom-scrollbar overflow-y-auto max-h-72">
          {isLoading ? (
            <p className="text-center py-4 text-dark-light">Loading protocols...</p>
          ) : protocols.length === 0 ? (
            <p className="text-center py-4 text-dark-light">No active protocols found.</p>
          ) : (
            protocols.map(protocol => (
              <ProtocolItem 
                key={protocol.id} 
                protocol={protocol} 
                onCheckIn={checkInProtocol} 
              />
            ))
          )}
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-100">
          <button 
            className="w-full py-2 bg-primary hover:bg-blue-600 rounded-lg text-sm font-medium text-white transition-colors"
            onClick={handleAddProtocol}
          >
            <FaCheck className="inline mr-1" /> Add New Protocol
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentProtocolsCard;
