import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [formData, setFormData] = useState({
    income: "",
    slik_ojk: "",
    total_debt: "",
    total_credit: "",
    total_monthly_debt: "",
    loan_amount: "",
    property_value: "",
    loan_purpose: "",
    employment_status: "",
    job_tenure: "",
    home_ownership: "",
    marital_status: ""
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const [page, setPage] = useState("home");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setResult(null);

    const MIN_DURATION = 1000; // 1 detik
    const startTime = Date.now();

    let responseResult = null;

    try {
      const res = await axios.post(`${API_URL}/predict`, formData);
      responseResult = res.data.risiko;
      console.log("Backend result:", responseResult);
    } catch (err) {
      console.error("Predict error:", err);
    }

    const elapsed = Date.now() - startTime;
    const remaining = MIN_DURATION - elapsed;

    const updateResult = () => {
      console.log("Applied CSS class:", `result ${responseResult}`);
      setResult(responseResult);
      setLoading(false);
    };

    if (remaining > 0) {
      setTimeout(updateResult, remaining);
    } else {
      updateResult();
    }
  };

  const handleReset = () => {
    setFormData({
      income: "",
      slik_ojk: "",
      total_debt: "",
      total_credit: "",
      total_monthly_debt: "",
      loan_amount: "",
      property_value: "",
      loan_purpose: "",
      employment_status: "",
      job_tenure: "",
      home_ownership: "",
      marital_status: ""
    });

    setResult(null);
    setPendingResult(null);
    setLoading(false);
  };

  const handleDecimalInput = (e) => {
    let value = e.target.value;

    value = value.replace(",", ".");

    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="page-container">
      <Header onNavigate={setPage} />

      {page === "home" && (
        <div className="app-container">
          <form onSubmit={handleSubmit} className="form-box">
            <h2 className="form-title">Debt Risk Prediction</h2>

            <div className="form-grid">
              {/* Baris 1 */}
              <div className="form-group">
                <label title="Total monthly income of the debtor before tax. Unit: Million">Income</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label title="OJK's SLIK score is the result of checking a debtor's credit history. Unit: Number (1-5)">OJK Score</label>
                <input type="number" name="slik_ojk" value={formData.slik_ojk} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label title="Total of all active debts owed by the debtor. Unit: Million">Total Debt</label>
                <input type="number" name="total_debt" value={formData.total_debt} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label title="Total credit limit available to the debtor. Unit: Million">Total Credit</label>
                <input type="number" name="total_credit" value={formData.total_credit} onChange={handleChange} className="form-input" />
              </div>

              {/* Baris 2 */}
              <div className="form-group">
                <label title="Total monthly debt payment obligations. Unit: Million">Total Monthly Debt</label>
                <input type="text" name="total_monthly_debt" autoComplete="off" value={formData.total_monthly_debt} onChange={handleDecimalInput} className="form-input"/>
              </div>
              <div className="form-group">
                <label title="The amount of loan applied for by the debtor. Unit: Million">Loan Amount</label>
                <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label title="Appraisal value of the property used as collateral. Unit: Million">Property Value</label>
                <input type="number" name="property_value" value={formData.property_value} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label title="Length of service period of the debtor in the current job. Unit: Months">Job Tenure</label>
                <input type="number" name="job_tenure" value={formData.job_tenure} onChange={handleChange} className="form-input" />
              </div>

              {/* Baris 3 */}
              <div className="form-group">
                <label title="Purpose of loan (e.g., KPR, Kredit Kendaraan, Modal Kerja/Usaha). Unit: Category">Loan Purpose</label>
                <select name="loan_purpose" value={formData.loan_purpose} onChange={handleChange} className="form-input">
                  <option value="">--Choose--</option>
                  <option value="KPR">KPR</option>
                  <option value="Kredit Kendaraan">Kredit Kendaraan</option>
                  <option value="Modal Kerja/Usaha">Modal Kerja/Usaha</option>
                </select>
              </div>
              <div className="form-group">
                <label title="Debtor's employment status (Permanen, Kontrak, Freelance, and Harian). Unit: Category">Employment Status</label>
                <select name="employment_status" value={formData.employment_status} onChange={handleChange} className="form-input">
                  <option value="">--Choose--</option>
                  <option value="permanent">Permanen</option>
                  <option value="kontrak">Kontrak</option>
                  <option value="freelance">Freelance</option>
                  <option value="harian">Harian</option>
                </select>
              </div>
              <div className="form-group">
                <label title="Housing ownership status (Milik Sendiri, Sewa, Tinggal Bersama Ortu). Unit: Category">Home Ownership</label>
                <select name="home_ownership" value={formData.home_ownership} onChange={handleChange} className="form-input">
                  <option value="">--Choose--</option>
                  <option value="milik sendiri">Milik Sendiri</option>
                  <option value="sewa">Sewa</option>
                  <option value="tinggal bersama ortu">Tinggal Bersama Ortu</option>
                </select>
              </div>
              <div className="form-group">
                <label title="Debtor's marital status (Lajang, Menikah, Cerai). Unit: Category">Marital Status</label>
                <select name="marital_status" value={formData.marital_status} onChange={handleChange} className="form-input">
                  <option value="">--Choose--</option>
                  <option value="menikah">Menikah</option>
                  <option value="lajang">Lajang</option>
                  <option value="cerai">Cerai</option>
                </select>
              </div>
            </div>

            <button type="submit" className="form-button">Predict</button>

            {loading && <div className="spinner"></div>}

            {!loading && result && (
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <div className={`result ${result}`}>
                  Prediction Result: {result}
                  <button 
                    // type="button" 
                    className="reset-btn" 
                    onClick={handleReset}
                    title="Reset"
                  >
                    &#xf021;
                  </button>
                </div>                
              </div>
            )}
          </form>
        </div>
      )}

      {page === "about" && (
        <div className="app-container">
          <div className="form-box">
            <h2 className="form-title">About This Project</h2>

            <p style={{ lineHeight: "1.7", marginBottom: "20px", textAlign: "justify" }}>
              This project is a final assignment developed by my team and me for the Artificial Intelligence course, 
              created as a tool to predict the risk of late payment using the K-Nearest Neighbors (KNN) machine learning model. 
              The system evaluates several financial parameters and compares them with 
              historical data to estimate a user’s risk level, 
              providing a simple yet effective approach for early risk assessment. Through this project, 
              we aim to demonstrate how AI concepts, particularly KNN-based classification, can support faster and 
              more efficient financial analysis and decision-making.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ margin: 0 }}>Course Lecture:</h3>
              <p style={{ margin: 0 }}>Dr. Astri Novianty, S.T., M.T. (ANY)</p>
            </div>

            <h3 style={{ marginBottom: "10px" }}>Project Contributors</h3>
            <ul className="contributor-list">
              <li>Sandy Hidayatullah</li>
              <li>Muhammad Gusti Maulana Putra Falah</li>
              <li>Hanif Al Nuri</li>
            </ul>

            <p 
              style={{ 
                marginTop: "25px",
                lineHeight: "1.7",
                fontSize: "15px"
              }}
            >
              If you would like to contribute to this project, you can do so through our repository at the following link:
              <a 
                href="https://github.com/sandyxd18/debtected" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#007acc", textDecoration: "none", marginLeft: "10px" }}
              >
                GitHub Repository
              </a>
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>    
  );
}

export default App;