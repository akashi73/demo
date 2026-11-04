import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function SkillQuizModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onBadgeAwarded 
}) {
  if (!isOpen) return null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Skill-based questions
  const questions = [
    {
      q: "When diluting industrial chemical detergents for commercial floor scrubbing machines, what is the safest procedure?",
      options: [
        "Always add water first into the tank, then measure and add the chemical concentrate",
        "Pour raw acid directly onto marble and granite floors",
        "Mix bleach with ammonia for a stronger smell",
        "Dilution ratio does not matter for industrial floors"
      ],
      correct: 0
    },
    {
      q: "What is the primary personal protective equipment (PPE) mandatory when handling hazardous waste or deep cleaning restrooms?",
      options: [
        "Casual slippers and sunglasses",
        "Heavy-duty nitrile rubber gloves, mask, and slip-resistant safety shoes",
        "Regular cotton gloves only",
        "No PPE needed if working quickly"
      ],
      correct: 1
    },
    {
      q: "When operating a single-disc scrubbing machine or electrical power tool, what should you inspect first before starting?",
      options: [
        "Check cable insulation for cuts, plug earthing, and ensure the power cord is draped safely over the shoulder",
        "Turn on the machine immediately at maximum RPM",
        "Dip the electric motor in water to cool it",
        "Remove the safety guard for faster operation"
      ],
      correct: 0
    }
  ];

  const handleSelectOption = (idx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: idx
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      onBadgeAwarded();
    }
  };

  const currentQ = questions[currentQuestionIndex];
  const hasSelectedCurrent = selectedAnswers[currentQuestionIndex] !== undefined;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Skill Verification Assessment</h2>
              <p className="text-xs text-slate-500">Earn the Verified Badge to stand out to 100+ recruiters</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          <div className="my-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-blue-600">Practical Safety & Competency</span>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question title */}
            <h3 className="text-sm font-extrabold text-slate-900 leading-snug mb-4">
              {currentQ.q}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all flex items-start gap-3 ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 font-bold ${
                      isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Next action */}
            <div className="mt-6 flex justify-end">
              <button
                disabled={!hasSelectedCurrent}
                onClick={handleNext}
                className={`py-2.5 px-6 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  hasSelectedCurrent
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results screen */
          <div className="my-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Congratulations, {currentUser.name}!</h3>
              <p className="text-xs text-slate-600 mt-1">
                You scored <strong className="text-emerald-700 font-extrabold">3 / 3 (100%)</strong> on the practical skill assessment!
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
              <div className="flex items-center justify-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Verified Skill Badge Awarded
              </div>
              <p className="text-[11px] text-emerald-800">
                Your profile now displays the blue verified checkmark. HR recruiters give 3x more interview calls to verified candidates!
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25"
            >
              Back to Portal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
