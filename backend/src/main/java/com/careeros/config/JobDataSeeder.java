    package com.careeros.config;

    import com.careeros.entity.Job;
    import com.careeros.repository.JobRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.boot.CommandLineRunner;
    import org.springframework.stereotype.Component;
    import com.careeros.entity.enums.EmploymentType;
    import com.careeros.entity.enums.ExperienceLevel;

    import java.util.List;

    @Component
    @RequiredArgsConstructor
    public class JobDataSeeder implements CommandLineRunner {

        private final JobRepository jobRepository;

        @Override
        public void run(String... args) {

            if (jobRepository.count() > 0) {
                return;
            }

            List<Job> jobs = List.of(

                    Job.builder()
                            .title("Java Backend Developer")
                            .company("Accenture")
                            .companyLogo("https://logo.clearbit.com/accenture.com")
                            .location("Chennai")
                            .employmentType(EmploymentType.FULL_TIME)
                            .experienceLevel(ExperienceLevel.FRESHER)
                            .salary("₹4.5 - ₹6 LPA")
                            .description("Develop REST APIs using Java and Spring Boot.")
                            .requirements(List.of(
                                    "Good knowledge of Java",
                                    "Basic Spring Boot",
                                    "SQL knowledge"
                            ))
                            .skills(List.of(
                                    "Java",
                                    "Spring Boot",
                                    "SQL",
                                    "Git"
                            ))
                            .applyUrl("https://www.accenture.com")
                            .build(),

                    Job.builder()
                            .title("MERN Stack Developer")
                            .company("Zoho")
                            .companyLogo("https://logo.clearbit.com/zoho.com")
                            .location("Chennai")
                            .employmentType(EmploymentType.FULL_TIME)
                    .experienceLevel(ExperienceLevel.FRESHER)
                            .salary("₹6 - ₹8 LPA")
                            .description("Build scalable web applications using the MERN stack.")
                            .requirements(List.of(
                                    "React",
                                    "Node.js",
                                    "MongoDB"
                            ))
                            .skills(List.of(
                                    "React",
                                    "Node.js",
                                    "Express",
                                    "MongoDB"
                            ))
                            .applyUrl("https://careers.zoho.com")
                            .build(),

                    Job.builder()
                            .title("Software Engineer")
                            .company("Google")
                            .companyLogo("https://logo.clearbit.com/google.com")
                            .location("Bangalore")
                            .employmentType(EmploymentType.FULL_TIME)
                            .experienceLevel(ExperienceLevel.FRESHER)
                            .salary("₹18 - ₹25 LPA")
                            .description("Work on scalable backend systems.")
                            .requirements(List.of(
                                    "Java or C++",
                                    "DSA",
                                    "System Design Basics"
                            ))
                            .skills(List.of(
                                    "Java",
                                    "Algorithms",
                                    "Data Structures"
                            ))
                            .applyUrl("https://careers.google.com")
                            .build(),

                    Job.builder()
                            .title("Backend Developer")
                            .company("Amazon")
                            .companyLogo("https://logo.clearbit.com/amazon.com")
                            .location("Hyderabad")
                            .employmentType(EmploymentType.FULL_TIME)
                            .experienceLevel(ExperienceLevel.FRESHER)
                            .salary("₹12 - ₹18 LPA")
                            .description("Develop highly scalable backend services.")
                            .requirements(List.of(
                                    "Java",
                                    "Spring Boot",
                                    "Microservices"
                            ))
                            .skills(List.of(
                                    "Java",
                                    "Spring Boot",
                                    "AWS"
                            ))
                            .applyUrl("https://amazon.jobs")
                            .build()

            );

            jobRepository.saveAll(jobs);

            System.out.println("Sample jobs inserted successfully.");
        }
    }