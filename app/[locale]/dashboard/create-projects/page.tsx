'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now().toString(36);
}

export default function CreateProjectsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';

  const { user, isLoaded } = useUser();

  // Fetch categories from Convex
  const categories = useQuery(api.marketplace.categories.list, { locale }) ?? [];

  // Flatten the tree into a flat list for the select
  function flattenCategories(
    cats: typeof categories
  ): Array<{ id: string; name: string; parentId: string | null }> {
    const result: Array<{ id: string; name: string; parentId: string | null }> = [];
    for (const cat of cats) {
      result.push({
        id: cat._id,
        name: cat.name ?? '',
        parentId: (cat as Record<string, unknown>).parentId as string | null ?? null,
      });
      const children = (cat as Record<string, unknown>).children as typeof categories | undefined;
      if (children && children.length > 0) {
        result.push(...flattenCategories(children));
      }
    }
    return result;
  }

  const flatCategories = flattenCategories(categories);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [workType, setWorkType] = useState<'remote' | 'local' | 'hybrid'>('remote');
  const [deadline, setDeadline] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createProject = useMutation(api.marketplace.projects.create);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s) && skills.length < 10) {
      setSkills([...skills, s]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSkillKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.trim().length < 5) {
      setError('Title must be at least 5 characters.');
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setError('Description must be at least 20 characters.');
      return;
    }

    const minNum = budgetMin ? parseFloat(budgetMin) : undefined;
    const maxNum = budgetMax ? parseFloat(budgetMax) : undefined;

    if (minNum !== undefined && minNum <= 0) {
      setError('Min budget must be a positive number.');
      return;
    }
    if (maxNum !== undefined && maxNum <= 0) {
      setError('Max budget must be a positive number.');
      return;
    }
    if (minNum && maxNum && minNum > maxNum) {
      setError('Min budget cannot exceed max budget.');
      return;
    }

    setLoading(true);
    try {
      const deadlineTs = deadline
        ? new Date(deadline).getTime()
        : undefined;

      await createProject({
        title: title.trim(),
        slug: slugify(title.trim()),
        description: description.trim(),
        categoryId: categoryId
          ? (categoryId as Id<'marketplaceCategories'>)
          : undefined,
        requiredSkills: skills.length > 0 ? skills : undefined,
        budgetMin: minNum,
        budgetMax: maxNum,
        currency,
        deadline: deadlineTs,
        workType,
        locale,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/dashboard/manage-projects`);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create project.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard__content hover-bgc-color">
          <div className="text-center py50">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (success) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard__content hover-bgc-color">
          <div className="text-center py50">
            <i className="flaticon-checked fz60 text-thm mb20" />
            <h4 className="mt20">Project published!</h4>
            <p className="text mt10">Redirecting to your projects...</p>
          </div>
        </div>
      </div>
    );
  }

  const showLocationNote = workType === 'local' || workType === 'hybrid';

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Post a Project</h2>
              <p className="text">
                Describe your project clearly to attract the right freelancers.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Project Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Build a React e-commerce website"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={120}
                        required
                      />
                      <div className="text-muted fz12 mt5">
                        {title.length}/120 characters
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={6}
                        placeholder="Describe your project requirements, deliverables and any technical details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                      <div className="text-muted fz12 mt5">
                        {description.length} characters (min. 20)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Category
                      </label>
                      <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">Select a category</option>
                        {flatCategories
                          .filter((c) => !c.parentId)
                          .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Currency
                      </label>
                      <select
                        className="form-control"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="EUR">EUR – Euro (€)</option>
                        <option value="USD">USD – US Dollar ($)</option>
                        <option value="GBP">GBP – British Pound (£)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Budget Min
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="100"
                        min="1"
                        step="1"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Budget Max
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="1000"
                        min="1"
                        step="1"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Required Skills
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type a skill and press Enter or comma"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillKey}
                          maxLength={50}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={addSkill}
                          disabled={!skillInput.trim() || skills.length >= 10}
                        >
                          Add
                        </button>
                      </div>
                      {skills.length > 0 && (
                        <div className="mt10 d-flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="badge bg-light text-dark border fz12 d-inline-flex align-items-center gap-1 py5 px10"
                            >
                              {skill}
                              <button
                                type="button"
                                className="btn-close fz10 ms-1"
                                onClick={() => removeSkill(skill)}
                                aria-label={`Remove ${skill}`}
                              />
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-muted fz12 mt5">
                        {skills.length}/10 skills added. Press Enter or comma to add.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Type */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Work Type
                      </label>
                      <div className="d-flex gap-3">
                        {(['remote', 'local', 'hybrid'] as const).map((type) => (
                          <label
                            key={type}
                            className={`d-flex align-items-center gap-2 cursor-pointer px15 py10 bdrs4 border ${
                              workType === type
                                ? 'border-thm bgc-thm-light text-thm fw500'
                                : 'border-light dark-color'
                            }`}
                            style={{ cursor: 'pointer' }}
                          >
                            <input
                              type="radio"
                              name="workType"
                              value={type}
                              checked={workType === type}
                              onChange={() => setWorkType(type)}
                              className="me-1"
                            />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </label>
                        ))}
                      </div>
                      {showLocationNote && (
                        <p className="text-muted fz12 mt5">
                          Note: Location details can be specified in the project description.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="form-label fw500 dark-color">
                        Deadline (optional)
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="alert alert-danger bdrs4 mb20" role="alert">
                    <i className="fal fa-exclamation-circle me-2" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex gap-3">
                      <button
                        type="submit"
                        className="ud-btn btn-thm"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            />
                            Publishing...
                          </>
                        ) : (
                          <>
                            Publish Project
                            <i className="fal fa-arrow-right-long" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
