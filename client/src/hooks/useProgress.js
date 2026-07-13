import { useEffect, useState } from "react";

import {
  getProgress,
  updateProgress,
} from "../services/progressService";

function useProgress(sessionId) {
  const [progress, setProgress] = useState(null);

  const [completedTechnical, setCompletedTechnical] = useState([]);

  const [completedCoding, setCompletedCoding] = useState([]);

  const [completedRoadmap, setCompletedRoadmap] = useState([]);

  async function loadProgress() {
    if (!sessionId) return;

    try {
      const data = await getProgress(sessionId);

      setProgress(data);

      setCompletedTechnical(
        data.completedTechnicalTopicsList || []
      );

      setCompletedCoding(
        data.completedCodingTopicsList || []
      );

      setCompletedRoadmap(
        data.completedRoadmapStepsList || []
      );
    } catch (error) {
      console.error(error);

      setProgress({
        progressPercentage: 0,
        completedTechnicalTopics: 0,
        completedCodingTopics: 0,
        completedRoadmapSteps: 0,
      });

      setCompletedTechnical([]);
      setCompletedCoding([]);
      setCompletedRoadmap([]);
    }
  }

  async function completeTopic(payload) {
    try {
      const data = await updateProgress(payload);

      setProgress(data);

      setCompletedTechnical(
        data.completedTechnicalTopicsList || []
      );

      setCompletedCoding(
        data.completedCodingTopicsList || []
      );

      setCompletedRoadmap(
        data.completedRoadmapStepsList || []
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProgress();
  }, [sessionId]);

  return {
    progress,

    completeTopic,

    refresh: loadProgress,

    completedTechnical,

    completedCoding,

    completedRoadmap,
  };
}

export default useProgress;