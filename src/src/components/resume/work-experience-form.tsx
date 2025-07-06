import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface WorkExperienceFormProps {
  resumeProfileId?: number;
}

export default function WorkExperienceForm({ resumeProfileId }: WorkExperienceFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: [`/api/work-experience/${resumeProfileId}`],
    enabled: !!resumeProfileId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/work-experience", {
        ...data,
        resumeProfileId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/work-experience/${resumeProfileId}`] });
      resetForm();
      toast({
        title: "Success",
        description: "Work experience added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add work experience",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/work-experience/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/work-experience/${resumeProfileId}`] });
      resetForm();
      toast({
        title: "Success",
        description: "Work experience updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update work experience",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/work-experience/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/work-experience/${resumeProfileId}`] });
      toast({
        title: "Success",
        description: "Work experience deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete work experience",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (experience: any) => {
    setFormData({
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      description: experience.description || "",
    });
    setEditingId(experience.id);
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this work experience?")) {
      deleteMutation.mutate(id);
    }
  };

  if (!resumeProfileId) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Please save your personal information first to add work experience.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <Button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2"
          disabled={isAdding}
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add"} Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank if current position</p>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description & Achievements</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your responsibilities and key achievements..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingId ? "Update" : "Add"} Experience
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((experience: any) => (
          <Card key={experience.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{experience.title}</h4>
                  <p className="text-gray-600">{experience.company}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(experience.startDate).toLocaleDateString()} - {
                      experience.endDate 
                        ? new Date(experience.endDate).toLocaleDateString()
                        : "Present"
                    }
                  </p>
                  {experience.description && (
                    <p className="text-sm text-gray-700 mt-2">{experience.description}</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(experience)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(experience.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {experiences.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
