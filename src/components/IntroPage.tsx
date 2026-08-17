import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import logo from "@/assets/logo.png";

interface IntroPageProps {
  onStart: () => void;
  onGoHome: () => void;
}

const IntroPage = ({ onStart, onGoHome }: IntroPageProps) => {
  return (
    <div className="min-h-screen bg-wellness-sky flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
      {/* Logo */}
      <motion.div
        className="absolute top-4 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img src={logo} alt="WellnessWise Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
      </motion.div>

      {/* Home button */}
      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoHome}
          className="gap-2 text-muted-foreground hover:text-wellness-teal"
        >
          <Home size={18} />
          Home
        </Button>
      </motion.div>

      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="font-display text-3xl md:text-4xl font-bold text-wellness-deep mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Making sense of mental mess
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl font-body text-wellness-teal mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          by <span className="font-semibold">WellnessWise</span>
        </motion.p>

        {/* Main message */}
        <motion.div
          className="bg-card rounded-2xl shadow-card p-6 mb-6 border border-wellness-sage/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="font-display text-xl md:text-2xl font-medium text-wellness-deep leading-relaxed">
            "This isn't just a survey.
            <br />
            <span className="text-wellness-teal">It's the start of something real.</span>"
          </p>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button
            variant="wellness"
            size="lg"
            onClick={onStart}
            className="group"
          >
            <span>Start</span>
            <motion.span
              className="ml-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
          </Button>
        </motion.div>

        {/* Time estimate */}
        <motion.p
          className="mt-4 text-xs text-muted-foreground font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          ⏱️ Takes about 5-7 minutes
        </motion.p>
      </motion.div>
    </div>
  );
};

export default IntroPage;
