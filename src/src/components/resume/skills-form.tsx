import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface SkillsFormProps {
  resumeProfileId?: number;
}

export default function SkillsForm({ resumeProfileId }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({ name: "", category: "technical" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: skills = [], isLoading } = useQuery({
    queryKey: [`/api/skills/${resumeProfileId}`],
    enabled: !!resumeProfileId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/skills", {
        ...data,
        resumeProfileId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/skills/${resumeProfileId}`] });
      setNewSkill({ name: "", category: "technical" });
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/skills/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/skills/${resumeProfileId}`] });
      toast({
        title: "Success",
        description: "Skill removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    },
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.name.trim()) {
      createMutation.mutate(newSkill);
    }
  };

  const handleDeleteSkill = (id: number) => {
    deleteMutation.mutate(id);
  };

  const groupedSkills = skills.reduce((acc: Record<string, any[]>, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "skill-tag-technical";
      case "soft":
        return "skill-tag-soft";
      case "certification":
        return "skill-tag-certification";
      default:
        return "skill-tag-technical";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "technical":
        return "Technical Skills";
      case "soft":
        return "Soft Skills";
      case "certification":
        return "Certifications";
      default:
        return "Skills";
    }
  };

  if (!resumeProfileId) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Please save your personal information first to add skills.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Skill Form */}
      <form onSubmit={handleAddSkill} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g. React, Leadership, AWS Certified..."
            />
          </div>
          <div>
            <Label htmlFor="skillCategory">Category</Label>
            <Select
              value={newSkill.category}
              onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="soft">Soft Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={!newSkill.name.trim() || createMutation.isPending}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </Button>
      </form>

      {/* Skills Display */}
      <div className="space-y-6">
        {["technical", "soft", "certification"].map((category) => (
          <div key={category}>
            <h4 className="text-md font-medium text-gray-900 mb-3">
              {getCategoryLabel(category)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {groupedSkills[category]?.map((skill: any) => (
                <Badge
                  key={skill.id}
                  className={`skill-tag ${getCategoryColor(category)} flex items-center space-x-2`}
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                    disabled={deleteMutation.isPending}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )) || []}
              
              {(!groupedSkills[category] || groupedSkills[category].length === 0) && (
                <p className="text-sm text-gray-500 italic">
                  No {getCategoryLabel(category).toLowerCase()} added yet
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet.</p>
          <p className="text-sm">Add your first skill above to get started.</p>
        </div>
      )}
    </div>
  );
}
