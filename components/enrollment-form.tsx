"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { enrollStudent } from "@/app/actions/enroll";
import { toast } from "sonner";
import { CheckCircle2, Rocket, ArrowRight, ShieldCheck } from "lucide-react";
import { pricingPlans } from "@/lib/pricing-plans";

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
  // Section 8: Payment details
  cardholderName: z.string().min(2, "Required"),
  cardNumber: z.string().min(12, "Invalid card number"),
  cardExpiry: z.string().min(4, "Invalid expiry"),
  cardCvc: z.string().min(3, "Invalid CVC"),
  // Section 9: Agreements
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
  const totalSteps = 9;
  const searchParams = useSearchParams();

  const defaultPlan = useMemo(() => {
    const plan = searchParams.get("plan") || "";
    if (["SmallGroup", "OneOnOne"].includes(plan)) {
      return plan as "SmallGroup" | "OneOnOne";
    }
    return "";
  }, [searchParams]);

  // Arriving with a plan already chosen (e.g. from the pricing section) skips the reveal step.
  const [formVisible, setFormVisible] = useState(() => Boolean(defaultPlan));

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planSelection: defaultPlan,
      agreeTerms: false,
      agreeRefund: false,
    },
  });

  const selectedPlanKey = watch("planSelection") || defaultPlan;
  const selectedPlan = pricingPlans.find((plan) => plan.key === selectedPlanKey);

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
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
      <div className="rounded-2xl md:rounded-4xl border border-white/10 bg-[#102010] p-12 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#7FFF00]/20 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-[#7FFF00]/50">
          <CheckCircle2 className="w-10 h-10 text-[#7FFF00]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
          MISSION <span className="text-[#7FFF00] italic">ACCEPTED</span>
        </h2>
        <p className="text-[#B4CCB4] text-lg max-w-xl mx-auto mb-12">
          Your enrollment dossier has been successfully uploaded to the central Command Terminal.
          We have dispatched an onboarding pack to your email.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <div className="p-6 rounded-xl border border-white/10 bg-[#0F1F0F] text-left">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#7FFF00]" />
              <h4 className="font-bold text-white text-sm uppercase">Secure Identity</h4>
            </div>
            <p className="text-xs text-[#B4CCB4] leading-relaxed italic">
              A temporary parent account has been created. Check your email for access credentials and mission briefing.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-[#0F1F0F] text-left">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="w-5 h-5 text-[#7FFF00]" />
              <h4 className="font-bold text-white text-sm uppercase">Next Objective</h4>
            </div>
            <p className="text-xs text-[#B4CCB4] leading-relaxed">
              Login to your student portal to complete technical diagnostics and finalize your payment to unlock full access.
            </p>
          </div>
        </div>

        <button
          onClick={() => window.location.href = "/login"}
          className="group px-12 py-5 bg-[#7FFF00] text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(127,255,0,0.5)] flex items-center gap-3 mx-auto"
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// PARENT_GUARDIAN_INFO</h3>
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// STUDENT_INFO</h3>
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// PROGRAM_PREFERENCES</h3>
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// TECH_ACCESS</h3>
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// EMERGENCY_&_NEEDS</h3>
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// GOALS_&_EXPECTATIONS</h3>
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
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// PLAN_SELECTION</h3>
            <div className="grid gap-6">
              <Select label="Select your plan" {...register("planSelection")}>
                <option value="">Select...</option>
                <option value="SmallGroup">Small Group - $150</option>
                <option value="OneOnOne">1-on-1 - $200</option>
              </Select>
              <Input label="Promo / Discount Code" {...register("promoCode")} />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline text-white uppercase tracking-widest">// PAYMENT_DETAILS</h3>
            <p className="text-sm leading-7 text-[#B4CCB4]">
              Enter card details securely below. The next step confirms your agreement before sending the payment request to Stripe.
            </p>
            <div className="grid gap-6">
              <Input label="Name on card" {...register("cardholderName")} error={errors.cardholderName?.message} />
              <Input label="Card number" {...register("cardNumber")} error={errors.cardNumber?.message} />
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Expiry (MM/YY)" {...register("cardExpiry")} error={errors.cardExpiry?.message} />
                <Input label="CVC" {...register("cardCvc")} error={errors.cardCvc?.message} />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0F1F0F] p-5 text-sm text-[#B4CCB4]">
              <p className="font-semibold text-white">Stripe-style checkout</p>
              <p className="mt-2">We are prepared to pass these card details securely to Stripe. Card data is not stored on this site, and payment processing is handled through Stripe's secure flow.</p>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-10">
            <h3 className="text-lg md:text-xl font-bold font-headline text-white uppercase tracking-widest">// FINAL_AGREEMENTS</h3>
            <div className="space-y-6">
              <Checkbox label="I agree to the cyber4every1 Terms & Conditions" {...register("agreeTerms")} />
              <Checkbox label="I agree to the Refund Policy" {...register("agreeRefund")} />
              <Checkbox label="Permission to share student work for education" {...register("shareWork")} />
              <Checkbox label="Receive weekly progress emails" {...register("weeklyProgress")} />
            </div>

            <div className="rounded-3xl border border-[#7FFF00]/30 bg-[#7FFF00]/5 p-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7FFF00]/15 text-lg">
                  📬
                </span>
                <div className="flex-1 space-y-2">
                  <p className="font-bold text-white">Stay in the loop</p>
                  <p className="text-sm leading-relaxed text-[#B4CCB4]">
                    Get occasional emails about new program tracks, cohort openings, and family resources. No spam, unsubscribe anytime.
                  </p>
                  <Checkbox label="Add me to the parent newsletter" {...register("newsletter")} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!formVisible) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-4xl border border-white/10 bg-[#071007]/90 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7FFF00]/30 bg-[#7FFF00]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">
              <span className="h-2 w-2 rounded-full bg-[#7FFF00] animate-pulse" />
              Enrollment hidden by default
            </span>
            <h2 className="text-3xl font-black text-white">Ready when you are.</h2>
            <p className="max-w-3xl text-sm leading-7 text-[#B4CCB4]">
              The form stays tucked out of the way until you're ready to enroll. This keeps the page clean, with the program story and payment preview up front.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0F1F0F] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#6A8A6A]">Step 1</p>
                <p className="mt-3 font-black text-white">Reveal the form</p>
                <p className="mt-2 text-sm text-[#B4CCB4]">Start the registration process when you are ready.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#0F1F0F] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#6A8A6A]">Step 2</p>
                <p className="mt-3 font-black text-white">Complete secure payment</p>
                <p className="mt-2 text-sm text-[#B4CCB4]">A Stripe-style card entry section appears when you continue.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFormVisible(true)}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#7FFF00] px-10 py-4 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(127,255,0,0.3)] transition hover:bg-[#75d400]"
            >
              Reveal enrollment form
            </button>
          </div>
        </div>

        <aside className="space-y-6 rounded-4xl border border-white/10 bg-[#0A140A] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">Form preview</div>
            <h2 className="text-3xl font-black text-white">Step-by-step registration</h2>
            <p className="text-sm leading-7 text-[#B4CCB4]">The enrollment form is kept hidden until you are ready to begin. When revealed, it walks you through every critical detail.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#09170A] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6A8A6A]">Sections included</p>
            <ul className="mt-4 space-y-3 text-sm text-[#D6E6D6]">
              <li>• Parent + guardian details</li>
              <li>• Student profile</li>
              <li>• Program preference selection</li>
              <li>• Computer & internet readiness</li>
              <li>• Emergency contact</li>
              <li>• Card payment details</li>
              <li>• Final agreement review</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#071007] p-6 text-sm text-[#B4CCB4]">
            <p className="font-semibold text-white">Secure checkout</p>
            <p className="mt-3">Credit card details are collected in a Stripe-style section and are ready for secure processing.</p>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-white/10 bg-[#102010] p-6 shadow-2xl md:rounded-4xl md:p-12">
        {/* Stepper */}
        <div className="mb-12 flex justify-between items-center max-w-2xl mx-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 mx-1 rounded-full transition-all duration-500 ${
                i + 1 <= step ? "bg-[#7FFF00]" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="min-h-100">
          {renderStep()}

          <div className="mt-12 flex justify-between items-center flex-wrap gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-widest transition-all text-xs md:text-base ${
                step === 1 ? "opacity-0 pointer-events-none" : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Previous
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 md:px-12 py-3 md:py-4 bg-[#7FFF00] text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(127,255,0,0.3)] text-xs md:text-base"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 md:px-12 py-3 md:py-4 bg-[#7FFF00] text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(127,255,0,0.5)] text-xs md:text-base flex items-center gap-3"
              >
                {isSubmitting ? "SYNCING..." : "Initialize Enrollment"}
                {!isSubmitting && <Rocket className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            )}
          </div>
        </form>
      </div>

      <aside className="space-y-6 rounded-4xl border border-white/10 bg-[#0A140A] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">Current Plan</div>
          <h2 className="text-3xl font-black text-white">{selectedPlan ? selectedPlan.title : "Choose your plan"}</h2>
          <p className="text-sm leading-7 text-[#B4CCB4]">
            {selectedPlan ? selectedPlan.description : "Select a plan below to see your package details and secure checkout path."}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#09170A] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#6A8A6A]">Package</p>
              <p className="mt-2 text-xl font-black text-white">{selectedPlan?.price ?? "—"}</p>
            </div>
            <span className="inline-flex rounded-full bg-[#7FFF00]/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#7FFF00]">
              {selectedPlan ? "Ready" : "Pending"}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {selectedPlan ? selectedPlan.highlights.map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-sm text-[#D6E6D6]">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7FFF00]/20 text-[#7FFF00] text-xs font-black">✓</span>
                <span>{feature}</span>
              </div>
            )) : (
              <p className="text-sm text-[#6A8A6A]">Your chosen package will appear here as you select a plan.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#071007] p-6 text-sm text-[#B4CCB4]">
          <p className="font-semibold text-white">What happens next</p>
          <ul className="mt-4 space-y-3 text-sm leading-7">
            <li>1. Complete the enrollment form fields in each section.</li>
            <li>2. Confirm the selected plan and apply any promo code.</li>
            <li>3. Finish enrollment and proceed to secure Stripe payment.</li>
            <li>4. Receive confirmation and access instructions by email.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#071007] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#7FFF00]">Secure checkout</p>
          <p className="mt-3 text-sm leading-7 text-[#B4CCB4]">
            We use Stripe for secure payments. No card data is stored on our site, and every payment is encrypted end-to-end.
          </p>
        </div>
      </aside>
    </div>
  );
}

