"use client";

import { useState } from "react";
import { RELATED_LINKS as RELATED } from "./lib/links";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .rbe-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .rbe-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .rbe-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .rbe-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .rbe-title em { font-style: italic; color: #d97706; }
  .rbe-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .rbe-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .rbe-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .rbe-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .rbe-input-wrap { position: relative; }
  .rbe-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .rbe-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; }
  .rbe-input:focus { border-color: #d97706; }
  .rbe-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .rbe-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; }
  .rbe-calc-btn:hover { background: #d97706; }
  .rbe-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .rbe-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .rbe-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .rbe-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .rbe-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .rbe-result-val.green { color: #d97706; }
  .rbe-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .rbe-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .rbe-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fbd38d; line-height: 1; margin-bottom: .4rem; }
  .rbe-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rbe-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rbe-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .rbe-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; }
  .rbe-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .rbe-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .rbe-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .rbe-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) { .rbe-field-row, .rbe-result-grid, .rbe-tip-grid { grid-template-columns: 1fr; } }
`;

function fmt(num) { return "$" + Math.round(num).toLocaleString("en-US"); }

export default function Page() {
  const [rent, setRent] = useState("");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [years, setYears] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const monthlyRent = parseFloat(rent);
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const termYears = parseFloat(loanTerm);
    const holdYears = parseFloat(years);
    if (!monthlyRent || !price || !rate || !termYears || !holdYears) return;
    const loanAmount = price - down;
    const months = termYears * 12;
    const holdMonths = holdYears * 12;
    const mortgagePayment = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const homeAppreciation = 0.03, rentIncrease = 0.02, investmentReturn = 0.07;
    let homeValue = price, remainingLoan = loanAmount;
    for (let i = 0; i < holdMonths; i++) {
      const interestThisMonth = remainingLoan * rate;
      const principalThisMonth = mortgagePayment - interestThisMonth;
      remainingLoan -= principalThisMonth;
      if (i % 12 === 11) homeValue = homeValue * (1 + homeAppreciation);
    }
    const netProceeds = homeValue - Math.max(0, remainingLoan) - (homeValue * 0.06);
    let monthlyRentCurrent = monthlyRent, totalRentPaid = 0;
    for (let i = 0; i < holdMonths; i++) { totalRentPaid += monthlyRentCurrent; if (i % 12 === 11) monthlyRentCurrent = monthlyRentCurrent * (1 + rentIncrease); }
    let investedDown = down;
    for (let i = 0; i < holdYears; i++) investedDown = investedDown * (1 + investmentReturn);
    const monthlyDiff = mortgagePayment - monthlyRent;
    let investedSavings = 0;
    if (monthlyDiff > 0) for (let i = 0; i < holdMonths; i++) investedSavings = investedSavings * (1 + investmentReturn/12) + monthlyDiff;
    const rentingNetWorth = investedDown + investedSavings;
    const buyingNetWorth = netProceeds;
    const winner = buyingNetWorth > rentingNetWorth ? "Buying" : "Renting";
    setResults({ buyingNetWorth: Math.round(buyingNetWorth), rentingNetWorth: Math.round(rentingNetWorth), winner, difference: Math.abs(buyingNetWorth - rentingNetWorth), holdYears });
  };

  return (
    <>
      <style>{css}</style>
      <main className="rbe-wrap">
        <div className="rbe-header">
          <p className="rbe-eyebrow">Housing Decision</p>
          <h1 className="rbe-title">Rent vs Buy<br /><em>Estimator</em></h1>
        </div>
        <div className="rbe-card">
          <div className="rbe-field-row">
            <div><label className="rbe-field-label">Monthly rent</label><div className="rbe-input-wrap"><span className="rbe-prefix">$</span><input className="rbe-input" type="number" value={rent} onChange={e => setRent(e.target.value)} /></div></div>
            <div><label className="rbe-field-label">Home price</label><div className="rbe-input-wrap"><span className="rbe-prefix">$</span><input className="rbe-input" type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)} /></div></div>
          </div>
          <div className="rbe-field-row">
            <div><label className="rbe-field-label">Down payment</label><div className="rbe-input-wrap"><span className="rbe-prefix">$</span><input className="rbe-input" type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} /></div></div>
            <div><label className="rbe-field-label">Interest rate</label><div className="rbe-input-wrap"><input className="rbe-input" type="number" step="0.125" value={interestRate} onChange={e => setInterestRate(e.target.value)} /><span className="rbe-suffix">%</span></div></div>
          </div>
          <div className="rbe-field-row">
            <div><label className="rbe-field-label">Loan term</label><select className="rbe-select" value={loanTerm} onChange={e => setLoanTerm(e.target.value)}><option value="15">15 years</option><option value="30">30 years</option></select></div>
            <div><label className="rbe-field-label">How many years will you stay?</label><input className="rbe-input" type="number" value={years} onChange={e => setYears(e.target.value)} /></div>
          </div>
          <button className="rbe-calc-btn" onClick={calculate}>Compare rent vs buy →</button>
          {results && (<div className="rbe-results"><div className="rbe-result-grid"><div className="rbe-result-cell"><p className="rbe-result-label">If you buy</p><p className={`rbe-result-val ${results.winner === "Buying" ? "green" : ""}`}>{fmt(results.buyingNetWorth)}</p></div><div className="rbe-result-cell"><p className="rbe-result-label">If you rent</p><p className={`rbe-result-val ${results.winner === "Renting" ? "green" : ""}`}>{fmt(results.rentingNetWorth)}</p></div></div><div className="rbe-prose" style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}><p><strong>Winner:</strong> {results.winner} by {fmt(results.difference)} over {results.holdYears} years (3% appreciation, 7% returns).</p></div></div>)}
        </div>
        <div className="rbe-card"><p className="rbe-section-title">The math behind rent vs buy</p><div className="rbe-prose"><p>Most people assume buying is always better than renting. But the math depends heavily on how long you stay. Buying involves closing costs (2-3%) and selling costs (6%), which total 8-9% of your home's value. Stay 7+ years, and buying typically wins.</p><p><strong>Breakeven point:</strong> In most markets, buying beats renting if you stay 4-6 years. Under 3 years, renting almost always wins.</p></div></div>
        <div className="rbe-card"><p className="rbe-section-title">When each choice makes sense</p><div className="rbe-tip-grid"><div><p className="rbe-tip-num">01</p><p className="rbe-tip-title">Buy if staying 7+ years</p><p className="rbe-tip-body">Transaction costs get diluted, equity builds.</p></div><div><p className="rbe-tip-num">02</p><p className="rbe-tip-title">Rent if staying under 3 years</p><p className="rbe-tip-body">Closing costs and realtor fees eat any gains.</p></div><div><p className="rbe-tip-num">03</p><p className="rbe-tip-title">Buy in slow-appreciation markets</p><p className="rbe-tip-body">You need even more time to break even.</p></div><div><p className="rbe-tip-num">04</p><p className="rbe-tip-title">Rent in expensive coastal cities</p><p className="rbe-tip-body">Renting + investing often wins indefinitely.</p></div></div></div>
        <div className="rbe-card"><p className="rbe-section-title">Related tools</p><div className="rbe-related-links">{RELATED.map((r, i) => (<a key={i} className="rbe-related-link" href={r.href}>{r.label}</a>))}</div><div className="rbe-disclaimer">Estimates only. Actual results vary by location. Consult a professional before making housing decisions.<div className="rbe-footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div></div></div>
      </main>
    </>
  );
}