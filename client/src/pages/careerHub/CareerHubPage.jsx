import { useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import useCareerHub from "../../hooks/useCareerHub";

import CareerHubHeader from "../../components/careerHub/dashboard/CareerHubHeader";
import StatsCards from "../../components/careerHub/dashboard/StatsCards";
import SearchBar from "../../components/careerHub/dashboard/SearchBar";
import LoadingState from "../../components/careerHub/dashboard/LoadingState";
import EmptyState from "../../components/careerHub/dashboard/EmptyState";

import ApplicationList from "../../components/careerHub/application/ApplicationList";

function CareerHubPage() {
  const {
    applications,
    stats,
    loading,
  } = useCareerHub();

  const [search, setSearch] = useState("");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const keyword = search.toLowerCase();

      return (
        application.role?.toLowerCase().includes(keyword) ||
        application.company?.toLowerCase().includes(keyword)
      );
    });
  }, [applications, search]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <CareerHubHeader />

        <StatsCards stats={stats} />

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        {loading ? (
          <LoadingState />
        ) : filteredApplications.length === 0 ? (
          <EmptyState />
        ) : (
          <ApplicationList
            applications={filteredApplications}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default CareerHubPage;