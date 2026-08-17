import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface ScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
  labelType?: "standard" | "control" | "difficulty";
}

const ScaleSlider = ({ value, onChange, labelType = "standard" }: ScaleSliderProps) => {
  const standardLabels: Record<number, string> = {
    1: "Not at all / Never",
    2: "Very rarely",
    3: "Occasionally",
    4: "Sometimes / Neutral",
    5: "Often",
    6: "Very often",
    7: "Extremely / Almost always",
  };

  const controlLabels: Record<number, string> = {
    1: "No control at all",
    2: "Very little control",
    3: "Limited control",
    4: "Moderate control",
    5: "Good control",
    6: "Very good control",
    7: "Full control",
  };

  const difficultyLabels: Record<number, string> = {
    1: "Not difficult at all",
    2: "Slightly difficult",
    3: "Mildly difficult",
    4: "Moderately difficult",
    5: "Quite difficult",
    6: "Very difficult",
    7: "Extremely difficult",
  };

  const labelsMap = {
    standard: standardLabels,
    control: controlLabels,
    difficulty: difficultyLabels,
  };

  const labels = labelsMap[labelType];

  const getLabel = (val: number) => labels[val] || "";

  return (
    <div className="w-full">
      {/* Current selection display */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={value}
      >
        <span className="inline-block bg-wellness-mint px-5 py-2.5 rounded-xl text-base font-body text-wellness-deep font-semibold">
          {value}: {getLabel(value)}
        </span>
      </motion.div>

      {/* Slider */}
      <div className="px-2 mb-4">
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={1}
          max={7}
          step={1}
          className="w-full"
        />
      </div>

      {/* Number markers */}
      <div className="flex justify-between px-1 mb-3">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
              num === value
                ? "bg-wellness-teal text-primary-foreground"
                : "bg-wellness-mint text-wellness-deep hover:bg-wellness-sage/50"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="text-left max-w-[80px]">{labels[1]}</span>
        <span className="text-center max-w-[80px]">{labels[4]}</span>
        <span className="text-right max-w-[80px]">{labels[7]}</span>
      </div>
    </div>
  );
};

export default ScaleSlider;
