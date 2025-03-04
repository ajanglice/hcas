import React, { useState } from 'react';
import RatingBoxesExample from './RatingBoxesExample';
import StudyQualityAssessment from './StudyQualityAssessment';
import './EnhancedPICOTSStyles.css'; // Import the separate CSS file

const EnhancedPICOTSFramework = () => {
  const [framework, setFramework] = useState({
    population: '',
    intervention: '',
    comparison: '',
    outcomes: '',
    timing: '',
    setting: ''
  });

  // Replace evaluationQuality with threeCs assessment
  const [threeCs, setThreeCs] = useState({
    control: {
      value: 'not_assessed'
    },
    chance: {
      value: 'not_assessed'
    },
    context: {
      value: 'not_assessed'
    }
  });

  const [pitfalls, setPitfalls] = useState([]);
  const [activeSection, setActiveSection] = useState('population');
  const [activeTab, setActiveTab] = useState('picots');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCSection, setActiveCSection] = useState('control');
  
  // Add hover states for better interactivity
  const [hoverRating, setHoverRating] = useState(null);

  // Quick reference tooltips for each section
  const tooltips = {
    population: "Define who is being studied (e.g., adults with type 2 diabetes, children ages 5-12 with asthma)",
    intervention: "Specify the treatment, approach, or exposure (e.g., cognitive behavioral therapy, new medication)",
    comparison: "Identify the control or alternative (e.g., placebo, standard of care, no treatment)",
    outcomes: "List measurable results (e.g., reduction in symptoms, mortality rate, quality of life scores)",
    timing: "Specify timeframe (e.g., 6-month follow-up, measurements at baseline and 12 weeks)",
    setting: "Describe where the study takes place (e.g., urban hospitals, rural clinics, home-based)"
  };

  // Examples for each section
  const examples = {
    population: "Adult ambulatory females, aged 18-45 with diagnosed postpartum depression (PPD) with a baseline HAMD-17 score of 26 or higher",
    intervention: "Zuranolone 30 mg, administered orally every evening for 2 weeks",
    comparison: "Placebo tablet, administered orally every evening for 2 weeks",
    outcomes: "Primary: Change in HAMD-17 score at day 15. Secondary: Change in HAMD-17 score at other time points.",
    timing: "45 day study period post-randomization",
    setting: "US centers"
  };

  // Options for 3 C's assessment
  const threeCsOptions = {
    control: [
      { value: 'high', label: 'High', description: 'Strong control for competing factors (e.g., randomization)' },
      { value: 'moderate', label: 'Moderate', description: 'Some measures to control for competing factors' },
      { value: 'low', label: 'Low', description: 'Limited control for competing factors' },
      { value: 'not_assessed', label: 'Not Assessed', description: 'Control has not been evaluated' }
    ],
    chance: [
      { value: 'high', label: 'High', description: 'Large sample size with statistical significance' },
      { value: 'moderate', label: 'Moderate', description: 'Adequate sample size with some statistical power' },
      { value: 'low', label: 'Low', description: 'Small sample size or statistical concerns' },
      { value: 'not_assessed', label: 'Not Assessed', description: 'Chance has not been evaluated' }
    ],
    context: [
      { value: 'high', label: 'High', description: 'Results likely generalizable to multiple contexts' },
      { value: 'moderate', label: 'Moderate', description: 'Results somewhat generalizable' },
      { value: 'low', label: 'Low', description: 'Results have limited generalizability' },
      { value: 'not_assessed', label: 'Not Assessed', description: 'Context has not been evaluated' }
    ]
  };

  // 3 C's descriptions and guidance
  const threeCsGuidance = {
    control: {
      question: "Does the estimate control for competing factors?",
      aka: "Internal Validity",
      description: "Evaluates how well the study design controls for factors that might influence the results other than the intervention being studied.",
      bestPractices: [
        "Randomization is the gold standard but often infeasible",
        "Similar comparison and treatment groups",
        "Meticulous measurement"
      ],
      assessment: "Look for how credible the comparison is between groups.",
      icon: "🔍"
    },
    chance: {
      question: "Does the estimate rule out the role of chance?",
      aka: "Statistical Power",
      description: "Evaluates whether the study has sufficient statistical power to detect meaningful effects.",
      bestPractices: [
        "Large sample sizes + confidence intervals excluding zero effect",
        "Pre-registration of primary endpoint"
      ],
      assessment: "Consider how likely the results could have arisen from random chance.",
      icon: "🎲"
    },
    context: {
      question: "Does the estimate generalize to other contexts?",
      aka: "External Validity",
      description: "Evaluates the extent to which findings can be applied to other settings, populations, or time periods.",
      bestPractices: [
        "Replication across numerous studies with different populations",
        "Broadly representative study population"
      ],
      assessment: "Consider how applicable the findings are to different settings.",
      icon: "🌍"
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFramework(prev => ({
      ...prev,
      [name]: value
    }));
    if (formSubmitted) {
      analyzePICOTS();
    }
  };

  const handleThreeCsChange = (value) => {
    setThreeCs(prev => ({
      ...prev,
      [activeCSection]: {
        ...prev[activeCSection],
        value
      }
    }));
    // Add animation class and remove after transition
    document.querySelector('.rating-box.selected')?.classList.add('just-selected');
    setTimeout(() => {
      document.querySelector('.rating-box.just-selected')?.classList.remove('just-selected');
    }, 300);
  };

  const handleSectionClick = (section, e) => {
    setActiveSection(section);
    // Add ripple effect to clicked section
    if (e) {
      addRippleEffect(e);
    }
  };

  const handleCsectionClick = (section, e) => {
    setActiveCSection(section);
    // Add ripple effect to clicked section
    if (e) {
      addRippleEffect(e);
    }
  };

  // New function to add ripple effect
  const addRippleEffect = (e) => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Functions for hover state handling
  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(null);
  };

  // Updated analyzePICOTS function with better example handling
  const analyzePICOTS = () => {
    setFormSubmitted(true);
    const newPitfalls = [];

    // Check if using an example - if so, skip quality check
    const isUsingExample = (section) => {
      return framework[section] === examples[section];
    };

    // Helper function to check text quality - modified to be more flexible
    const assessTextQuality = (text, minWords = 2, requiredKeywords = []) => {
      if (!text) return false;
      
      const words = text.trim().split(/\s+/);
      const lowercaseText = text.toLowerCase();
      
      // Reduced minimum word count requirement
      if (words.length < minWords) return false;
      
      // Make keyword matching less strict - only require a portion of keywords to match
      if (requiredKeywords.length > 0) {
        // Only require 20% of keywords to match instead of 30%
        const keywordThreshold = Math.ceil(requiredKeywords.length * 0.2);
        
        // Use more flexible matching by checking if any part of the word contains the keyword
        const matchingKeywords = requiredKeywords.filter(keyword => {
          const keywordLower = keyword.toLowerCase();
          // Check if keyword is contained within any word or if any word contains the keyword stem
          return lowercaseText.includes(keywordLower) || 
                 words.some(word => word.toLowerCase().includes(keywordLower) || 
                                   keywordLower.includes(word.toLowerCase()));
        });
        
        return matchingKeywords.length >= keywordThreshold;
      }
      
      return true;
    };

    // Detailed population analysis - more flexible
    const populationQualityCheck = () => {
      // Skip check if using the example
      if (isUsingExample('population')) return;
      
      // Expanded keyword list with variations
      const requiredPopulationKeywords = [
        'age', 'aged', 'year', 'old',
        'gender', 'sex', 'male', 'female', 'men', 'women',
        'condition', 'diagnosis', 'disease', 'disorder', 'patient',
        'criteria', 'include', 'exclude', 'eligibility'
      ];
      
      if (!framework.population) {
        newPitfalls.push({
          category: 'Population',
          issue: 'Population description is missing',
          severity: 'Moderate',
          recommendation: 'Consider describing who is being studied'
        });
        return;
      }
      
      // Reduced word count requirement from 4 to 3
      const isQualityPopulation = assessTextQuality(framework.population, 3, requiredPopulationKeywords);
      
      if (!isQualityPopulation) {
        newPitfalls.push({
          category: 'Population',
          issue: 'Population could be more descriptive',
          severity: 'Moderate',
          recommendation: 'Consider adding more demographic or clinical details'
        });
      }
    };

    // Detailed intervention analysis - more flexible
    const interventionQualityCheck = () => {
      // Skip check if using the example
      if (isUsingExample('intervention')) return;
      
      // Expanded keyword list with variations
      const requiredInterventionKeywords = [
        'protocol', 'program', 'procedure', 'approach', 'therapy',
        'duration', 'time', 'period', 'weekly', 'session', 'month',
        'method', 'technique', 'treatment', 'dose', 'administered', 'intervention'
      ];
      
      if (!framework.intervention) {
        newPitfalls.push({
          category: 'Intervention',
          issue: 'Intervention description is missing',
          severity: 'Moderate',
          recommendation: 'Consider describing the treatment or approach being studied'
        });
        return;
      }
      
      // Reduced word count requirement from 4 to 3
      const isQualityIntervention = assessTextQuality(framework.intervention, 3, requiredInterventionKeywords);
      
      if (!isQualityIntervention) {
        newPitfalls.push({
          category: 'Intervention',
          issue: 'Intervention could use more detail',
          severity: 'Moderate',
          recommendation: 'Consider adding information about protocol, duration, or method'
        });
      }
    };

    // Comparison group analysis - more flexible
    const comparisonQualityCheck = () => {
      // Skip check if using the example
      if (isUsingExample('comparison')) return;
      
      // Expanded keyword list with variations
      const requiredComparisonKeywords = [
        'control', 'comparison', 'versus', 'vs',
        'standard', 'usual', 'normal', 'typical',
        'alternative', 'placebo', 'sham', 'wait-list', 'waitlist',
        'care', 'treatment', 'group', 'compared'
      ];
      
      if (!framework.comparison) {
        newPitfalls.push({
          category: 'Comparison',
          issue: 'Comparison group not specified',
          severity: 'Moderate',
          recommendation: 'Consider defining what you are comparing against'
        });
        return;
      }
      
      // Same word count requirement (3) but more flexible keywords
      const isQualityComparison = assessTextQuality(framework.comparison, 2, requiredComparisonKeywords);
      
      if (!isQualityComparison) {
        newPitfalls.push({
          category: 'Comparison',
          issue: 'Comparison could be clearer',
          severity: 'Moderate',
          recommendation: 'Consider specifying the control group or standard of care'
        });
      }
    };

    // Outcomes analysis - more flexible
    const outcomesQualityCheck = () => {
      // Skip check if using the example
      if (isUsingExample('outcomes')) return;
      
      // Expanded keyword list with variations
      const requiredOutcomeKeywords = [
        'measure', 'assessment', 'scale', 'score', 'rate', 'level',
        'primary', 'main', 'key', 'principal',
        'secondary', 'additional', 'other',
        'outcome', 'endpoint', 'result', 'change', 'improvement',
        'symptom', 'mortality', 'survival', 'quality'
      ];
      
      if (!framework.outcomes) {
        newPitfalls.push({
          category: 'Outcomes',
          issue: 'Outcomes not specified',
          severity: 'Moderate',
          recommendation: 'Consider defining what outcomes you are measuring'
        });
        return;
      }
      
      // Reduced word count requirement from 4 to 2
      const isQualityOutcomes = assessTextQuality(framework.outcomes, 2, requiredOutcomeKeywords);
      
      if (!isQualityOutcomes) {
        newPitfalls.push({
          category: 'Outcomes',
          issue: 'Outcomes could be more specific',
          severity: 'Moderate',
          recommendation: 'Consider specifying primary and secondary outcomes'
        });
      }
    };

    // Timing analysis - more flexible
    const timingQualityCheck = () => {
      // Skip check if using the example
      if (isUsingExample('timing')) return;
      
      // Expanded keyword list with variations
      const requiredTimingKeywords = [
        'duration', 'length', 'period', 'week', 'month', 'year',
        'follow-up', 'followup', 'follow up', 'post', 'after',
        'time', 'timing', 'interval', 'frequency', 'schedule',
        'baseline', 'assessment', 'measurement', 'endpoint'
      ];
      
      if (!framework.timing) {
        newPitfalls.push({
          category: 'Timing',
          issue: 'Timing not specified',
          severity: 'Moderate',
          recommendation: 'Consider adding information about study duration'
        });
        return;
      }
      
      // Reduced word count requirement from 3 to 2
      const isQualityTiming = assessTextQuality(framework.timing, 2, requiredTimingKeywords);
      
      if (!isQualityTiming) {
        newPitfalls.push({
          category: 'Timing',
          issue: 'Timing could be more detailed',
          severity: 'Moderate',
          recommendation: 'Consider specifying timeframe for data collection or follow-up'
        });
      }
    };

    // Setting analysis - more flexible
    const settingQualityCheck = () => {
      // Skip check if using the example
      if (isUsingExample('setting')) return;
      
      // Expanded keyword list with variations
      const requiredSettingKeywords = [
        'location', 'setting', 'site', 'place', 'geographical',
        'environment', 'context', 'surrounding', 'area',
        'facility', 'hospital', 'clinic', 'center', 'centre', 'institution',
        'community', 'home', 'inpatient', 'outpatient', 'rural', 'urban',
        'care', 'primary', 'tertiary'
      ];
      
      if (!framework.setting) {
        newPitfalls.push({
          category: 'Setting',
          issue: 'Setting not described',
          severity: 'Moderate',
          recommendation: 'Consider describing where the study takes place'
        });
        return;
      }
      
      // Reduced word count requirement from 3 to 2
      const isQualitySetting = assessTextQuality(framework.setting, 2, requiredSettingKeywords);
      
      if (!isQualitySetting) {
        newPitfalls.push({
          category: 'Setting',
          issue: 'Setting could use more context',
          severity: 'Moderate',
          recommendation: 'Consider adding details about the location or environment'
        });
      }
    };

    // Run all quality checks
    populationQualityCheck();
    interventionQualityCheck();
    comparisonQualityCheck();
    outcomesQualityCheck();
    timingQualityCheck();
    settingQualityCheck();

    setPitfalls(newPitfalls);
    
    // Add animation to the analyze button to show success
    const analyzeBtn = document.querySelector('.analyze-btn');
    analyzeBtn.classList.add('analyze-complete');
    setTimeout(() => {
      analyzeBtn.classList.remove('analyze-complete');
    }, 1000);
  };

  const getCompletionStatus = () => {
    const total = Object.keys(framework).length;
    const filled = Object.values(framework).filter(v => v.trim().length > 0).length;
    return Math.round((filled / total) * 100);
  };

  const getThreeCsCompletionStatus = () => {
    const total = Object.keys(threeCs).length;
    const filled = Object.values(threeCs).filter(v => v.value !== 'not_assessed').length;
    return Math.round((filled / total) * 100);
  };

  // Updated getStrengthScore function with reduced penalties
  const getStrengthScore = () => {
    if (pitfalls.length === 0 && !formSubmitted) return null;
    
    const criticalCount = pitfalls.filter(p => p.severity === 'Critical').length;
    const moderateCount = pitfalls.filter(p => p.severity === 'Moderate').length;
    
    // Calculate score (0-100 scale) with reduced penalties
    const maxIssues = 7; // Max possible pitfalls
    const criticalWeight = 10; // Reduced from 15
    const moderateWeight = 3; // Reduced from 5
    
    const deductions = (criticalCount * criticalWeight) + (moderateCount * moderateWeight);
    return Math.max(0, 100 - deductions);
  };

  // Get score for 3 C's assessment
  const getThreeCsScore = () => {
    if (!formSubmitted) return null;
    
    const scores = {
      high: 33,
      moderate: 22,
      low: 10,
      not_assessed: 0
    };
    
    let total = 0;
    
    total += scores[threeCs.control.value] || 0;
    total += scores[threeCs.chance.value] || 0;
    total += scores[threeCs.context.value] || 0;
    
    return total;
  };

  // Get quality level text for 3 C's
  const getQualityLevelText = (score) => {
    if (score >= 80) return "High Quality";
    if (score >= 50) return "Moderate Quality";
    if (score >= 30) return "Low Quality";
    return "Very Low Quality";
  };

  const strengthScore = getStrengthScore();
  const threeCsScore = getThreeCsScore();
  const completionPercentage = getCompletionStatus();
  const threeCsCompletionPercentage = getThreeCsCompletionStatus();

  return (
    <div className="picots-framework">
      <h2>Treatment Study Assessment</h2>
      
      <div className="tab-switcher">
        <button 
          className={`tab-btn ${activeTab === 'picots' ? 'active' : ''}`}
          onClick={() => setActiveTab('picots')}
        >
          PICOTS Framework
        </button>
        <button 
          className={`tab-btn ${activeTab === 'evaluation' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluation')}
        >
          3 C's Assessment
        </button>
      </div>
      
      {activeTab === 'picots' ? (
        <div>
          <h3>PICOTS Framework</h3>
          <p className="picots-description">
            The PICOTS framework is a structured approach for defining key elements of a research question or study design.
            It helps researchers clearly specify Population, Intervention, Comparison, Outcomes, Timing, and Setting components.
          </p>

          <div className="framework-completion">
            <div className="completion-text">
              <span>Framework Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${completionPercentage}%`}}
              ></div>
            </div>
          </div>
          
          <div className="picots-content">
            <div className="picots-sidebar">
              {Object.keys(framework).map((section) => (
                <div 
                  key={section}
                  className={`sidebar-item ${activeSection === section ? 'active' : ''} ${framework[section] ? 'completed' : ''}`}
                  onClick={(e) => handleSectionClick(section, e)}
                >
                  <div className="sidebar-icon">
                    {section === 'population' && '👥'}
                    {section === 'intervention' && '💊'}
                    {section === 'comparison' && '⚖️'}
                    {section === 'outcomes' && '📊'}
                    {section === 'timing' && '⏱️'}
                    {section === 'setting' && '🏥'}
                  </div>
                  <div className="sidebar-text">
                    <span className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                    {framework[section] ? (
                      <span className="completion-indicator">Completed</span>
                    ) : (
                      <span className="completion-indicator incomplete">Not defined</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="picots-form">
              <div className="form-header">
                <h3>
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                  <span className="tooltip-icon" title={tooltips[activeSection]}>ℹ️</span>
                </h3>
              </div>
              
              <div className="active-section-content">
                <label htmlFor={activeSection}>Description</label>
                <textarea
                  id={activeSection}
                  name={activeSection}
                  value={framework[activeSection]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${activeSection} details...`}
                  rows={6}
                />
                
                <div className="textarea-helper">
                  <div className="helper-text">
                    <strong>Tip:</strong> {tooltips[activeSection]}
                  </div>
                  <div className="example-section">
                    <div className="example-header">Example:</div>
                    <div className="example-content">{examples[activeSection]}</div>
                    <button 
                      className="use-example-btn"
                      onClick={() => {
                        setFramework(prev => ({
                          ...prev,
                          [activeSection]: examples[activeSection]
                        }));
                      }}
                    >
                      Use Example
                    </button>
                  </div>
                </div>
                
                <div className="section-nav">
                  {activeSection !== 'population' && (
                    <button 
                      className="nav-btn"
                      onClick={() => {
                        const sections = Object.keys(framework);
                        const currentIndex = sections.indexOf(activeSection);
                        setActiveSection(sections[currentIndex - 1]);
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  
                  {activeSection !== 'setting' && (
                    <button 
                      className="nav-btn"
                      onClick={() => {
                        const sections = Object.keys(framework);
                        const currentIndex = sections.indexOf(activeSection);
                        setActiveSection(sections[currentIndex + 1]);
                      }}
                    >
                      Next →
                    </button>
                  )}
                  
                  <button
                    onClick={analyzePICOTS}
                    className="analyze-btn"
                  >
                    Analyze Framework
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="three-cs-section">
          <h3>Three C's Assessment</h3>
          <p className="three-cs-description">
            Assess the methodological quality of the study using the "3 C's" framework: Control, Chance, and Context.
            This approach helps evaluate internal validity, statistical power, and external validity.
          </p>

          <div className="framework-completion">
            <div className="completion-text">
              <span>Assessment Completion</span>
              <span>{threeCsCompletionPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${threeCsCompletionPercentage}%`}}
              ></div>
            </div>
          </div>
          
          {/* Completely redesigned 3Cs section to match PICOTS layout */}
          <div className="picots-content">
            <div className="picots-sidebar">
              {Object.keys(threeCs).map((section) => {
                const rating = threeCs[section].value;
                let statusClass = 'not-assessed';
                if (rating === 'high') statusClass = 'high';
                else if (rating === 'moderate') statusClass = 'moderate';
                else if (rating === 'low') statusClass = 'low';
                
                return (
                  <div 
                    key={section}
                    className={`sidebar-item ${activeCSection === section ? 'active' : ''} ${rating !== 'not_assessed' ? 'completed' : ''}`}
                    onClick={(e) => handleCsectionClick(section, e)}
                  >
                    <div className={`sidebar-icon ${statusClass}`}>
                      {threeCsGuidance[section].icon}
                    </div>
                    <div className="sidebar-text">
                      <span className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                      {rating !== 'not_assessed' ? (
                        <span className={`completion-indicator ${statusClass}`}>
                          {rating.charAt(0).toUpperCase() + rating.slice(1)}
                        </span>
                      ) : (
                        <span className="completion-indicator incomplete">Not assessed</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="picots-form">
              <div className="form-header">
                <h3>
                  <div className="section-icon-container">
                    {threeCsGuidance[activeCSection].icon}
                  </div>
                  {activeCSection.toUpperCase()} 
                  <span className="c-section-aka">({threeCsGuidance[activeCSection].aka})</span>
                </h3>
              </div>
              
              <div className="active-section-content">
                <div className="assessment-question-box">
                  <div className="question-header">
                    <strong>{threeCsGuidance[activeCSection].question}</strong>
                  </div>
                  <p className="question-description">{threeCsGuidance[activeCSection].description}</p>
                </div>
                
                <div className="assessment-helper">
                  <div className="helper-card">
                    <div className="helper-header">Best Protections:</div>
                    <ul className="helper-list">
                      {threeCsGuidance[activeCSection].bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                      ))}
                    </ul>
                    <div className="helper-footer">
                      <strong>Assessment Guidance:</strong> {threeCsGuidance[activeCSection].assessment}
                    </div>
                  </div>
                </div>
                
                <label className="rating-label">Select Rating:</label>
                <div className="rating-container">
                  {threeCsOptions[activeCSection]
                    .filter(option => option.value !== 'not_assessed')
                    .map((option) => (
                      <div 
                        key={option.value}
                        className={`rating-box ${option.value} ${threeCs[activeCSection].value === option.value ? 'selected' : ''} ${hoverRating === option.value ? 'hovered' : ''}`}
                        onClick={() => handleThreeCsChange(option.value)}
                        onMouseEnter={() => handleRatingHover(option.value)}
                        onMouseLeave={handleRatingLeave}
                        tabIndex={0}
                        role="button"
                        aria-pressed={threeCs[activeCSection].value === option.value}
                      >
                        <div className="rating-label-box">
                          {option.label}
                        </div>
                        <div className="rating-description">
                          {option.description}
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="section-nav">
                  {activeCSection !== 'control' && (
                    <button 
                      className="nav-btn"
                      onClick={() => {
                        const sections = Object.keys(threeCs);
                        const currentIndex = sections.indexOf(activeCSection);
                        setActiveCSection(sections[currentIndex - 1]);
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  
                  {activeCSection !== 'context' && (
                    <button 
                      className="nav-btn"
                      onClick={() => {
                        const sections = Object.keys(threeCs);
                        const currentIndex = sections.indexOf(activeCSection);
                        setActiveCSection(sections[currentIndex + 1]);
                      }}
                    >
                      Next →
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      setFormSubmitted(true);
                      // Add animation to button
                      const btn = e.currentTarget;
                      btn.classList.add('button-pulse');
                      setTimeout(() => {
                        btn.classList.remove('button-pulse');
                      }, 800);
                    }}
                    className="analyze-btn"
                  >
                    Complete Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* NEW ASSESSMENT RESULTS SECTION */}
          {formSubmitted && threeCsScore !== null && (
            <div className="assessment-results">
              <h4 className="results-title">Study Quality Assessment</h4>
              
              {/* Circular progress score visualization */}
              <div className="quality-score-dashboard">
                <div className="score-circle-container">
                  <div className={`score-circle ${
                    threeCsScore >= 80 ? 'high-quality' : 
                    threeCsScore >= 50 ? 'medium-quality' : 'low-quality'
                  }`}>
                    <div className="score-value">{threeCsScore}</div>
                    <div className="score-label">Quality Score</div>
                  </div>
                  <div className="quality-rating">
                    {threeCsScore >= 80 ? 'High Quality Study' : 
                     threeCsScore >= 50 ? 'Moderate Quality Study' : 
                     threeCsScore >= 30 ? 'Low Quality Study' : 'Very Low Quality Study'}
                  </div>
                </div>
                
                {/* Quality components visualization */}
                <div className="quality-components">
                  {Object.entries(threeCs).map(([key, value], index) => {
                    // Calculate visual strength (0-100%)
                    const strengthMap = { high: 100, moderate: 66, low: 33, not_assessed: 0 };
                    const strength = strengthMap[value.value] || 0;
                    
                    return (
                      <div key={key} className="component-meter" style={{"--index": index}}>
                        <div className="component-label">
                          <span className="component-icon">{threeCsGuidance[key].icon}</span>
                          <span className="component-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                        <div className="meter-bar-container" data-tooltip={`${strength}% strength`}>
                          <div 
                            className={`meter-bar ${value.value}`} 
                            style={{width: `${strength}%`}}
                          ></div>
                        </div>
                        <div className={`component-value ${value.value}`}>
                          {value.value !== 'not_assessed' 
                            ? value.value.charAt(0).toUpperCase() + value.value.slice(1)
                            : 'Not Assessed'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Redesigned Assessment Summary */}
              <div className="three-cs-summary">
                <h4 className="summary-title">Assessment Summary</h4>
                <div className="summary-cards">
                  {Object.entries(threeCs).map(([key, value], index) => {
                    const ratingClass = value.value;
                    return (
                      <div key={key} className={`summary-card ${ratingClass}`} style={{"--index": index}}>
                        <div className="card-header">
                          <div className="card-title-row">
                            <div className="card-icon">{threeCsGuidance[key].icon}</div>
                            <h5 className="card-title">{key.toUpperCase()}</h5>
                          </div>
                          <div className={`card-rating ${ratingClass}`}>
                            {value.value !== 'not_assessed' 
                              ? value.value.charAt(0).toUpperCase() + value.value.slice(1)
                              : 'Not Assessed'}
                          </div>
                        </div>
                        <div className="card-body">
                          <p className="card-question">{threeCsGuidance[key].question}</p>
                          <p className="card-aka"><span>Also known as:</span> {threeCsGuidance[key].aka}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Redesigned Recommendations */}
              <div className="recommendations">
                <h4 className="recommendations-title">Recommendations</h4>
                <div className="recommendations-container">
                  {threeCs.control.value === 'low' && (
                    <div className="recommendation-card control" style={{"--index": 0}}>
                      <div className="recommendation-icon">🔍</div>
                      <div className="recommendation-content">
                        <h5>Improve Control</h5>
                        <p>Consider strengthening controls for competing factors to improve internal validity.</p>
                      </div>
                    </div>
                  )}
                  {threeCs.chance.value === 'low' && (
                    <div className="recommendation-card chance" style={{"--index": 1}}>
                      <div className="recommendation-icon">🎲</div>
                      <div className="recommendation-content">
                        <h5>Address Statistical Power</h5>
                        <p>Consider methods to increase statistical power, such as larger sample sizes or more precise measurements.</p>
                      </div>
                    </div>
                  )}
                  {threeCs.context.value === 'low' && (
                    <div className="recommendation-card context" style={{"--index": 2}}>
                      <div className="recommendation-icon">🌍</div>
                      <div className="recommendation-content">
                        <h5>Expand Generalizability</h5>
                        <p>Consider how findings might be replicated in different contexts to improve generalizability.</p>
                      </div>
                    </div>
                  )}
                  {threeCsScore >= 80 && (
                    <div className="recommendation-card high" style={{"--index": 3}}>
                      <div className="recommendation-icon">✓</div>
                      <div className="recommendation-content">
                        <h5>Strong Methodology</h5>
                        <p>Strong methodological quality - findings can be considered reliable and potentially generalizable.</p>
                      </div>
                    </div>
                  )}
                  {threeCsScore >= 50 && threeCsScore < 80 && (
                    <div className="recommendation-card medium" style={{"--index": 3}}>
                      <div className="recommendation-icon">⚠️</div>
                      <div className="recommendation-content">
                        <h5>Consider Limitations</h5>
                        <p>Moderate methodological quality - consider findings with awareness of limitations.</p>
                      </div>
                    </div>
                  )}
                  {threeCsScore < 50 && (
                    <div className="recommendation-card low" style={{"--index": 3}}>
                      <div className="recommendation-icon">⚠️</div>
                      <div className="recommendation-content">
                        <h5>Exercise Caution</h5>
                        <p>Exercise caution when interpreting and applying these findings due to methodological concerns.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* No action buttons per request */}
            </div>
          )}
        </div>
      )}
      
      {formSubmitted && activeTab === 'picots' && (
        <div className="analysis-results">
          <div className="results-header">
            <h3>Framework Analysis Results</h3>
            {strengthScore !== null && (
              <div className="strength-meter">
                <span>Framework Strength:</span>
                <div className="strength-bar-container">
                  <div 
                    className={`strength-bar ${
                      strengthScore >= 80 ? 'high' : 
                      strengthScore >= 50 ? 'medium' : 'low'
                    }`}
                    style={{width: `${strengthScore}%`}}
                  ></div>
                </div>
                <span className="strength-score">{strengthScore}/100</span>
              </div>
            )}
          </div>
          
          {pitfalls.length > 0 ? (
            <div className="pitfalls-section">
              <h4>Identified Issues</h4>
              
              <div className="pitfalls-list">
                {pitfalls.map((pitfall, index) => (
                  <div 
                    key={index} 
                    className={`pitfall-card ${pitfall.severity.toLowerCase()}`}
                  >
                    <div className="pitfall-header">
                      <h5>{pitfall.category}</h5>
                      <span className={`severity-badge ${pitfall.severity.toLowerCase()}`}>
                        {pitfall.severity === 'Critical' ? '🚫 Critical' : '⚠️ Moderate'}
                      </span>
                    </div>
                    <p className="pitfall-issue">{pitfall.issue}</p>
                    <p className="pitfall-recommendation">
                      <strong>Recommendation:</strong> {pitfall.recommendation}
                    </p>
                    <button 
                      className="fix-issue-btn"
                      onClick={() => {
                        // Set active section to the one that needs fixing
                        setActiveSection(pitfall.category.toLowerCase());
                        setActiveTab('picots');
                        
                        // Add highlight animation to the section
                        setTimeout(() => {
                          const element = document.querySelector(`#${pitfall.category.toLowerCase()}`);
                          if (element) {
                            element.classList.add('highlight-fix');
                            setTimeout(() => {
                              element.classList.remove('highlight-fix');
                            }, 1500);
                          }
                        }, 100);
                      }}
                    >
                      Fix Issue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h4>Your framework looks good!</h4>
              <p>No significant methodological issues were identified. Your PICOTS framework is well-defined.</p>
            </div>
          )}
          
          <div className="framework-summary">
            <h4>Framework Summary</h4>
            <div className="summary-grid">
              {Object.entries(framework).map(([key, value]) => (
                <div key={key} className="summary-item">
                  <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                  <p>{value || 'Not defined'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPICOTSFramework;
