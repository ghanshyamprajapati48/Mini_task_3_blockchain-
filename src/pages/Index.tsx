import { useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { MiningPanel } from "@/components/MiningPanel";
import { SendTokensForm } from "@/components/SendTokensForm";
import { TransactionHistory } from "@/components/TransactionHistory";
import heroImage from "@/assets/icp-hero-bg.jpg";

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'mine';
  amount: number;
  address?: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(100);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleConnect = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setWalletAddress("rrkah-fqaaa-aaaah-qcgbq-cai");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  const handleTokensMined = (amount: number) => {
    setBalance(prev => prev + amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'mine',
      amount,
      timestamp: new Date(),
      status: 'completed',
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleTokensSent = (amount: number, to: string) => {
    setBalance(prev => prev - amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'send',
      amount,
      address: to,
      timestamp: new Date(),
      status: 'completed',
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-icp bg-clip-text text-transparent">
              ICP Token Manager
            </h1>
            <p className="text-lg text-muted-foreground">
              Hold, mine, and transfer tokens on the Internet Computer Protocol
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <WalletCard
              isConnected={isConnected}
              address={walletAddress}
              balance={balance}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MiningPanel
                isConnected={isConnected}
                onTokensMined={handleTokensMined}
              />
              
              <SendTokensForm
                isConnected={isConnected}
                balance={balance}
                onTokensSent={handleTokensSent}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
