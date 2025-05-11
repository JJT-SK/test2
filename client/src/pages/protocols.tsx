import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Search, PlusCircle } from "lucide-react";
import { useProtocols } from "@/hooks/use-protocols";
import ProtocolCard from "@/components/protocols/protocol-card";
import { Protocol } from "@shared/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(3, { message: "Protocol name must be at least 3 characters" }),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, { message: "Duration must be at least 1 day" })
});

const Protocols = () => {
  const { protocols, isLoading, createProtocol, isCreating } = useProtocols();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: 30
    }
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createProtocol(values);
    setIsCreateDialogOpen(false);
    form.reset();
  };
  
  const filteredProtocols = searchTerm 
    ? protocols.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : protocols;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-dark">Protocol Builder</h1>
        <p className="text-dark-light">Create and manage your biohacking protocols.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search protocols..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Protocol
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create a new protocol</DialogTitle>
              <DialogDescription>
                Define a new biohacking protocol to track your progress.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protocol Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cold Exposure" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the protocol and its benefits..." 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (days)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How many days will you follow this protocol?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Protocol"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Protocol Blocks */}
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-10">
                <p className="text-dark-light">Loading protocols...</p>
              </div>
            ) : filteredProtocols.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-dark-light">
                  {searchTerm ? "No protocols match your search." : "You don't have any protocols yet."}
                </p>
                {!searchTerm && (
                  <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                    Create your first protocol
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProtocols.map(protocol => (
                  <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Protocol Timeline (placeholder) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Protocol Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-light rounded-xl p-8 text-center">
            <p className="text-dark-light">
              Protocol timeline visualization coming soon. This will show your progress across all active protocols.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Protocols;
