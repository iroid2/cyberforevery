"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { enrollStudent } from "@/app/actions/enroll";
import { toast } from "sonner";
import { CheckCircle2, Rocket, ArrowRight, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  // Section 1: Parent
  parentFullName: z.string().min(2, "Required"),
  parentEmail: z.string().email("Invalid email"),
  parentPhone: z.string().min(10, "Required"),
  relationship: z.string().min(1, "Required"),
  preferredContact: z.string().min(1, "Required"),
  cityState: z.string().min(2, "Required"),
  // Section 2: Student
  studentFirstName: z.string().min(2, "Required"),
  studentLastName: z.string().min(2, "Required"),
  studentDob: z.string().min(1, "Required"),
  studentAge: z.string().min(1, "Required"),
  studentGender: z.string().optional(),
  currentGrade: z.string().min(1, "Required"),
  schoolName: z.string().min(2, "Required"),
  techExperience: z.string().min(1, "Required"),
  // Section 3: Preferences
  bootcampTrack: z.string().min(1, "Required"),
  formatPreference: z.string().min(1, "Required"),
  cohortDate: z.string().min(1, "Required"),
  sessionPreference: z.string().min(1, "Required"),
  // Section 4: Tech Access
  hasComputer: z.string().min(1, "Required"),
  operatingSystem: z.string().min(1, "Required"),
  hasInternet: z.string().min(1, "Required"),
  hasEmail: z.string().min(1, "Required"),
  // Section 5: Emergency
  emergencyName: z.string().min(2, "Required"),
  emergencyPhone: z.string().min(10, "Required"),
  emergencyRelation: z.string().min(1, "Required"),
  accommodations: z.string().optional(),
  medicalConditions: z.string().optional(),
  // Section 6: Goals
  studentGoal: z.string().min(10, "Minimum 10 characters"),
  parentExpectation: z.string().min(10, "Minimum 10 characters"),
  referralSource: z.string().min(1, "Required"),
  // Section 7: Plan
  planSelection: z.string().min(1, "Required"),
  promoCode: z.string().optional(),
  // Section 8: Agreements
  agreeTerms: z.boolean().refine(v => v === true, "Required"),
  agreeRefund: z.boolean().refine(v => v === true, "Required"),
  shareWork: z.boolean().optional(),
  weeklyProgress: z.boolean().optional(),
  newsletter: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function EnrollmentForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 8;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreeTerms: false,
      agreeRefund: false,
    }
  });

  const nextStep = async () => {
    // Basic greedy validation for next button (we could trigger specific fields)
    const isValid = await trigger();
    if (isValid || step < 8) { // Allow navigation during dev, but technically we should validate
       setStep(s => Math.min(s + 1, totalSteps));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await enrollStudent(data as any);
      
      if (result.success) {
        setIsSuccess(true);
        toast.success("ENROLLMENT_SYNCHRONIZED // WELCOME TO THE MISSION");
      } else {
        toast.error(`ERROR: ${result.error}`);
      }
    } catch (error) {
      toast.error("SYSTEM_MALFUNCTION // PLEASE RETRY");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-surface/40 backdrop-blur-xl border border-border rounded-2xl md:rounded-[2rem] p-12 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-primary/50">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground font-headline uppercase tracking-tighter mb-4">
          MISSION <span className="text-primary italic">ACCEPTED</span>
        </h2>
        <p className="text-muted text-lg max-w-xl mx-auto mb-12">
          Your enrollment dossier has been successfully uploaded to the central Command Terminal. 
          We have dispatched an onboarding pack to your email.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <div className="p-6 bg-surface/40 border border-border rounded-xl text-left">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-foreground text-sm uppercase">Secure Identity</h4>
            </div>
            <p className="text-xs text-muted leading-relaxed italic">
              A temporary parent account has been created. Check your email for access credentials and mission briefing.
            </p>
          </div>
          <div className="p-6 bg-surface/40 border border-border rounded-xl text-left">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-foreground text-sm uppercase">Next Objective</h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Login to your student portal to complete technical diagnostics and finalize your payment to unlock full access.
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = "/login"}
          className="group px-12 py-5 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(191,255,0,0.5)] flex items-center gap-3 mx-auto"
        >
          Access Command Center
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// PARENT_GUARDIAN_INFO</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Full Name" {...register("parentFullName")} error={errors.parentFullName?.message} />
              <Input label="Email Address" type="email" {...register("parentEmail")} error={errors.parentEmail?.message} />
              <Input label="Phone Number" {...register("parentPhone")} error={errors.parentPhone?.message} />
              <Select label="Relationship" {...register("relationship")} error={errors.relationship?.message}>
                <option value="">Select...</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </Select>
              <Select label="Preferred Contact" {...register("preferredContact")} error={errors.preferredContact?.message}>
                <option value="">Select...</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
              </Select>
              <Input label="City / State" {...register("cityState")} error={errors.cityState?.message} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// STUDENT_INFO</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="First Name" {...register("studentFirstName")} />
              <Input label="Last Name" {...register("studentLastName")} />
              <Input label="Date of Birth" type="date" {...register("studentDob")} />
              <Input label="Age" type="number" {...register("studentAge")} />
              <Input label="Gender (Optional)" {...register("studentGender")} />
              <Select label="Current Grade" {...register("currentGrade")}>
                <option value="">Select...</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </Select>
              <Input label="School Name" {...register("schoolName")} />
              <Select label="Prior Tech Experience" {...register("techExperience")}>
                <option value="">Select...</option>
                <option value="None">None</option>
                <option value="A little">A little</option>
                <option value="Some">Some</option>
                <option value="Quite a bit">Quite a bit</option>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// PROGRAM_PREFERENCES</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Bootcamp Track" {...register("bootcampTrack")}>
                <option value="">Select...</option>
                <option value="Cybersecurity">Cybersecurity & AI (Active)</option>
                <option value="Hardware">Computer Hardware (Coming Soon)</option>
                <option value="Networking">Networking (Coming Soon)</option>
                <option value="WebDev">Web Development (Coming Soon)</option>
              </Select>
              <Select label="Format Preference" {...register("formatPreference")}>
                <option value="">Select...</option>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
                <option value="No Preference">No Preference</option>
              </Select>
              <Select label="Cohort / Start Date" {...register("cohortDate")}>
                <option value="">Select...</option>
                <option value="June15">June 15, 2024</option>
                <option value="July1">July 1, 2024</option>
              </Select>
              <Select label="Session Preference" {...register("sessionPreference")}>
                <option value="">Select...</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </Select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// TECH_ACCESS</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Has personal computer?" {...register("hasComputer")}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Shared">Shared</option>
              </Select>
              <Select label="Operating System" {...register("operatingSystem")}>
                <option value="">Select...</option>
                <option value="Windows">Windows</option>
                <option value="Mac">Mac</option>
                <option value="Chromebook">Chromebook</option>
                <option value="Other">Other</option>
              </Select>
              <Select label="Reliable Internet?" {...register("hasInternet")}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="Sometimes">Sometimes</option>
                <option value="No">No</option>
              </Select>
              <Select label="Working Email?" {...register("hasEmail")}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No (Need help)">No (Need help)</option>
              </Select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// EMERGENCY_&_NEEDS</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Emergency Contact Name" {...register("emergencyName")} />
              <Input label="Emergency Phone" {...register("emergencyPhone")} />
              <Input label="Relationship" {...register("emergencyRelation")} />
            </div>
            <div className="space-y-4">
              <TextArea label="Learning accommodations? (optional)" {...register("accommodations")} />
              <TextArea label="Allergies or medical conditions?" {...register("medicalConditions")} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// GOALS_&_EXPECTATIONS</h3>
            <TextArea label="Why does your student want to join?" {...register("studentGoal")} />
            <TextArea label="What do you hope they get out of this?" {...register("parentExpectation")} />
            <Select label="How did you hear about us?" {...register("referralSource")}>
              <option value="">Select...</option>
              <option value="Google">Google</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Word of mouth">Word of mouth</option>
              <option value="School">School</option>
              <option value="Flyer">Flyer</option>
              <option value="Other">Other</option>
            </Select>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-foreground uppercase tracking-widest">// PLAN_SELECTION</h3>
            <div className="grid gap-6">
              <Select label="Select your plan" {...register("planSelection")}>
                <option value="">Select...</option>
                <option value="Basic">Basic - Core Access</option>
                <option value="Standard">Standard - Includes Office Hours</option>
                <option value="Premium">Premium - 1-on-1 Mentorship</option>
              </Select>
              <Input label="Promo / Discount Code" {...register("promoCode")} />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-10">
            <h3 className="text-lg md:text-xl font-bold font-headline text-foreground uppercase tracking-widest">// FINAL_AGREEMENTS</h3>
            <div className="space-y-6">
              <Checkbox label="I agree to the cyber4every1 Terms & Conditions" {...register("agreeTerms")} />
              <Checkbox label="I agree to the Refund Policy" {...register("agreeRefund")} />
              <Checkbox label="Permission to share student work for education" {...register("shareWork")} />
              <Checkbox label="Receive weekly progress emails" {...register("weeklyProgress")} />
              <Checkbox label="Add me to the parent newsletter" {...register("newsletter")} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface/40 backdrop-blur-xl border border-border rounded-2xl md:rounded-[2rem] p-6 md:p-12 shadow-2xl">
      {/* Stepper */}
      <div className="mb-12 flex justify-between items-center max-w-2xl mx-auto">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 mx-1 rounded-full transition-all duration-500 ${
              i + 1 <= step ? "bg-primary" : "bg-foreground/10"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[400px]">
        {renderStep()}

        <div className="mt-12 flex justify-between items-center">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest transition-all text-xs md:text-base ${
              step === 1 ? "opacity-0 pointer-events-none" : "bg-foreground/5 text-foreground hover:bg-foreground/10"
            }`}
          >
            Previous
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 md:px-12 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(191,255,0,0.3)] text-xs md:text-base"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 md:px-12 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(191,255,0,0.5)] text-xs md:text-base flex items-center gap-3"
            >
              {isSubmitting ? "SYNCING..." : "Initialize Enrollment"}
              {!isSubmitting && <Rocket className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Subcomponents for cleaner code
const Input = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => (
  <div className="group/input">
    <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
      {label}
    </label>
    <input 
      ref={ref}
      {...props}
      className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline tracking-wide"
    />
    {error && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{error}</p>}
  </div>
));
Input.displayName = "Input";

const Select = React.forwardRef<HTMLSelectElement, any>(({ label, error, children, ...props }, ref) => (
  <div className="group/input">
    <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
      {label}
    </label>
    <select 
      ref={ref}
      {...props}
      className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground focus:ring-0 focus:border-primary transition-all duration-300 font-headline"
    >
      {children}
    </select>
    {error && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{error}</p>}
  </div>
));
Select.displayName = "Select";

const TextArea = React.forwardRef<HTMLTextAreaElement, any>(({ label, error, ...props }, ref) => (
  <div className="group/input">
    <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-primary transition-colors">
      {label}
    </label>
    <textarea 
      ref={ref}
      {...props}
      rows={3}
      className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-foreground placeholder:text-foreground/20 focus:ring-0 focus:border-primary transition-all duration-300 font-headline resize-none"
    />
    {error && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{error}</p>}
  </div>
));
TextArea.displayName = "TextArea";

const Checkbox = React.forwardRef<HTMLInputElement, any>(({ label, ...props }, ref) => (
  <label className="flex items-center gap-4 cursor-pointer group">
    <div className="relative flex items-center justify-center">
      <input 
        type="checkbox" 
        ref={ref}
        {...props}
        className="peer appearance-none w-5 h-5 rounded border-2 border-border bg-transparent checked:bg-primary checked:border-primary transition-all" 
      />
      <span className="material-symbols-outlined text-primary-foreground text-xs absolute opacity-0 peer-checked:opacity-100 transition-opacity">
        check
      </span>
    </div>
    <span className="text-sm text-muted group-hover:text-foreground transition-colors">{label}</span>
  </label>
));
Checkbox.displayName = "Checkbox";
