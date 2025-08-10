import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pickaxe, Zap, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface MiningPanelProps {
  isConnected: boolean;
  onTokensMined: (amount: number) => void;
}

export const MiningPanel = ({ isConnected, onTokensMined }: MiningPanelProps) => {
  const [isMining, setIsMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMining && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          setTimeRemaining(Math.max(0, Math.ceil((100 - newProgress) / 2)));
          return newProgress;
        });
      }, 100);
    } else if (progress >= 100) {
      const minedAmount = Math.floor(Math.random() * 5) + 1; // 1-5 tokens
      onTokensMined(minedAmount);
      setIsMining(false);
      setProgress(0);
      toast({
        title: "Mining Complete!",
        description: `You mined ${minedAmount} ICP tokens`,
      });
    }

    return () => clearInterval(interval);
  }, [isMining, progress, onTokensMined, toast]);

  const startMining = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to start mining",
        variant: "destructive",
      });
      return;
    }
    setIsMining(true);
    setProgress(0);
    setTimeRemaining(5);
  };

  const stopMining = () => {
    setIsMining(false);
    setProgress(0);
    setTimeRemaining(0);
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Pickaxe className="h-4 w-4 text-primary-foreground" />
          </div>
          <span>Token Mining</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground mb-2">Mining Status</div>
          <div className="flex items-center justify-center space-x-2">
            {isMining ? (
              <>
                <Zap className="h-4 w-4 text-warning animate-pulse" />
                <span className="font-medium text-warning">Active</span>
              </>
            ) : (
              <>
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-muted-foreground">Idle</span>
              </>
            )}
          </div>
        </div>

        {isMining && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-center text-sm text-muted-foreground">
              {timeRemaining > 0 ? `${timeRemaining}s remaining` : "Completing..."}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          {!isMining ? (
            <Button 
              variant="gradient" 
              onClick={startMining}
              disabled={!isConnected}
              className="flex-1"
            >
              <Pickaxe className="h-4 w-4 mr-2" />
              Start Mining
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={stopMining}
              className="flex-1"
            >
              Stop Mining
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Mining rewards: 1-5 ICP tokens per session
        </div>
      </CardContent>
    </Card>
  );
};