import { motion } from "framer-motion";
import { CheckCircle, Mail, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Match } from "./MatchResults";

interface EmailSentConfirmationProps {
  matches: Match[];
  onReset: () => void;
}

const EmailSentConfirmation = ({ matches, onReset }: EmailSentConfirmationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-christmas-green/20 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-christmas-green" />
        </motion.div>

        <h2 className="text-3xl font-christmas text-foreground mb-2">Emails Sent!</h2>
        <p className="text-muted-foreground mb-6">
          All {matches.length} participants have received their Secret Santa assignments
        </p>

        <div className="bg-muted/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3 text-left">
            <Info className="w-5 h-5 text-christmas-gold shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Demo Mode:</strong> In this demo, emails are simulated. 
                To enable real email sending, you'll need to connect an email service.
              </p>
              <p className="text-muted-foreground">
                Each email contains only the recipient's own Secret Santa assignment, 
                keeping everyone else's match a secret! 🎅
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {matches.map((match, index) => (
            <motion.div
              key={match.giver}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 text-sm"
            >
              <Mail className="w-4 h-4 text-christmas-gold" />
              <span className="text-muted-foreground">Sent to</span>
              <span className="font-medium text-foreground">{match.email}</span>
              <CheckCircle className="w-4 h-4 text-christmas-green ml-auto" />
            </motion.div>
          ))}
        </div>

        <Button
          onClick={onReset}
          variant="outline"
          className="mt-8 border-christmas-gold/50 text-christmas-gold hover:bg-christmas-gold/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Secret Santa
        </Button>
      </div>
    </motion.div>
  );
};

export default EmailSentConfirmation;
