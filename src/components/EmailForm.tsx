import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Match } from "./MatchResults";

interface EmailFormProps {
  matches: Match[];
  onBack: () => void;
  onSendEmails: (matchesWithEmails: Match[]) => void;
}

const EmailForm = ({ matches, onBack, onSendEmails }: EmailFormProps) => {
  const [emails, setEmails] = useState<Record<string, string>>(
    Object.fromEntries(matches.map((m) => [m.giver, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (giver: string, email: string) => {
    setEmails((prev) => ({ ...prev, [giver]: email }));
    if (errors[giver]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[giver];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    matches.forEach((match) => {
      const email = emails[match.giver];
      if (!email) {
        newErrors[match.giver] = "Email is required";
      } else if (!validateEmail(email)) {
        newErrors[match.giver] = "Invalid email format";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const matchesWithEmails = matches.map((match) => ({
      ...match,
      email: emails[match.giver],
    }));

    onSendEmails(matchesWithEmails);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-christmas-gold/20">
              <Mail className="w-6 h-6 text-christmas-gold" />
            </div>
            <div>
              <h2 className="text-2xl font-christmas text-foreground">Send Email Invitations</h2>
              <p className="text-sm text-muted-foreground">
                Each person will only see their own assignment
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.giver}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl bg-muted/30"
            >
              <span className="font-medium text-foreground min-w-[120px]">{match.giver}</span>
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder={`${match.giver.toLowerCase().replace(/\s/g, ".")}@example.com`}
                  value={emails[match.giver]}
                  onChange={(e) => handleEmailChange(match.giver, e.target.value)}
                  className={`bg-input/50 border-border focus:border-christmas-gold ${
                    errors[match.giver] ? "border-destructive" : ""
                  }`}
                />
                {errors[match.giver] && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors[match.giver]}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg font-christmas bg-gradient-to-r from-christmas-gold to-christmas-gold-soft hover:from-christmas-gold-soft hover:to-christmas-gold text-accent-foreground shadow-lg"
          style={{
            boxShadow: "0 0 30px hsl(42 90% 55% / 0.3)",
          }}
        >
          <Send className="w-5 h-5 mr-2" />
          Send Secret Santa Emails
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          🎄 Each participant will receive a festive email with only their assignment!
        </p>
      </div>
    </motion.div>
  );
};

export default EmailForm;
