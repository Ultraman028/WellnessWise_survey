import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import LandingPage from "@/components/LandingPage";
import IntroPage from "@/components/IntroPage";
import SurveyForm from "@/components/SurveyForm";
import ThankYouPage from "@/components/ThankYouPage";
import { SurveyData } from "@/data/surveyQuestions";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type PageState = "landing" | "intro" | "survey" | "thanks";

const SURVEY_COMPLETED_KEY = "wellnesswise_survey_completed";
const SURVEY_RESPONSES_KEY = "wellnesswise_survey_responses";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed the survey
    const completed = localStorage.getItem(SURVEY_COMPLETED_KEY);
    if (completed === "true") {
      setHasCompletedSurvey(true);
    }
  }, []);

  const handleLandingStart = () => {
    if (hasCompletedSurvey) {
      toast({
        title: "Survey Already Completed",
        description: "Thank you! You have already submitted your response. Each person can only take the survey once.",
        variant: "default",
      });
      return;
    }
    setCurrentPage("intro");
  };

  const handleIntroStart = () => {
    setCurrentPage("survey");
  };

  const handleGoHome = () => {
    setCurrentPage("landing");
  };

  const handleSurveyComplete = async (data: SurveyData) => {
    try {
      // Send the response to Firestore in real time
      await addDoc(collection(db, "survey_responses"), {
        ...data,
        submittedAt: serverTimestamp(),
      });

      // Mark this device as having completed the survey (prevents resubmission)
      localStorage.setItem(SURVEY_COMPLETED_KEY, "true");
      setHasCompletedSurvey(true);
      setCurrentPage("thanks");
    } catch (err) {
      console.error("Error submitting survey to Firebase:", err);

      // Fallback: keep the response locally so it isn't lost, and let the
      // user know submission will need to be retried / synced later.
      const existing = JSON.parse(localStorage.getItem(SURVEY_RESPONSES_KEY) || "[]");
      existing.push({ ...data, submittedAt: new Date().toISOString(), synced: false });
      localStorage.setItem(SURVEY_RESPONSES_KEY, JSON.stringify(existing));

      toast({
        title: "Connection issue",
        description: "We couldn't reach the server, but your response was saved on this device. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onStart={handleLandingStart} />;
      case "intro":
        return <IntroPage onStart={handleIntroStart} onGoHome={handleGoHome} />;
      case "survey":
        return <SurveyForm onComplete={handleSurveyComplete} onGoHome={handleGoHome} />;
      case "thanks":
        return <ThankYouPage onGoHome={handleGoHome} />;
      default:
        return <LandingPage onStart={handleLandingStart} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>WellnessWise - Mental Wellness Survey</title>
        <meta
          name="description"
          content="Your voice matters. Share your honest responses to help us better understand mental well-being and create support that truly makes a difference."
        />
        <meta name="keywords" content="mental wellness, mental health, survey, well-being, emotional health" />
        <meta property="og:title" content="WellnessWise - Mental Wellness Survey" />
        <meta
          property="og:description"
          content="Help us understand mental well-being better by sharing your experiences."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {renderPage()}
    </>
  );
};

export default Index;
