import { FaDna } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-6">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaDna className="text-primary text-xl mr-2" />
            <span className="font-semibold text-dark">BioHacker</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-dark-light hover:text-primary text-sm">Help Center</a>
            <a href="#" className="text-dark-light hover:text-primary text-sm">Privacy Policy</a>
            <a href="#" className="text-dark-light hover:text-primary text-sm">Terms of Service</a>
            <a href="#" className="text-dark-light hover:text-primary text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
