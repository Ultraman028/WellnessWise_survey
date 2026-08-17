import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  sectionName: string;
}

const ProgressBar = ({ current, total, sectionName }: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-body text-wellness-deep font-medium">
          {sectionName}
        </span>
        <span className="text-sm font-body text-muted-foreground">
          Question {current} of {total}
        </span>
      </div>
      
      <div className="h-2 bg-wellness-mint rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-wellness-teal rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
