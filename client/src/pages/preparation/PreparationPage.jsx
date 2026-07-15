import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import usePreparation from "../../hooks/usePreparation";
import useProgress from "../../hooks/useProgress";
import MentorHeader from "../../components/preparation/MentorHeader";
import PreparationOverview from "../../components/preparation/PreparationOverview";
import TechnicalTopicsCard from "../../components/preparation/TechnicalTopicsCard";
import CodingTopicsCard from "../../components/preparation/CodingTopicsCard";
import RoadmapCard from "../../components/preparation/RoadmapCard";
import DailyProgressCard from "../../components/preparation/DailyProgressCard";
import InterviewQuestionsCard from "../../components/preparation/InterviewQuestionsCard";
import BehavioralQuestionsCard from "../../components/preparation/BehavioralQuestionsCard";
import StrengthWeaknessCard from "../../components/preparation/StrengthWeaknessCard";
import FinalAdviceCard from "../../components/preparation/FinalAdviceCard";
import MentorChat from "../../components/preparation/MentorChat";

function PreparationPage() {
  const { applicationId } = useParams();

  /*
   * Load AI Preparation Plan
   */

  const {
    plan,

    loading,

    error,
  } = usePreparation(applicationId);

  /*
   * Load Progress
   */

  const {
    progress,
    completeTopic,
    completedTechnical,
    completedCoding,
    completedRoadmap,
  } = useProgress(plan?.sessionId);

  /*
   * Loading
   */
  console.log("Plan =", plan);
  console.log("Progress =", progress);
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Loading AI Preparation...</div>
      </DashboardLayout>
    );
  }

  /*
   * Error
   */

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-8 text-red-600">{error}</div>
      </DashboardLayout>
    );
  }

  /*
   * No Plan
   */

  if (!plan) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Preparation plan not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-8">
        <MentorHeader role={plan.role} company={plan.company} />

        <PreparationOverview overview={plan.overview} />

         <DailyProgressCard
          progress={progress}
          totalTechnical={plan.technicalTopics?.length || 0}
          totalCoding={plan.codingTopics?.length || 0}
          totalRoadmap={plan.preparationRoadmap?.length || 0}
        /> 

        <div className="grid gap-6 lg:grid-cols-2">
          <TechnicalTopicsCard
            topics={plan.technicalTopics || []}
            sessionId={plan.sessionId}
            completedTopics={completedTechnical}
            onComplete={completeTopic}
          />

          <CodingTopicsCard
            topics={plan.codingTopics || []}
            sessionId={plan.sessionId}
            completedTopics={completedCoding}
            onComplete={completeTopic}
          />
        </div>

        <RoadmapCard
          roadmap={plan.preparationRoadmap || []}
          sessionId={plan.sessionId}
          completedSteps={completedRoadmap}
          onComplete={completeTopic}
        />

        <InterviewQuestionsCard questions={plan.interviewQuestions || []} />

        <BehavioralQuestionsCard questions={plan.behavioralQuestions || []} />

        <StrengthWeaknessCard
          strengths={plan.strengths || []}
          weaknesses={plan.weaknesses || []}
        />

        <FinalAdviceCard advice={plan.finalAdvice} />

        <MentorChat sessionId={plan.sessionId} />
      </div>
    </DashboardLayout>
  );
}

export default PreparationPage;
