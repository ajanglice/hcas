import React, { useState } from 'react';
import './RWEvsRCTTool.css'; // Create this CSS file for the styles

const RWEvsRCTTool = () => {
  const [activeTab, setActiveTab] = useState('comparison');
  const [questionResponses, setQuestionResponses] = useState({
    researchQuestion: '',
    populationType: '',
    sampleSize: '',
    timeConstraints: '',
    budgetConstraints: '',
    ethicalConcerns: '',
    outcomeOfInterest: '',
    interventionType: '',
    dataAvailability: '',
    regulatoryNeeds: ''
  });
  
  const [decisionResult, setDecisionResult] = useState(null);
  const [showDecisionResult, setShowDecisionResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Characteristics for comparison table
  const characteristics = [
    {
      feature: 'Study Design',
      rct: 'Randomized allocation to intervention or control, often with blinding',
      rwe: 'Non-randomized, observational designs using existing data sources or pragmatic trials'
    },
    {
      feature: 'Patient Population',
      rct: 'Highly selected, strict inclusion/exclusion criteria',
      rwe: 'Broader, more representative of real-world patients'
    },
    {
      feature: 'Internal Validity',
      rct: 'High - controlled environment minimizes bias',
      rwe: 'Lower - more vulnerable to confounding and bias'
    },
    {
      feature: 'External Validity',
      rct: 'Limited - may not generalize well to real-world settings',
      rwe: 'Higher - better represents actual clinical practice'
    },
    {
      feature: 'Sample Size',
      rct: 'Usually smaller (hundreds to thousands)',
      rwe: 'Can be very large (thousands to millions)'
    },
    {
      feature: 'Follow-up Duration',
      rct: 'Typically shorter (weeks to months)',
      rwe: 'Can be longer (months to years or decades)'
    },
    {
      feature: 'Cost',
      rct: 'Higher - often $5-20+ million',
      rwe: 'Lower - often $100K-$5 million'
    },
    {
      feature: 'Time to Completion',
      rct: '1-10 years (average ~5-7 years)',
      rwe: 'Months to years (average ~1-3 years)'
    },
    {
      feature: 'Regulatory Acceptance',
      rct: 'Gold standard for approval of new treatments',
      rwe: 'Growing acceptance as complementary evidence; used for label expansions'
    },
    {
      feature: 'Primary Use Cases',
      rct: 'Efficacy, safety for initial approval, causality',
      rwe: 'Effectiveness, safety monitoring, utilization patterns, rare events, long-term outcomes'
    }
  ];
  
  // Case examples
  const caseExamples = [
    {
      title: 'Traditional Approach: RCT for Initial Drug Approval',
      description: 'A pharmaceutical company developing a novel type 2 diabetes medication conducted a multi-center, double-blind RCT with 1,200 patients. The study demonstrated efficacy in HbA1c reduction compared to placebo over 52 weeks, supporting FDA approval.',
      strengths: [
        'Clear demonstration of causal relationship between drug and outcome',
        'Minimized bias through randomization and blinding',
        'Provided robust safety and efficacy data for regulatory submission'
      ],
      limitations: [
        'Study excluded patients with common comorbidities like kidney disease',
        'High cost (~$18 million) and long duration (6 years from design to completion)',
        'Uncertain effectiveness in real-world clinical practice'
      ],
      icon: '🔬',
      type: 'rct'
    },
    {
      title: 'Complementary Approach: RWE for Post-Approval Monitoring',
      description: 'Following approval of the diabetes medication, the company partnered with a large health system to analyze EHR data from 28,000 patients prescribed the medication in routine practice. This RWE study identified effectiveness patterns across diverse patient subgroups over 3 years.',
      strengths: [
        'Identified effectiveness in patient populations excluded from the original RCT',
        'Detected rare adverse events not captured in the RCT',
        'Provided insights on medication adherence and real-world dosing patterns'
      ],
      limitations: [
        'Potential confounding from non-random treatment assignment',
        'Missing data issues in the EHR dataset',
        'Inability to definitively establish causality for observed outcomes'
      ],
      icon: '📊',
      type: 'rwe'
    },
    {
      title: 'Hybrid Approach: Pragmatic Clinical Trial',
      description: 'A health system implemented a pragmatic trial comparing the diabetes medication to standard of care within their network. The study used existing EHR infrastructure, simplified enrollment criteria, and collected patient-reported outcomes through a mobile app.',
      strengths: [
        'Maintained randomization while reflecting routine clinical practice',
        'Lower cost than traditional RCT ($3.2 million)',
        'Included patient-centered outcomes not typically captured in RCTs',
        'Results more readily generalizable to clinical practice'
      ],
      limitations: [
        'Less control over protocol adherence than traditional RCT',
        'Some data quality and completeness challenges',
        'Required institutional commitment to research infrastructure'
      ],
      icon: '🔄',
      type: 'hybrid'
    }
  ];
  
  // Decision tool questions
  const decisionQuestions = [
    {
      id: 'researchQuestion',
      question: 'What is your primary research objective?',
      options: [
        { value: 'efficacy', label: 'Establish efficacy of a new intervention' },
        { value: 'effectiveness', label: 'Determine real-world effectiveness' },
        { value: 'safety', label: 'Monitor long-term safety' },
        { value: 'comparison', label: 'Compare treatments used in practice' },
        { value: 'utilization', label: 'Understand utilization patterns' }
      ]
    },
    {
      id: 'populationType',
      question: 'What type of population do you need to study?',
      options: [
        { value: 'specific', label: 'Highly specific, controlled population' },
        { value: 'representative', label: 'Representative of typical patients' },
        { value: 'diverse', label: 'Diverse population with multiple comorbidities' },
        { value: 'rare', label: 'Patients with rare conditions' }
      ]
    },
    {
      id: 'sampleSize',
      question: 'How many participants do you need or can you reasonably include?',
      options: [
        { value: 'small', label: 'Small (dozens to hundreds)' },
        { value: 'medium', label: 'Medium (hundreds to few thousand)' },
        { value: 'large', label: 'Large (many thousands)' },
        { value: 'very_large', label: 'Very large (hundreds of thousands or millions)' }
      ]
    },
    {
      id: 'timeConstraints',
      question: 'What is your timeframe for completion?',
      options: [
        { value: 'short', label: 'Less than 1 year' },
        { value: 'medium', label: '1-3 years' },
        { value: 'long', label: '3-5 years' },
        { value: 'very_long', label: '5+ years' }
      ]
    },
    {
      id: 'budgetConstraints',
      question: 'What is your approximate budget range?',
      options: [
        { value: 'low', label: 'Low (<$500K)' },
        { value: 'medium', label: 'Medium ($500K-$3M)' },
        { value: 'high', label: 'High ($3M-$10M)' },
        { value: 'very_high', label: 'Very high (>$10M)' }
      ]
    },
    {
      id: 'ethicalConcerns',
      question: 'Are there significant ethical concerns with randomization?',
      options: [
        { value: 'none', label: 'No ethical concerns with randomization' },
        { value: 'some', label: 'Some concerns but potentially manageable' },
        { value: 'significant', label: 'Significant concerns that limit randomization' },
        { value: 'prohibitive', label: 'Ethical issues prohibit randomization' }
      ]
    },
    {
      id: 'outcomeOfInterest',
      question: 'What types of outcomes are you primarily interested in?',
      options: [
        { value: 'short_term', label: 'Short-term clinical outcomes' },
        { value: 'long_term', label: 'Long-term outcomes (years)' },
        { value: 'rare', label: 'Rare events or complications' },
        { value: 'patient_reported', label: 'Patient-reported outcomes' },
        { value: 'economic', label: 'Economic or utilization outcomes' }
      ]
    },
    {
      id: 'interventionType',
      question: 'What type of intervention are you studying?',
      options: [
        { value: 'new_drug', label: 'New drug or device for initial approval' },
        { value: 'approved_drug', label: 'Already approved drug in new population' },
        { value: 'behavioral', label: 'Behavioral or lifestyle intervention' },
        { value: 'system', label: 'Health system or policy change' }
      ]
    },
    {
      id: 'dataAvailability',
      question: 'What existing data sources are available to you?',
      options: [
        { value: 'none', label: 'No existing relevant data' },
        { value: 'limited', label: 'Limited existing data' },
        { value: 'moderate', label: 'Moderate amount of relevant existing data' },
        { value: 'extensive', label: 'Extensive, high-quality existing data' }
      ]
    },
    {
      id: 'regulatoryNeeds',
      question: 'What are your regulatory or approval needs?',
      options: [
        { value: 'initial_approval', label: 'Initial regulatory approval' },
        { value: 'label_expansion', label: 'Label expansion or new indication' },
        { value: 'post_market', label: 'Post-market requirements' },
        { value: 'none', label: 'No specific regulatory requirements' }
      ]
    }
  ];
  
  const handleResponseChange = (questionId, value) => {
    setQuestionResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < decisionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const analyzeResponses = () => {
    // Score system where positive values favor RCTs and negative values favor RWE
    let score = 0;
    
    // Research question
    if (questionResponses.researchQuestion === 'efficacy') score += 5;
    if (questionResponses.researchQuestion === 'effectiveness') score -= 3;
    if (questionResponses.researchQuestion === 'safety') score -= 2;
    if (questionResponses.researchQuestion === 'comparison') score -= 1;
    if (questionResponses.researchQuestion === 'utilization') score -= 4;
    
    // Population type
    if (questionResponses.populationType === 'specific') score += 3;
    if (questionResponses.populationType === 'representative') score -= 2;
    if (questionResponses.populationType === 'diverse') score -= 4;
    if (questionResponses.populationType === 'rare') score -= 3;
    
    // Sample size
    if (questionResponses.sampleSize === 'small') score += 2;
    if (questionResponses.sampleSize === 'medium') score += 1;
    if (questionResponses.sampleSize === 'large') score -= 2;
    if (questionResponses.sampleSize === 'very_large') score -= 4;
    
    // Time constraints
    if (questionResponses.timeConstraints === 'short') score -= 4;
    if (questionResponses.timeConstraints === 'medium') score -= 2;
    if (questionResponses.timeConstraints === 'long') score += 2;
    if (questionResponses.timeConstraints === 'very_long') score += 4;
    
    // Budget constraints
    if (questionResponses.budgetConstraints === 'low') score -= 5;
    if (questionResponses.budgetConstraints === 'medium') score -= 2;
    if (questionResponses.budgetConstraints === 'high') score += 2;
    if (questionResponses.budgetConstraints === 'very_high') score += 4;
    
    // Ethical concerns
    if (questionResponses.ethicalConcerns === 'none') score += 3;
    if (questionResponses.ethicalConcerns === 'some') score += 1;
    if (questionResponses.ethicalConcerns === 'significant') score -= 3;
    if (questionResponses.ethicalConcerns === 'prohibitive') score -= 5;
    
    // Outcome of interest
    if (questionResponses.outcomeOfInterest === 'short_term') score += 3;
    if (questionResponses.outcomeOfInterest === 'long_term') score -= 3;
    if (questionResponses.outcomeOfInterest === 'rare') score -= 4;
    if (questionResponses.outcomeOfInterest === 'patient_reported') score -= 1;
    if (questionResponses.outcomeOfInterest === 'economic') score -= 3;
    
    // Intervention type
    if (questionResponses.interventionType === 'new_drug') score += 5;
    if (questionResponses.interventionType === 'approved_drug') score += 1;
    if (questionResponses.interventionType === 'behavioral') score -= 1;
    if (questionResponses.interventionType === 'system') score -= 3;
    
    // Data availability
    if (questionResponses.dataAvailability === 'none') score += 3;
    if (questionResponses.dataAvailability === 'limited') score += 1;
    if (questionResponses.dataAvailability === 'moderate') score -= 2;
    if (questionResponses.dataAvailability === 'extensive') score -= 5;
    
    // Regulatory needs
    if (questionResponses.regulatoryNeeds === 'initial_approval') score += 5;
    if (questionResponses.regulatoryNeeds === 'label_expansion') score += 2;
    if (questionResponses.regulatoryNeeds === 'post_market') score -= 3;
    if (questionResponses.regulatoryNeeds === 'none') score -= 1;
    
    // Determine result
    let result = {
      score: score,
      recommendation: '',
      rationale: '',
      considerations: []
    };
    
    if (score >= 10) {
      result.recommendation = 'Traditional RCT';
      result.rationale = 'Your needs strongly align with the strengths of randomized controlled trials.';
      result.considerations = [
        'Consider whether high internal validity is essential to your research question',
        'Evaluate if the resource investment is justified by your research aims',
        'Consider if a pragmatic RCT design might address some RCT limitations'
      ];
    } else if (score >= 3) {
      result.recommendation = 'RCT with pragmatic elements';
      result.rationale = 'A randomized design is appropriate, but with modifications to increase real-world applicability.';
      result.considerations = [
        'Consider simplified inclusion criteria to improve generalizability',
        'Explore embedding your trial within routine clinical care',
        'Consider supplementing with RWE for long-term follow-up'
      ];
    } else if (score >= -3) {
      result.recommendation = 'Hybrid approach';
      result.rationale = 'A combination of randomized and real-world evidence approaches may be optimal.';
      result.considerations = [
        'Consider a pragmatic clinical trial with broader inclusion criteria',
        'Explore a sequential approach: small RCT followed by RWE extension',
        'Consider a registry-based randomized trial design'
      ];
    } else if (score >= -10) {
      result.recommendation = 'Real-world evidence study with enhanced controls';
      result.rationale = 'A real-world design with methodological controls for confounding is appropriate.';
      result.considerations = [
        'Consider advanced methods like propensity score matching',
        'Implement rigorous outcome validation procedures',
        'Document and address potential sources of bias'
      ];
    } else {
      result.recommendation = 'Pure real-world evidence approach';
      result.rationale = 'Your scenario is highly suited to a real-world evidence approach.';
      result.considerations = [
        'Focus on data quality and completeness validation',
        'Consider multiple data sources to strengthen findings',
        'Document analytical decisions carefully for transparency'
      ];
    }
    
    setDecisionResult(result);
    setShowDecisionResult(true);
  };
  
  const renderComparisonTab = () => {
    return (
      <div className="comparison-tab">
        <h3>RCT vs RWE Comparison</h3>
        <p className="tab-description">
          Randomized Controlled Trials (RCTs) and Real-World Evidence (RWE) studies each have unique strengths and limitations.
          This comparison helps you understand which approach might be more suitable for different research objectives.
        </p>
        
        <div className="comparison-visual">
          <div className="comparison-approach rct">
            <div className="approach-icon">🔬</div>
            <h4>Randomized Controlled Trials</h4>
            <p>Experimental studies with controlled conditions and random assignment</p>
          </div>
          <div className="comparison-approach hybrid">
            <div className="approach-icon">🔄</div>
            <h4>Hybrid Approaches</h4>
            <p>Pragmatic trials and designs combining elements of both</p>
          </div>
          <div className="comparison-approach rwe">
            <div className="approach-icon">📊</div>
            <h4>Real-World Evidence</h4>
            <p>Observational studies using data from routine clinical practice</p>
          </div>
        </div>
        
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th className="feature-header">Feature</th>
                <th className="rct-header">Randomized Controlled Trials</th>
                <th className="rwe-header">Real-World Evidence Studies</th>
              </tr>
            </thead>
            <tbody>
              {characteristics.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="feature-cell">{item.feature}</td>
                  <td className="rct-cell">{item.rct}</td>
                  <td className="rwe-cell">{item.rwe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="comparison-summary">
          <div className="summary-section rct-summary">
            <h4>When to Consider RCTs</h4>
            <ul>
              <li>Initial efficacy and safety evaluation of new interventions</li>
              <li>When establishing causal relationships is critical</li>
              <li>When regulatory approval is the primary goal</li>
              <li>When tight control over variables is essential</li>
              <li>When a clear demonstration of efficacy under ideal conditions is needed</li>
            </ul>
          </div>
          <div className="summary-section rwe-summary">
            <h4>When to Consider RWE</h4>
            <ul>
              <li>Studying effectiveness in routine clinical practice</li>
              <li>Long-term safety monitoring or rare event detection</li>
              <li>When randomization is unethical or impractical</li>
              <li>Understanding treatment patterns or adherence</li>
              <li>Studying diverse populations often excluded from RCTs</li>
              <li>When time or resource constraints prohibit RCTs</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCaseExamplesTab = () => {
    return (
      <div className="case-examples-tab">
        <h3>Case Examples</h3>
        <p className="tab-description">
          These real-world case studies illustrate how different research approaches can be applied in healthcare research.
        </p>
        
        <div className="case-examples-container">
          {caseExamples.map((example, index) => (
            <div key={index} className={`case-example-card ${example.type}`}>
              <div className="case-icon">{example.icon}</div>
              <h4>{example.title}</h4>
              <p className="case-description">{example.description}</p>
              
              <div className="case-details">
                <div className="strengths-section">
                  <h5>Strengths</h5>
                  <ul>
                    {example.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="limitations-section">
                  <h5>Limitations</h5>
                  <ul>
                    {example.limitations.map((limitation, i) => (
                      <li key={i}>{limitation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="key-takeaways">
          <h4>Key Takeaways</h4>
          <ul>
            <li>RCTs and RWE can be complementary rather than competing approaches</li>
            <li>The best research approach depends on the specific research question and context</li>
            <li>Hybrid designs can leverage strengths of both approaches while mitigating limitations</li>
            <li>A sequential approach (RCT followed by RWE) is increasingly common for comprehensive evidence generation</li>
          </ul>
        </div>
      </div>
    );
  };
  
  const renderDecisionToolTab = () => {
    const currentQuestion = decisionQuestions[currentQuestionIndex];
    
    return (
      <div className="decision-tool-tab">
        <h3>Study Design Decision Tool</h3>
        <p className="tab-description">
          Answer the following questions to receive a recommendation on whether an RCT, RWE study, or hybrid approach might be most appropriate for your research.
        </p>
        
        {!showDecisionResult ? (
          <div className="question-container">
            <div className="progress-indicator">
              <div className="progress-text">
                Question {currentQuestionIndex + 1} of {decisionQuestions.length}
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{width: `${((currentQuestionIndex + 1) / decisionQuestions.length) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className="current-question">
              <h4>{currentQuestion.question}</h4>
              <div className="options-container">
                {currentQuestion.options.map((option) => (
                  <div 
                    key={option.value} 
                    className={`option-card ${questionResponses[currentQuestion.id] === option.value ? 'selected' : ''}`}
                    onClick={() => handleResponseChange(currentQuestion.id, option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="navigation-buttons">
              <button 
                onClick={moveToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="nav-button prev"
              >
                ← Previous
              </button>
              
              {currentQuestionIndex === decisionQuestions.length - 1 ? (
                <button 
                  onClick={analyzeResponses}
                  disabled={!questionResponses[currentQuestion.id]}
                  className="nav-button analyze"
                >
                  Analyze Responses
                </button>
              ) : (
                <button 
                  onClick={moveToNextQuestion}
                  disabled={!questionResponses[currentQuestion.id]}
                  className="nav-button next"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="results-container">
            <div className="result-header">
              <div className="recommendation-icon">
                {decisionResult.recommendation.includes('RCT') && !decisionResult.recommendation.includes('pragmatic') ? '🔬' : 
                 decisionResult.recommendation.includes('Hybrid') || decisionResult.recommendation.includes('pragmatic') ? '🔄' : 
                 '📊'}
              </div>
              <h3>Recommendation:<br/>{decisionResult.recommendation}</h3>
            </div>
            
            <div className="result-score">
              <div className="score-spectrum">
                <div className="spectrum-label left">Favors RWE</div>
                <div className="spectrum-label center">Hybrid</div>
                <div className="spectrum-label right">Favors RCT</div>
              </div>
              <div className="meter-container">
                <div className="meter-bar">
                  <div 
                    className="meter-indicator" 
                    style={{
                      left: `${Math.min(Math.max((decisionResult.score + 15) / 30 * 100, 0), 100)}%`
                    }}
                  ></div>
                </div>
                <div className="meter-regions">
                  <div className="region rwe"></div>
                  <div className="region hybrid"></div>
                  <div className="region rct"></div>
                </div>
              </div>
            </div>
            
            <div className="result-details">
              <p className="result-rationale">{decisionResult.rationale}</p>
              
              <div className="result-considerations">
                <h4>Key Considerations</h4>
                <ul>
                  {decisionResult.considerations.map((consideration, index) => (
                    <li key={index}>{consideration}</li>
                  ))}
                </ul>
              </div>
              
              <div className="next-steps">
                <h4>Suggested Next Steps</h4>
                <p>Based on your responses, consider the following resources:</p>
                <ul>
                  {decisionResult.recommendation.includes('RCT') && (
                    <li>Review CONSORT guidelines for best practices in clinical trial design and reporting</li>
                  )}
                  {decisionResult.recommendation.includes('pragmatic') && (
                    <li>Explore the PRECIS-2 tool for designing pragmatic clinical trials</li>
                  )}
                  {decisionResult.recommendation.includes('Real-world') && (
                    <li>Review STROBE guidelines for observational studies</li>
                  )}
                  {decisionResult.recommendation.includes('Hybrid') && (
                    <li>Investigate NIH's Pragmatic Trials Collaboratory resources</li>
                  )}
                  <li>Consult with biostatisticians and research methodologists to refine your approach</li>
                </ul>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setShowDecisionResult(false);
                setCurrentQuestionIndex(0);
                setQuestionResponses({
                  researchQuestion: '',
                  populationType: '',
                  sampleSize: '',
                  timeConstraints: '',
                  budgetConstraints: '',
                  ethicalConcerns: '',
                  outcomeOfInterest: '',
                  interventionType: '',
                  dataAvailability: '',
                  regulatoryNeeds: ''
                });
              }}
              className="restart-button"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="rwe-rct-tool">
      <h2>RWE vs RCT Comparison Tool</h2>
      
      <div className="tool-tabs">
        <button 
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <span className="tab-icon">↔️</span>Comparison
        </button>
        <button 
          className={`tab-button ${activeTab === 'cases' ? 'active' : ''}`}
          onClick={() => setActiveTab('cases')}
        >
          <span className="tab-icon">📋</span>Case Examples
        </button>
        <button 
          className={`tab-button ${activeTab === 'decision' ? 'active' : ''}`}
          onClick={() => setActiveTab('decision')}
        >
          <span className="tab-icon">🔍</span>Decision Tool
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'comparison' && renderComparisonTab()}
        {activeTab === 'cases' && renderCaseExamplesTab()}
        {activeTab === 'decision' && renderDecisionToolTab()}
      </div>
      
      <div className="tool-footer">
        <p>This tool is based on health analytics best practices as outlined in "Health Care Analytics and Society" Winter 2025.</p>
      </div>
    </div>
  );
};

export default RWEvsRCTTool;