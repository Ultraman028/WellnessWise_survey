import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProgressBar from "@/components/ProgressBar";
import ScaleSlider from "@/components/ScaleSlider";
import { surveyQuestions, SurveyData, initialSurveyData } from "@/data/surveyQuestions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SurveyFormProps {
  onComplete: (data: SurveyData) => void;
  onGoHome: () => void;
}

const SurveyForm = ({ onComplete }: SurveyFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [error, setError] = useState("");

  const question = surveyQuestions[currentQuestion];
  const totalQuestions = surveyQuestions.length;

  const handleChange = (field: keyof SurveyData, value: string | number) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateCurrentQuestion = (): boolean => {
    const value = surveyData[question.id];
    
    if (question.type === "scale") {
      return true; // Scale always has a default value
    }
    
    if (question.type === "conditional") {
      if (!value) {
        setError("Please select an option");
        return false;
      }
      if (value === question.conditionalValue && !surveyData[question.conditionalField!]) {
        const errorMessage = question.conditionalField === "willingnessToPayOpinion" 
          ? "Kindly fill the option" 
          : "Please enter the city/town name";
        setError(errorMessage);
        return false;
      }
      return true;
    }

    if (!value || (typeof value === "string" && value.trim() === "")) {
      setError("This field is required");
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) return;
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      onComplete(surveyData);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setError("");
    }
  };

  const renderQuestion = () => {
    const value = surveyData[question.id];

    switch (question.type) {
      case "radio":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => handleChange(question.id, option)}
                className={`w-full p-4 rounded-xl text-left font-body transition-all duration-200 border-2 text-base ${
                  value === option
                    ? "border-wellness-teal bg-wellness-mint text-wellness-deep"
                    : "border-border bg-card hover:border-wellness-sage hover:bg-wellness-mint/50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      value === option
                        ? "border-wellness-teal bg-wellness-teal"
                        : "border-muted-foreground"
                    }`}
                  >
                    {value === option && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </span>
                  {option}
                </span>
              </motion.button>
            ))}
          </div>
        );

      case "text":
        return (
          <Input
            type="text"
            value={value as string}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 rounded-xl border-2 border-border focus:border-wellness-teal bg-card font-body text-base"
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value as string}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder="Share your thoughts here..."
            className="w-full p-4 rounded-xl border-2 border-border focus:border-wellness-teal bg-card font-body text-base min-h-[120px] resize-none"
          />
        );

      case "scale":
        const getLabelType = () => {
          if (question.labelType) return question.labelType;
          if (question.questionNumber === 12) return "control";
          return "standard";
        };
        return (
          <ScaleSlider
            value={value as number}
            onChange={(v) => handleChange(question.id, v)}
            labelType={getLabelType()}
          />
        );

      case "conditional":
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {question.options?.map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleChange(question.id, option)}
                  className={`w-full p-4 rounded-xl text-left font-body transition-all duration-200 border-2 text-base ${
                    value === option
                      ? "border-wellness-teal bg-wellness-mint text-wellness-deep"
                      : "border-border bg-card hover:border-wellness-sage hover:bg-wellness-mint/50"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        value === option
                          ? "border-wellness-teal bg-wellness-teal"
                          : "border-muted-foreground"
                      }`}
                    >
                      {value === option && (
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </span>
                    {option}
                  </span>
                </motion.button>
              ))}
            </div>
            
            {value === question.conditionalValue && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Input
                  type="text"
                  value={surveyData[question.conditionalField!] as string || ""}
                  onChange={(e) => handleChange(question.conditionalField!, e.target.value)}
                  placeholder={question.conditionalField === "willingnessToPayOpinion" ? "Share your thoughts here..." : "Enter city/town name..."}
                  className="w-full p-4 rounded-xl border-2 border-border focus:border-wellness-teal bg-card font-body text-base"
                />
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-wellness-sky flex flex-col px-4 py-4">
      {/* Header */}
      <div className="max-w-xl mx-auto w-full">
        <div className="flex items-center justify-center mb-4">
          <span className="font-display text-lg font-semibold text-wellness-deep">
            WellnessWise
          </span>
        </div>

        <ProgressBar
          current={currentQuestion + 1}
          total={totalQuestions}
          sectionName={question.sectionName}
        />
      </div>

      {/* Question card */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="max-w-xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow-card p-5 border border-wellness-sage/20"
            >
              {/* Section badge */}
              <div className="inline-block bg-wellness-mint px-2 py-0.5 rounded-full text-xs font-body font-medium text-wellness-teal mb-3">
                Section {question.section}: {question.sectionName}
              </div>

              {/* Question number and text */}
              <h2 className="font-display text-lg md:text-xl font-semibold text-wellness-deep mb-5">
                <span className="text-wellness-teal">Q{question.questionNumber}.</span>{" "}
                {question.text}
              </h2>

              {/* Answer input */}
              {renderQuestion()}

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-xs text-destructive font-body"
                >
                  ⚠️ {error}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <Button
              variant="wellnessOutline"
              size="sm"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>

            <Button
              variant="wellness"
              size="sm"
              onClick={handleNext}
              className="gap-1"
            >
              {currentQuestion === totalQuestions - 1 ? "Submit" : "Next"}
              {currentQuestion !== totalQuestions - 1 && <ChevronRight size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