// Subcomponents for cleaner code
const Input = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => (
  <div className="group/input">
    <label className="block text-[10px] font-bold text-[#6A8A6A] uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-[#7FFF00] transition-colors">
      {label}
    </label>
    <input 
      ref={ref}
      {...props}
      className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white placeholder:text-white/20 focus:ring-0 focus:border-[#7FFF00] transition-all duration-300 font-headline tracking-wide"
    />
    {error && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{error}</p>}
  </div>
));
Input.displayName = "Input";

const Select = React.forwardRef<HTMLSelectElement, any>(({ label, error, children, ...props }, ref) => (
  <div className="group/input">
    <label className="block text-[10px] font-bold text-[#6A8A6A] uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-[#7FFF00] transition-colors">
      {label}
    </label>
    <select 
      ref={ref}
      {...props}
      className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white focus:ring-0 focus:border-[#7FFF00] transition-all duration-300 font-headline [&>option]:bg-[#102010] [&>option]:text-white"
    >
      {children}
    </select>
    {error && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{error}</p>}
  </div>
));
Select.displayName = "Select";

const TextArea = React.forwardRef<HTMLTextAreaElement, any>(({ label, error, ...props }, ref) => (
  <div className="group/input">
    <label className="block text-[10px] font-bold text-[#6A8A6A] uppercase tracking-[0.2em] mb-2 group-focus-within/input:text-[#7FFF00] transition-colors">
      {label}
    </label>
    <textarea 
      ref={ref}
      {...props}
      rows={3}
      className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-white placeholder:text-white/20 focus:ring-0 focus:border-[#7FFF00] transition-all duration-300 font-headline resize-none"
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
        className="peer appearance-none w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-[#7FFF00] checked:border-[#7FFF00] transition-all"
      />
      <span className="material-symbols-outlined text-black text-xs absolute opacity-0 peer-checked:opacity-100 transition-opacity">
        check
      </span>
    </div>
    <span className="text-sm text-[#B4CCB4] group-hover:text-white transition-colors">{label}</span>
  </label>
));
Checkbox.displayName = "Checkbox";
