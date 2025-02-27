import React from 'react';

const StudyQualityAssessment = ({ score = 0, maxScore = 100 }) => {
  // Quality level based on score
  const getQualityLevel = () => {
    if (score >= 80) return "High Quality Study";
    if (score >= 50) return "Moderate Quality Study";
    if (score >= 30) return "Low Quality Study";
    return "Very Low Quality Study";
  };
  
  // Color based on quality level
  const getQualityColor = () => {
    if (score >= 80) return "#4caf50"; // Green
    if (score >= 50) return "#ff9800"; // Orange
    if (score >= 30) return "#f44336"; // Light Red
    return "#d32f2f"; // Dark Red
  };
  
  // Assessment areas data
  const assessmentAreas = [
    { 
      name: "CONTROL", 
      status: "Not_assessed",
      description: "Does the estimate control for competing factors?"
    },
    { 
      name: "CHANCE", 
      status: "Not_assessed",
      description: "Does the estimate rule out the role of chance?"
    },
    { 
      name: "CONTEXT", 
      status: "Not_assessed",
      description: "Does the estimate generalize to other contexts?"
    }
  ];
  
  // Recommendations
  const recommendations = [
    "Exercise caution when interpreting and applying these findings due to methodological concerns."
  ];

  return (
    <div className="quality-assessment-container">
      <div className="quality-assessment-card">
        {/* Header with score */}
        <div className="quality-header">
          <h3 className="quality-title">Study Quality Assessment</h3>
          <div className="quality-score">
            <span className="score-value" style={{ color: getQualityColor() }}>{score}</span>
            <span className="score-max">/{maxScore}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="quality-progress-container">
          <div 
            className="quality-progress-bar"
            style={{ 
              width: `${(score / maxScore) * 100}%`,
              backgroundColor: getQualityColor()
            }}
          ></div>
        </div>
        <div className="quality-level" style={{ color: getQualityColor() }}>
          {getQualityLevel()}
        </div>
        
        {/* Assessment areas */}
        <div className="assessment-areas">
          <h4 className="areas-title">Assessment Summary</h4>
          
          {assessmentAreas.map((area, index) => (
            <div key={index} className="assessment-area">
              <div className="area-header">
                <span className="area-name">{area.name}</span>
                <span className="area-status">{area.status.replace('_', ' ')}</span>
              </div>
              <p className="area-description">{area.description}</p>
            </div>
          ))}
        </div>
        
        {/* Recommendations */}
        <div className="recommendations">
          <h4 className="recommendations-title">Recommendations Based on Assessment:</h4>
          <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
              <li key={index} className="recommendation-item">{rec}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* CSS styles */}
      <style jsx>{`
        .quality-assessment-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .quality-assessment-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin-bottom: 20px;
        }
        
        .quality-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .quality-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .quality-score {
          display: flex;
          align-items: baseline;
        }
        
        .score-value {
          font-size: 28px;
          font-weight: 700;
        }
        
        .score-max {
          font-size: 18px;
          color: #777;
          margin-left: 2px;
        }
        
        .quality-progress-container {
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .quality-progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        
        .quality-level {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        
        .assessment-areas {
          margin-bottom: 24px;
        }
        
        .areas-title, .recommendations-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
        }
        
        .assessment-area {
          background-color: #f8f9fa;
          border-left: 4px solid #6c757d;
          padding: 12px 16px;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        
        .area-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        
        .area-name {
          font-weight: 600;
          color: #333;
        }
        
        .area-status {
          font-size: 14px;
          background-color: #e9ecef;
          padding: 4px 8px;
          border-radius: 4px;
          color: #495057;
        }
        
        .area-description {
          color: #495057;
          margin: 0;
        }
        
        .recommendations-list {
          padding-left: 20px;
          margin: 0;
        }
        
        .recommendation-item {
          color: #495057;
          margin-bottom: 8px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default StudyQualityAssessment;