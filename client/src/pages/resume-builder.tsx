import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, Save, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PersonalInfoForm from "@/components/resume/personal-info-form";
import WorkExperienceForm from "@/components/resume/work-experience-form";
import SkillsForm from "@/components/resume/skills-form";
import { apiRequest } from "@/lib/queryClient";

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState<"personal" | "experience" | "skills">("personal");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: resumeProfile, isLoading } = useQuery({
    queryKey: ["/api/resume-profile"],
  });

  const createResumeMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/resume-profile", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resume-profile"] });
      toast({
        title: "Success",
        description: "Resume profile created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create resume profile",
        variant: "destructive",
      });
    },
  });

  const updateResumeMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", `/api/resume-profile/${resumeProfile.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resume-profile"] });
      toast({
        title: "Success",
        description: "Resume profile updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update resume profile",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Master Resume</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Build your comprehensive resume profile that will be used to generate tailored resumes for specific jobs.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => {
                    alert("AutoHired Premium - Advanced Resume Features\n\n🚀 Premium Features:\n• Professional resume templates and themes\n• AI-powered resume optimization and suggestions\n• ATS compatibility scoring and improvements\n• Multiple export formats (PDF, Word, LinkedIn)\n• Resume A/B testing and performance analytics\n• Custom sections and advanced formatting\n• Industry-specific resume templates\n\n📈 Get noticed by recruiters with professionally optimized resumes.\n\nComing soon with full subscription management!");
                  }}
                >
                  <FileText className="w-4 h-4" />
                  <span>View Premium</span>
                </Button>
                <Button 
                  className="flex items-center space-x-2"
                  disabled={createResumeMutation.isPending || updateResumeMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Section Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveSection("personal")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "personal"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveSection("experience")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "experience"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Work Experience
                </button>
                <button
                  onClick={() => setActiveSection("skills")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === "skills"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Skills
                </button>
              </nav>
            </div>

            {/* Section Content */}
            <div className="p-6">
              {activeSection === "personal" && (
                <PersonalInfoForm 
                  resumeProfile={resumeProfile}
                  onSave={(data) => {
                    if (resumeProfile) {
                      updateResumeMutation.mutate(data);
                    } else {
                      createResumeMutation.mutate(data);
                    }
                  }}
                />
              )}
              {activeSection === "experience" && (
                <WorkExperienceForm resumeProfileId={resumeProfile?.id} />
              )}
              {activeSection === "skills" && (
                <SkillsForm resumeProfileId={resumeProfile?.id} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resume Preview */}
        {resumeProfile && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Resume Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{resumeProfile.name}</h1>
                    <div className="text-gray-600 space-y-1">
                      <p>{resumeProfile.email}</p>
                      {resumeProfile.phone && <p>{resumeProfile.phone}</p>}
                      {resumeProfile.location && <p>{resumeProfile.location}</p>}
                    </div>
                  </div>
                  
                  {resumeProfile.summary && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                      <p className="text-gray-700">{resumeProfile.summary}</p>
                    </div>
                  )}
                  
                  <div className="text-center text-gray-500 text-sm">
                    Complete your experience and skills to see full preview
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
