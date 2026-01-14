import { motion } from "framer-motion";
import { Gift, ArrowRight, Download, Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Match {
  giver: string;
  receiver: string;
  email?: string;
}

interface MatchResultsProps {
  matches: Match[];
  onExportPDF: () => void;
  onShowEmailForm: () => void;
  onReset: () => void;
}

const MatchResults = ({ matches, onExportPDF, onShowEmailForm, onReset }: MatchResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 rounded-xl bg-christmas-green/30"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className="w-6 h-6 text-christmas-gold" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-christmas text-foreground">Secret Santa Matches!</h2>
              <p className="text-sm text-muted-foreground">{matches.length} magical pairings</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Start Over
          </Button>
        </div>

        <div className="space-y-3 mb-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.giver}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted/80 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-christmas-red/20 text-christmas-red font-bold text-sm">
                {index + 1}
              </span>
              <span className="font-medium text-foreground flex-1">{match.giver}</span>
              <ArrowRight className="w-5 h-5 text-christmas-gold" />
              <span className="font-medium text-christmas-gold flex-1 text-right">
                {match.receiver}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Share the assignments with your group:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onExportPDF}
              className="flex-1 h-12 bg-christmas-green hover:bg-christmas-green-dark text-snow font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={onShowEmailForm}
              variant="outline"
              className="flex-1 h-12 border-christmas-gold/50 text-christmas-gold hover:bg-christmas-gold/10"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Emails
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchResults;
