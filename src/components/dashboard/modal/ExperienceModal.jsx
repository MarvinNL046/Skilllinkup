"use client";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function formatDateInput(ts) {
  if (!ts) return "";
  return new Date(ts).toISOString().slice(0, 7); // "YYYY-MM"
}

function parseDateInput(str) {
  if (!str) return undefined;
  return new Date(str + "-01").getTime();
}

export default function ExperienceModal({ type, item, open, onOpenChange }) {
  const tt = useTranslations("toasts");
  const isEdit = !!item;

  const addWork = useMutation(api.marketplace.experience.addWorkExperience);
  const updateWork = useMutation(api.marketplace.experience.updateWorkExperience);
  const addEdu = useMutation(api.marketplace.experience.addEducation);
  const updateEdu = useMutation(api.marketplace.experience.updateEducation);
  const addCert = useMutation(api.marketplace.experience.addCertification);

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [certName, setCertName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [certYear, setCertYear] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!item) return;
    if (type === "work") {
      setCompany(item.company || "");
      setJobTitle(item.title || "");
      setStartDate(formatDateInput(item.startDate));
      setEndDate(formatDateInput(item.endDate));
      setIsCurrent(!!item.isCurrent);
      setDescription(item.description || "");
    } else if (type === "education") {
      setSchool(item.school || "");
      setDegree(item.degree || "");
      setField(item.field || "");
      setStartYear(item.startYear ? String(item.startYear) : "");
      setEndYear(item.endYear ? String(item.endYear) : "");
      setDescription(item.description || "");
    } else if (type === "certification") {
      setCertName(item.name || "");
      setIssuer(item.issuer || "");
      setCertYear(item.year ? String(item.year) : "");
      setCertUrl(item.url || "");
    }
  }, [item, type]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (type === "work") {
        const args = {
          company,
          title: jobTitle,
          startDate: parseDateInput(startDate) || Date.now(),
          endDate: isCurrent ? undefined : parseDateInput(endDate),
          isCurrent,
          description: description || undefined,
        };
        if (isEdit) await updateWork({ id: item._id, ...args });
        else await addWork(args);
      } else if (type === "education") {
        const args = {
          school,
          degree: degree || undefined,
          field: field || undefined,
          startYear: startYear ? Number(startYear) : undefined,
          endYear: endYear ? Number(endYear) : undefined,
          description: description || undefined,
        };
        if (isEdit) await updateEdu({ id: item._id, ...args });
        else await addEdu(args);
      } else if (type === "certification") {
        await addCert({
          name: certName,
          issuer: issuer || undefined,
          year: certYear ? Number(certYear) : undefined,
          url: certUrl || undefined,
        });
      }
      toast.success(isEdit ? tt("updated") : tt("added"));
      onOpenChange?.(false);
    } catch (err) {
      toast.error(err.message || tt("failedToSave"));
    } finally {
      setSaving(false);
    }
  };

  const titles = {
    work: "Work Experience",
    education: "Education",
    certification: "Certification",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} {titles[type]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave}>
          <div className="space-y-5">
              {type === "work" && (
                <>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">Company *</label>
                    <input
                      className="form-control"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">Job Title *</label>
                    <input
                      className="form-control"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                      placeholder="e.g. Senior Developer"
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-5">
                      <label className="heading-color  font-medium mb-2.5">Start Date</label>
                      <input
                        type="month"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6 mb-5">
                      <label className="heading-color  font-medium mb-2.5">End Date</label>
                      <input
                        type="month"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        disabled={isCurrent}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isCurrentCheck"
                        checked={isCurrent}
                        onChange={(e) => setIsCurrent(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="isCurrentCheck">
                        I currently work here
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">Description</label>
                    <textarea
                      className="form-control pt-4"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Key responsibilities and achievements..."
                    />
                  </div>
                </>
              )}
              {type === "education" && (
                <>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">School *</label>
                    <input
                      className="form-control"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      required
                      placeholder="e.g. University of Amsterdam"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">Degree</label>
                    <input
                      className="form-control"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. Bachelor"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">Field of Study</label>
                    <input
                      className="form-control"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-5">
                      <label className="heading-color  font-medium mb-2.5">Start Year</label>
                      <input
                        type="number"
                        className="form-control"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        placeholder="2018"
                        min="1950"
                        max="2030"
                      />
                    </div>
                    <div className="col-sm-6 mb-5">
                      <label className="heading-color  font-medium mb-2.5">End Year</label>
                      <input
                        type="number"
                        className="form-control"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        placeholder="2022"
                        min="1950"
                        max="2030"
                      />
                    </div>
                  </div>
                </>
              )}
              {type === "certification" && (
                <>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">
                      Certificate Name *
                    </label>
                    <input
                      className="form-control"
                      value={certName}
                      onChange={(e) => setCertName(e.target.value)}
                      required
                      placeholder="e.g. AWS Solutions Architect"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="heading-color  font-medium mb-2.5">
                      Issuing Organization
                    </label>
                    <input
                      className="form-control"
                      value={issuer}
                      onChange={(e) => setIssuer(e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-5">
                      <label className="heading-color  font-medium mb-2.5">Year</label>
                      <input
                        type="number"
                        className="form-control"
                        value={certYear}
                        onChange={(e) => setCertYear(e.target.value)}
                        placeholder="2023"
                      />
                    </div>
                    <div className="col-sm-6 mb-5">
                      <label className="heading-color  font-medium mb-2.5">
                        Credential URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        value={certUrl}
                        onChange={(e) => setCertUrl(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </>
              )}
          </div>
          <DialogFooter className="gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
