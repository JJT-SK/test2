import { FaCheck, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Protocol } from "@shared/schema";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useProtocols } from "@/hooks/use-protocols";

interface ProtocolCardProps {
  protocol: Protocol;
}

const ProtocolCard = ({ protocol }: ProtocolCardProps) => {
  const { checkInProtocol } = useProtocols();
  const [isHovered, setIsHovered] = useState(false);
  
  const progress = (protocol.currentDay / protocol.duration) * 100;
  
  const handleCheckIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    checkInProtocol(protocol.id);
  };
  
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // View protocol details - could show a modal or navigate to a details page
    console.log("View protocol", protocol.id);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Edit protocol - could show a modal or navigate to an edit page
    console.log("Edit protocol", protocol.id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Delete protocol - should show a confirmation dialog
    console.log("Delete protocol", protocol.id);
  };

  return (
    <Card 
      className="h-full transition-all duration-200 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-5">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="text-lg font-semibold text-dark">{protocol.name}</h3>
          <span className={`
            ${progress > 80 ? 'bg-green-100 text-secondary' : 
              progress > 50 ? 'bg-blue-100 text-primary' : 
              'bg-yellow-100 text-yellow-600'} 
            text-xs px-2 py-0.5 rounded-full
          `}>
            Day {protocol.currentDay}/{protocol.duration}
          </span>
        </div>
        
        <p className="text-dark-medium text-sm mb-4">
          {protocol.description || 'No description provided.'}
        </p>
        
        <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
          <div 
            className={`
              ${progress > 80 ? 'bg-secondary' : 
                progress > 50 ? 'bg-primary' : 
                'bg-yellow-500'} 
              h-2 rounded-full transition-all duration-300
            `} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between">
        <div className="flex space-x-1">
          <button 
            className="p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100"
            onClick={handleView}
          >
            <FaEye size={16} />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
            onClick={handleEdit}
          >
            <FaEdit size={16} />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
            onClick={handleDelete}
          >
            <FaTrash size={16} />
          </button>
        </div>
        
        <button 
          className={`
            ${protocol.isCompleted ? 
              'bg-green-100 text-secondary hover:bg-green-200' : 
              'bg-blue-100 text-primary hover:bg-blue-200'} 
            px-3 py-1 rounded-full text-sm font-medium transition-colors
          `}
          onClick={handleCheckIn}
        >
          <FaCheck className="inline mr-1" size={12} /> 
          {protocol.isCompleted ? 'Completed' : 'Check-in'}
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProtocolCard;
