import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PartyPopper, Heart, Home } from "lucide-react";
import logo from "@/assets/logo.png";

interface ThankYouPageProps {
  onGoHome: () => void;
}

const ThankYouPage = ({ onGoHome }: ThankYouPageProps) => {
  return (
    <div className="min-h-screen bg-wellness-sky flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
      {/* Logo */}
      <motion.div
        className="absolute top-4 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img src={logo} alt="WellnessWise Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
      </motion.div>

      {/* Celebration confetti effect */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 3 === 0 ? 'hsl(200 60% 45%)' : i % 3 === 1 ? 'hsl(180 40% 70%)' : 'hsl(200 50% 85%)',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 30}%`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            y: [0, 100, 200],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      <motion.div
        className="text-center max-w-md z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Celebration emoji/icon */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div className="w-20 h-20 rounded-full bg-wellness-teal flex items-center justify-center mx-auto shadow-soft">
            <PartyPopper className="text-primary-foreground" size={40} />
          </div>
        </motion.div>

        {/* Happy emoji blast */}
        <motion.div
          className="text-5xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          🎉
        </motion.div>

        {/* Thank you message */}
        <motion.div
          className="bg-card rounded-2xl shadow-card p-6 border border-wellness-sage/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h1 className="font-display text-xl md:text-2xl font-bold text-wellness-deep mb-3">
            Thank you for sharing honestly.
          </h1>
          
          <p className="font-body text-base text-muted-foreground mb-3 leading-relaxed">
            Taking this moment for yourself matters.
          </p>
          
          <p className="font-body text-base text-wellness-teal font-medium">
            Be kind to yourself — you're doing the best you can.
          </p>

          {/* Pink heart */}
          <motion.div
            className="mt-4 flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="text-pink-400 fill-pink-400" size={20} />
          </motion.div>
        </motion.div>

        {/* Home button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button
            variant="wellnessOutline"
            size="sm"
            onClick={onGoHome}
            className="gap-2"
          >
            <Home size={16} />
            Return to Home
          </Button>
        </motion.div>

        {/* WellnessWise signature */}
        <motion.p
          className="mt-4 text-xs text-muted-foreground font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          With care, <span className="text-wellness-teal font-semibold">WellnessWise</span> 🌿
        </motion.p>

        {/* SurveyCircle Code */}
        <motion.p
          className="mt-6 text-muted-foreground font-body text-center"
          style={{ fontSize: '12px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Redeem the following Survey Code at:{' '}
          <a 
            href="https://www.surveycircle.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-wellness-teal hover:underline"
          >
            https://www.surveycircle.com
          </a>{' '}
          and get free survey participants through SurveyCircle. The Survey Code is: 2GVU-7XFJ-UUDD-NCBT
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
