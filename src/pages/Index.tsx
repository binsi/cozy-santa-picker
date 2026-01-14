import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/mountains-of-christmas/400.css";
import "@fontsource/mountains-of-christmas/700.css";
import Snowfall from "@/components/Snowfall";
import ChristmasTree from "@/components/ChristmasTree";
import SecretSantaForm from "@/components/SecretSantaForm";
import MatchResults, { type Match } from "@/components/MatchResults";
import EmailForm from "@/components/EmailForm";
import EmailSentConfirmation from "@/components/EmailSentConfirmation";
import { generateSecretSantaMatches } from "@/lib/secretSanta";
import { exportMatchesToPDF } from "@/lib/pdfExport";
import { useToast } from "@/hooks/use-toast";

type AppState = "input" | "results" | "email" | "sent";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [matches, setMatches] = useState<Match[]>([]);
  const { toast } = useToast();

  const handleGenerate = (participants: string[]) => {
    try {
      const newMatches = generateSecretSantaMatches(participants);
      setMatches(newMatches);
      setAppState("results");
      toast({
        title: "🎅 Secret Santa Generated!",
        description: `Successfully created ${newMatches.length} magical pairings!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate matches. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    exportMatchesToPDF(matches);
    toast({
      title: "📄 PDF Downloaded!",
      description: "Your Secret Santa matches have been saved to PDF.",
    });
  };

  const handleSendEmails = (matchesWithEmails: Match[]) => {
    setMatches(matchesWithEmails);
    // Simulate email sending (demo mode)
    setTimeout(() => {
      setAppState("sent");
      toast({
        title: "📧 Emails Sent!",
        description: "All participants have received their assignments!",
      });
    }, 1000);
  };

  const handleReset = () => {
    setMatches([]);
    setAppState("input");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Snowfall />

      {/* Ambient glow effects */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-christmas-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-christmas-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-christmas text-foreground mb-4"
            animate={{
              textShadow: [
                "0 0 20px hsl(42 90% 55% / 0.3)",
                "0 0 40px hsl(42 90% 55% / 0.5)",
                "0 0 20px hsl(42 90% 55% / 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Secret Santa ✨
          </motion.h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Spread holiday joy with magical gift exchanges
          </p>
        </motion.header>

        {/* Christmas Trees */}
        <div className="hidden md:flex justify-between items-end fixed bottom-0 left-0 right-0 px-8 pointer-events-none z-0">
          <ChristmasTree size="lg" />
          <ChristmasTree size="md" className="mb-4" />
          <ChristmasTree size="lg" />
        </div>

        {/* Mobile Trees */}
        <div className="flex md:hidden justify-between items-end fixed bottom-0 left-0 right-0 px-4 pointer-events-none z-0">
          <ChristmasTree size="sm" />
          <ChristmasTree size="sm" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 pb-48 md:pb-64">
          <AnimatePresence mode="wait">
            {appState === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <SecretSantaForm onGenerate={handleGenerate} />
              </motion.div>
            )}

            {appState === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <MatchResults
                  matches={matches}
                  onExportPDF={handleExportPDF}
                  onShowEmailForm={() => setAppState("email")}
                  onReset={handleReset}
                />
              </motion.div>
            )}

            {appState === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <EmailForm
                  matches={matches}
                  onBack={() => setAppState("results")}
                  onSendEmails={handleSendEmails}
                />
              </motion.div>
            )}

            {appState === "sent" && (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmailSentConfirmation matches={matches} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-4 left-0 right-0 text-center z-20"
        >
          <p className="text-xs text-muted-foreground/60">
            Made with 🎄 for spreading holiday cheer
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
