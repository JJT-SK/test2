import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Layers, Bot } from "lucide-react";

interface ChatMessage {
  isUser: boolean;
  text: string;
}

interface ChatAssistantProps {
  category: string;
}

// Predefined messages based on the selected category
const GREETING_MESSAGE = "Hello! I can help analyze your biometric data and provide recommendations. What would you like to know?";

const CATEGORY_SUGGESTIONS: Record<string, string[]> = {
  sleep: [
    "How can I improve my sleep quality?",
    "What factors affect my sleep the most?",
    "What time should I go to bed for optimal sleep?"
  ],
  energy: [
    "Why do my energy levels drop in the afternoon?",
    "How can I maintain consistent energy throughout the day?",
    "What supplements might help with energy levels?"
  ],
  cognitive: [
    "What practices boost cognitive performance?",
    "How does my focus compare to other biohackers?",
    "Can you recommend a stack for better focus?"
  ]
};

// Automated responses to common questions
const RESPONSES: Record<string, string> = {
  "How can I improve my sleep quality?": 
    "Based on your data, try: 1) Keeping a consistent sleep schedule, 2) Reducing blue light exposure 2 hours before bed, 3) Maintaining bedroom temperature between 65-68°F, and 4) Considering magnesium glycinate supplementation before sleep.",
  
  "What factors affect my sleep the most?": 
    "Your data shows the strongest correlations between poor sleep and: 1) Late screen usage (after 10pm), 2) Caffeine consumption after 2pm, and 3) Evening exercise. Try adjusting these factors to see improvements.",
  
  "What time should I go to bed for optimal sleep?": 
    "Your sleep quality scores are highest when you go to bed between 10:00-10:30pm. Your body seems to follow natural circadian rhythms with optimal wake time around 6:00-6:30am.",
  
  "Why do my energy levels drop in the afternoon?": 
    "Your data shows an afternoon energy dip around 2-3pm. This may be related to: 1) Post-lunch insulin response, 2) Dehydration through the day, and 3) Natural circadian rhythm dips. Try a short walk after lunch and staying well-hydrated.",
  
  "How can I maintain consistent energy throughout the day?": 
    "For more consistent energy: 1) Space protein intake evenly throughout the day, 2) Stay hydrated (aim for 2-3L of water), 3) Take short movement breaks every 90 minutes, and 4) Consider adaptogens like Rhodiola Rosea.",
  
  "What supplements might help with energy levels?": 
    "Based on your profile: 1) B-complex vitamins in the morning, 2) CoQ10 (100-200mg daily), 3) Creatine monohydrate (5g daily), and 4) Consider cordyceps mushroom extract. Always consult your healthcare provider before starting new supplements.",
  
  "What practices boost cognitive performance?": 
    "Your data shows cognitive peaks when you: 1) Get 7-8 hours of quality sleep, 2) Perform cardiovascular exercise in the morning, 3) Practice 10-15 minutes of meditation, and 4) Work in 90-minute focused blocks with short breaks.",
  
  "How does my focus compare to other biohackers?": 
    "Your focus metrics place you in the top 30% of biohackers on our platform. Your consistency is excellent, though your peak performance could be improved through protocol optimization.",
  
  "Can you recommend a stack for better focus?": 
    "A potentially effective stack based on your profile: 1) L-theanine (200mg) with coffee, 2) Alpha-GPC (300mg), 3) Bacopa monnieri (300mg standardized extract), and 4) Lion's Mane mushroom. Start with one at a time to assess individual effects."
};

const DEFAULT_RESPONSE = "That's an interesting question. Based on the patterns in your biometric data, I recommend focusing on consistency in your protocols and tracking variables that might affect your results. Would you like more specific advice about a particular metric?";

const ChatAssistant = ({ category }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { isUser: false, text: GREETING_MESSAGE }
  ]);
  const [input, setInput] = useState("");
  
  // Update suggestions when category changes
  useEffect(() => {
    // Add a message about the category change
    if (messages.length > 1) {
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          isUser: false, 
          text: `I notice you're looking at ${category} data now. Would you like some insights about your ${category} patterns?` 
        }
      ]);
    }
  }, [category]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { isUser: true, text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Generate response
    setTimeout(() => {
      const responseText = RESPONSES[input.trim()] || DEFAULT_RESPONSE;
      const botMessage = { isUser: false, text: responseText };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 500);
    
    setInput("");
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    // Add user message
    const userMessage = { isUser: true, text: suggestion };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Generate response
    setTimeout(() => {
      const responseText = RESPONSES[suggestion] || DEFAULT_RESPONSE;
      const botMessage = { isUser: false, text: responseText };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-dark'
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center mb-1">
                  <Bot size={16} className="mr-1" />
                  <span className="text-xs font-medium">BioHacker AI</span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Suggested questions */}
      <div className="mb-4">
        <p className="text-xs text-dark-light mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_SUGGESTIONS[category]?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="flex gap-2">
        <Textarea
          placeholder="Ask something about your data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage} 
          disabled={!input.trim()}
        >
          <Layers size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatAssistant;
