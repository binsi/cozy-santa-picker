import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SecretSantaFormProps {
  onGenerate: (participants: string[]) => void;
}

const SecretSantaForm = ({ onGenerate }: SecretSantaFormProps) => {
  const [names, setNames] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    setError("");

    // Parse names (one per line)
    const participants = names
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    // Validation
    if (participants.length < 2) {
      setError("Please enter at least 2 participants!");
      return;
    }

    // Check for duplicates
    const uniqueNames = new Set(participants.map((n) => n.toLowerCase()));
    if (uniqueNames.size !== participants.length) {
      setError("Duplicate names found! Each participant must have a unique name.");
      return;
    }

    onGenerate(participants);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/20">
            <Gift className="w-6 h-6 text-christmas-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-christmas text-foreground">Add Participants</h2>
            <p className="text-sm text-muted-foreground">Enter one name per line</p>
          </div>
        </div>

        <Textarea
          value={names}
          onChange={(e) => {
            setNames(e.target.value);
            setError("");
          }}
          placeholder={`Alice\nBob\nCharlie\nDiana\nEdward`}
          className="min-h-[200px] bg-input/50 border-border focus:border-christmas-gold focus:ring-christmas-gold/20 text-foreground placeholder:text-muted-foreground/60 text-base resize-none"
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        <Button
          onClick={handleGenerate}
          className="w-full mt-6 h-14 text-lg font-christmas bg-gradient-to-r from-christmas-red to-christmas-red-glow hover:from-christmas-red-glow hover:to-christmas-red text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            boxShadow: "0 0 30px hsl(0 72% 50% / 0.3)",
          }}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Secret Santa
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Everyone will be assigned exactly one person to give a gift to! 🎁
        </p>
      </div>
    </motion.div>
  );
};

export default SecretSantaForm;
