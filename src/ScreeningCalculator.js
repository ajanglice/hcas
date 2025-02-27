import React, { useState } from 'react';
import './PICOTSScreeningDashboard.css';

const ScreeningCalculator = () => {
  const [values, setValues] = useState({
    truePositive: 85,
    falsePositive: 15,
    falseNegative: 10,
    trueNegative: 890,
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseInt(value, 10) || 0,
    });
  };

  const calculateMetrics = () => {
    const { truePositive, falsePositive, falseNegative, trueNegative } = values;
    
    // Calculate total positives and negatives
    const totalDisease = truePositive + falseNegative;
    const totalNonDisease = falsePositive + trueNegative;
    const totalTestPositive = truePositive + falsePositive;
    const totalTestNegative = falseNegative + trueNegative;
    const totalPopulation = totalDisease + totalNonDisease;
    
    // Calculate metrics
    const sensitivity = totalDisease ? (truePositive / totalDisease) * 100 : 0;
    const specificity = totalNonDisease ? (trueNegative / totalNonDisease) * 100 : 0;
    const ppv = totalTestPositive ? (truePositive / totalTestPositive) * 100 : 0;
    const npv = totalTestNegative ? (trueNegative / totalTestNegative) * 100 : 0;
    const prevalence = (totalDisease / totalPopulation) * 100;
    const accuracy = ((truePositive + trueNegative) / totalPopulation) * 100;
    
    setResults({
      sensitivity,
      specificity,
      ppv,
      npv,
      prevalence,
      accuracy,
      totalPopulation,
    });
  };

  return (
    <div className="screening-calculator">
      <h2>Interactive Screening Test Calculator</h2>
      <p className="description">
        Enter the values for your 2x2 contingency table to calculate sensitivity, specificity, 
        positive predictive value (PPV), and negative predictive value (NPV).
      </p>
      
      <div className="calculator-grid">
        <div className="input-section">
          <h3>Contingency Table Input</h3>
          
          <div className="contingency-table-container">
            <table className="contingency-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Disease Present</th>
                  <th>Disease Absent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Test Positive</th>
                  <td>
                    <input
                      type="number"
                      name="truePositive"
                      value={values.truePositive}
                      onChange={handleInputChange}
                    />
                    <div className="input-label">True Positive (TP)</div>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="falsePositive"
                      value={values.falsePositive}
                      onChange={handleInputChange}
                    />
                    <div className="input-label">False Positive (FP)</div>
                  </td>
                </tr>
                <tr>
                  <th>Test Negative</th>
                  <td>
                    <input
                      type="number"
                      name="falseNegative"
                      value={values.falseNegative}
                      onChange={handleInputChange}
                    />
                    <div className="input-label">False Negative (FN)</div>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="trueNegative"
                      value={values.trueNegative}
                      onChange={handleInputChange}
                    />
                    <div className="input-label">True Negative (TN)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button
            onClick={calculateMetrics}
            className="calculate-button"
          >
            Calculate Metrics
          </button>
        </div>
        
        <div className="results-section">
          {results && (
            <div className="results-container">
              <h3>Results</h3>
              
              <div className="metrics-grid">
                <div className="metric-card">
                  <h4>Sensitivity</h4>
                  <div className="metric-value primary">{results.sensitivity.toFixed(1)}%</div>
                  <p className="metric-formula">TP/(TP+FN)</p>
                </div>
                
                <div className="metric-card">
                  <h4>Specificity</h4>
                  <div className="metric-value primary">{results.specificity.toFixed(1)}%</div>
                  <p className="metric-formula">TN/(TN+FP)</p>
                </div>
                
                <div className="metric-card">
                  <h4>Positive Predictive Value</h4>
                  <div className="metric-value primary">{results.ppv.toFixed(1)}%</div>
                  <p className="metric-formula">TP/(TP+FP)</p>
                </div>
                
                <div className="metric-card">
                  <h4>Negative Predictive Value</h4>
                  <div className="metric-value primary">{results.npv.toFixed(1)}%</div>
                  <p className="metric-formula">TN/(TN+FN)</p>
                </div>
                
                <div className="metric-card">
                  <h4>Prevalence</h4>
                  <div className="metric-value secondary">{results.prevalence.toFixed(1)}%</div>
                  <p className="metric-formula">(TP+FN)/Total</p>
                </div>
                
                <div className="metric-card">
                  <h4>Accuracy</h4>
                  <div className="metric-value secondary">{results.accuracy.toFixed(1)}%</div>
                  <p className="metric-formula">(TP+TN)/Total</p>
                </div>
              </div>
              
              <div className="population-info">
                <p>Total population: <span className="highlight">{results.totalPopulation}</span> individuals</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreeningCalculator;