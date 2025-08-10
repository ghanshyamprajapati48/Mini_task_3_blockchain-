import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, User, Coins } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SendTokensFormProps {
  isConnected: boolean;
  balance: number;
  onTokensSent: (amount: number, to: string) => void;
}

export const SendTokensForm = ({ isConnected, balance, onTokensSent }: SendTokensFormProps) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to send tokens",
        variant: "destructive",
      });
      return;
    }

    const sendAmount = parseFloat(amount);
    
    if (!recipient || !amount || sendAmount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid values",
        variant: "destructive",
      });
      return;
    }

    if (sendAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens for this transaction",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      onTokensSent(sendAmount, recipient);
      setRecipient("");
      setAmount("");
      setIsLoading(false);
      
      toast({
        title: "Transaction Successful",
        description: `Sent ${sendAmount} ICP tokens to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
      });
    }, 2000);
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-icp">
            <Send className="h-4 w-4 text-primary-foreground" />
          </div>
          <span>Send Tokens</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="recipient"
                placeholder="Enter ICP address..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="pl-10"
                disabled={!isConnected || isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ICP)</Label>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
                disabled={!isConnected || isLoading}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Available: {balance.toLocaleString()} ICP</span>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="h-auto p-0"
                onClick={() => setAmount(balance.toString())}
                disabled={!isConnected || isLoading}
              >
                Max
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="icp" 
            className="w-full"
            disabled={!isConnected || isLoading || !recipient || !amount}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Tokens
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};