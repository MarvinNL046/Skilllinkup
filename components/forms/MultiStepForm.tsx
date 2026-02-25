"use client";

import React from "react";

interface StepMeta {
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: StepMeta[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  isNextDisabled?: boolean;
  isSubmitDisabled?: boolean;
  children: React.ReactNode;
}

export default function MultiStepForm({
  steps,
  currentStep,
  onNext,
  onBack,
  onSubmit,
  isLastStep,
  isFirstStep,
  isNextDisabled,
  isSubmitDisabled,
  children,
}: MultiStepFormProps) {
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div>
      <div className="mb30">
        <div className="d-flex justify-content-between align-items-center mb15">
          <div>
            <h4 className="mb5">{steps[currentStep]?.title}</h4>
            {steps[currentStep]?.description && (
              <p className="text mb0">{steps[currentStep]?.description}</p>
            )}
          </div>
          <span className="fz14 ff-heading">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="progressbar-style1">
          <div className="progressbar-bg" />
          <div className="progressd-bar" style={{ width: `${progress}%` }}>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <div className="row mb20">
        <div className="col-12">
          <ul className="list-inline mb0">
            {steps.map((step, idx) => (
              <li
                key={step.title}
                className={`list-inline-item me-3 ${
                  idx === currentStep ? "text-thm" : "text-muted"
                }`}
              >
                <span className="fw500">{step.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>{children}</div>

      <div className="d-flex justify-content-between mt30">
        <button
          type="button"
          className="ud-btn btn-white2"
          onClick={onBack}
          disabled={isFirstStep}
        >
          Back
        </button>
        {isLastStep ? (
          <button
            type="button"
            className="ud-btn btn-thm"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
            <i className="fal fa-arrow-right-long ms-2" />
          </button>
        ) : (
          <button
            type="button"
            className="ud-btn btn-thm"
            onClick={onNext}
            disabled={isNextDisabled}
          >
            Next
            <i className="fal fa-arrow-right-long ms-2" />
          </button>
        )}
      </div>
    </div>
  );
}
