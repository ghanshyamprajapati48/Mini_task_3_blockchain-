import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WalletCardProps {
  isConnected: boolean;
  address?: string;
  balance?: number;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletCard = ({ 
  isConnected, 
  address, 
  balance = 0, 
  onConnect, 
  onDisconnect 
}: WalletCardProps) => {
  const { toast } = useToast();
  
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <Card className="shadow-card border-border/50">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-gradient-icp">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-4">
                Connect your ICP wallet to start managing tokens
              </p>
            </div>
            <Button variant="icp" onClick={onConnect} className="w-full max-w-xs">
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-icp">
              <Wallet className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">Connected Wallet</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Address:</span>
            <span className="font-mono text-sm">{formatAddress(address!)}</span>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopyAddress}>
              <Copy className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="text-center p-4 rounded-lg bg-gradient-glass border border-border/50">
          <div className="text-2xl font-bold bg-gradient-icp bg-clip-text text-transparent">
            {balance.toLocaleString()} ICP
          </div>
          <div className="text-sm text-muted-foreground mt-1">Token Balance</div>
        </div>
      </CardContent>
    </Card>
  );
};