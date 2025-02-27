import React, { useState } from 'react';
import './styles.css';

const SixPsHealthcare = () => {
  const [activeP, setActiveP] = useState('patients');

  const sixPs = [
    {
      id: 'patients',
      title: 'Patients',
      icon: '👤',
      challenges: [
        'High demand has led to shortages, affecting patients with diabetes',
        'Access barriers due to high cost and insurance restrictions',
        'Managing side effects like nausea and gastrointestinal issues',
        'Uncertainty about long-term maintenance after stopping medication',
      ],
      opportunities: [
        'Significant weight loss results (15-20% of body weight)',
        'Improved glycemic control for those with type 2 diabetes',
        'Potential reduction in cardiovascular risk factors',
        'May help protect the kidneys in patients with chronic kidney disease',
        'Reduced comorbidities associated with obesity'
      ]
    },
    {
      id: 'providers',
      title: 'Providers',
      icon: '⚕️',
      challenges: [
        'Navigating insurance approvals and prior authorizations',
        'Managing supply shortages and rationing care decisions',
        'Determining appropriate patient selection criteria',
        'Monitoring for and managing potential side effects',
        'Long-term health impacts are not yet fully understood'
      ],
      opportunities: [
        'New effective tool for treating obesity as a chronic disease',
        'Opportunity to reduce obesity-related comorbidities in patient populations',
        'More comprehensive approach to metabolic health',
        'Potential for improved patient outcomes and satisfaction'
      ]
    },
    {
      id: 'payers',
      title: 'Payers',
      icon: '💰',
      challenges: [
        'High medication cost (approximately $1,000-$1,300 per month)',
        'Determining coverage criteria and duration of therapy',
        'Balancing short-term costs against long-term health benefits',
        'Managing utilization for on-label vs. off-label use'
      ],
      opportunities: [
        'Potential long-term savings from reduced obesity-related complications',
        'Development of value-based payment models for weight management',
        'Data collection for outcomes-based contracts with manufacturers',
        'Reduced hospitalizations and emergency care utilization'
      ]
    },
    {
      id: 'policymakers',
      title: 'Policy',
      icon: '🏛️',
      challenges: [
        'Addressing medication shortages and supply chain issues',
        'Navigating ethical questions around obesity treatment access',
        'Determining Medicare and Medicaid coverage policies',
        'Balancing innovation incentives with drug pricing concerns'
      ],
      opportunities: [
        'Potential public health impact on obesity epidemic',
        'Development of comprehensive obesity treatment guidelines and policies',
        'Creating frameworks for equitable access to effective treatments',
        'Reducing national healthcare expenditures through obesity prevention'
      ]
    },
    {
      id: 'product',
      title: 'Product (Pharma)',
      icon: '💊',
      challenges: [
        'Meeting unprecedented demand and scaling manufacturing capacity',
        'Addressing global supply chain constraints',
        'Managing off-label use for weight loss',
        'Navigating competitive landscape with similar GLP-1 medications'
      ],
      opportunities: [
        'Expansion of GLP-1 market beyond diabetes to obesity treatment',
        'Development of improved formulations and delivery methods',
        'Research into new indications and combination therapies',
        'Brand establishment in emerging metabolic health space'
      ]
    },
    {
      id: 'employer',
      title: 'emPloyer',
      icon: '🏢',
      challenges: [
        'Managing increasing pharmacy benefit costs',
        'Determining appropriate coverage in employer health plans',
        'Balancing employee demand against budget constraints',
        'Developing equitable policies for coverage eligibility'
      ],
      opportunities: [
        'Potential reduction in healthcare costs and absenteeism',
        'Integration with workplace wellness programs',
        'Improved employee health outcomes and productivity',
        'Attraction and retention of employees through comprehensive benefits'
      ]
    }
  ];

  const activeItem = sixPs.find(p => p.id === activeP);

  return (
    <div className="six-ps-container">
      <header className="six-ps-header">
        <h2>Understanding the 6 Ps of Healthcare</h2>
        <p className="six-ps-subtitle">A Framework for Analyzing Healthcare Challenges & Opportunities</p>
        <div className="ozempic-focus">
          <h3>Case Study: Ozempic (Semaglutide)</h3>
          <p>Exploring the impact of GLP-1 receptor agonists across the healthcare ecosystem</p>
        </div>
      </header>

      <div className="circular-container">
        <div className="center-logo-container">
          <img 
            src={require("./ozempic-logo.png")} 
            alt="Ozempic Logo" 
            className="center-logo" 
          />
        </div>
        
        <div className="circular-icons">
          {sixPs.map((p, index) => {
            // Define positions for each of the 6 buttons
            const positions = [
              { top: '50%', left: '0', transform: 'translate(-50%, -50%)' },
              { top: '14%', left: '25%', transform: 'translate(-50%, -50%)' },
              { top: '14%', left: '75%', transform: 'translate(-50%, -50%)' },
              { top: '50%', left: '100%', transform: 'translate(-50%, -50%)' },
              { top: '86%', left: '75%', transform: 'translate(-50%, -50%)' },
              { top: '86%', left: '25%', transform: 'translate(-50%, -50%)' }
            ];
            
            return (
              <button
                key={p.id}
                className={`p-icon-button ${activeP === p.id ? 'active' : ''}`}
                onClick={() => setActiveP(p.id)}
                style={positions[index]}
              >
                <div className="icon-wrapper">{p.icon}</div>
                <div className="icon-title">{p.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-content">
        {activeItem && (
          <>
            <h3 className="p-content-title">
              <span className="p-content-icon">{activeItem.icon}</span>
              {activeItem.title}
            </h3>
            
            <div className="p-content-columns">
              <div className="p-opportunities">
                <h4>Opportunities</h4>
                <ul>
                  {activeItem.opportunities.map((opportunity, index) => (
                    <li key={index}>{opportunity}</li>
                  ))}
                </ul>
              </div>
              
              <div className="p-challenges">
                <h4>Challenges</h4>
                <ul>
                  {activeItem.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="ozempic-info">
        <h3>About Ozempic (Semaglutide)</h3>
        <p>
          Ozempic is a GLP-1 receptor agonist initially approved for type 2 diabetes management. 
          It has gained significant attention for its effectiveness in weight loss, with higher doses 
          approved as Wegovy specifically for obesity treatment. The medication works by mimicking 
          an incretin hormone that targets areas of the brain that regulate appetite and food intake.
        </p>
        <div className="info-box">
          <h4>Key Facts</h4>
          <ul>
            <li>Developed by Novo Nordisk</li>
            <li>Weekly subcutaneous injection</li>
            <li>FDA approved for type 2 diabetes (Ozempic) and weight management (Wegovy)</li>
            <li>Shown to reduce A1C levels and body weight</li>
            <li>Associated with reduced risk of major adverse cardiovascular events</li>
          </ul>
        </div>
      </div>

      <footer className="six-ps-footer">
        <p>Created for HCAS Final Challenge - Winter 2025</p>
      </footer>
    </div>
  );
};

export default SixPsHealthcare;