import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Smile, Shield, Sun } from "lucide-react";
import logo from "@/assets/logo.png";

interface LandingPageProps {
  onStart: () => void;
}

const mentalHealthPointers = [
  { icon: Brain, text: "1 in 4 people experience mental health challenges" },
  { icon: Heart, text: "Self-awareness is the first step to wellness" },
  { icon: Shield, text: "Your mental health matters just as much as physical health" },
  { icon: Smile, text: "Small steps lead to big changes" },
  { icon: Sun, text: "It's okay to ask for help" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
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

      {/* Main content */}
      <motion.div
        className="text-center max-w-xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo/Title */}
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="text-wellness-teal">Wellness</span>
          <span className="text-wellness-deep">Wise</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl font-body text-wellness-deep/80 mb-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Your voice matters 💙
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg font-body text-muted-foreground mb-5 leading-relaxed max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          By sharing your honest responses, you help us better understand mental well-being and create support that truly makes a difference.
        </motion.p>

        {/* Mental Health Pointers */}
        <motion.div
          className="bg-card rounded-2xl p-5 mb-6 shadow-card border border-wellness-sage/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className="font-display text-lg font-semibold text-wellness-deep mb-4">
            Did you know? 🧠
          </h3>
          <div className="space-y-3">
            {mentalHealthPointers.map((pointer, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
              >
                <div className="w-8 h-8 rounded-full bg-wellness-mint flex items-center justify-center flex-shrink-0">
                  <pointer.icon className="text-wellness-teal" size={16} />
                </div>
                <p className="text-sm md:text-base font-body text-muted-foreground">{pointer.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Button
            variant="wellness"
            size="lg"
            onClick={onStart}
            className="group"
          >
            <span>Take the Survey</span>
            <motion.span
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>

        {/* Anonymous survey notice */}
        <motion.div
          className="mt-5 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <div className="w-10 h-10 rounded-full bg-wellness-mint border-2 border-wellness-teal flex items-center justify-center">
            <span className="text-lg">🔒</span>
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-body">
            This is an anonymous survey
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default LandingPage;
