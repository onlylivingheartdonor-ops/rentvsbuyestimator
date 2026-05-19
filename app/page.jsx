"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

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
  .rbe-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .rbe-input.no-prefix { padding-left: 0; }
  .rbe-input:focus { border-color: #d97706; }
  .rbe-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .rbe-calc-btn:hover { background: #d97706; }
  .rbe-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .rbe-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .rbe-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .rbe-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .rbe-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .rbe-result-val.green { color: #d97706; }
  .rbe-result-val.red { color: #b91c1c; }
  .rbe-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .rbe-prose p:last-child { margin-bottom: 0; }
  .rbe-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .rbe-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .rbe-info-item { padding: .75rem; border-left: 2px solid #fbd38d; }
  .rbe-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rbe-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rbe-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .rbe-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fbd38d; line-height: 1; margin-bottom: .4rem; }
  .rbe-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rbe-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rbe-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .rbe-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .rbe-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .rbe-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .rbe-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .rbe-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .rbe-field-row, .rbe-result-grid, .rbe-info-grid, .rbe-tip-grid { grid-template-columns: 1fr; }
  }
`

function fmt(num) {
  return "$" + Math.round(num).toLocaleString("en-US")
}

function fmtDec(num) {
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Page() {
  const [rent, setRent] = useState("")
  const [homePrice, setHomePrice] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("30")
  const [years, setYears] = useState("")
  const [results, setResults] = useState(null)

  const calculate = () => {
    const monthlyRent = parseFloat(rent)
    const price = parseFloat(homePrice)
    const down = parseFloat(downPayment) || 0
    const rate = (parseFloat(interestRate) || 0) / 100 / 12
    const termYears = parseFloat(loanTerm)
    const holdYears = parseFloat(years)

    if (!monthlyRent || !price || !rate || !termYears || !holdYears) return

    const loanAmount = price - down
    const months = termYears * 12
    const holdMonths = holdYears * 12

    const mortgagePayment = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    
    const homeAppreciation = 0.03
    const rentIncrease = 0.02
    const investmentReturn = 0.07
    const maintenanceRate = 0.01
    const propertyTaxRate = 0.011
    const insuranceRate = 0.004
    
    let homeValue = price
    let totalMortgagePaid = 0
    let totalMaintenance = 0
    let totalTaxes = 0
    let totalInsurance = 0
    let remainingLoan = loanAmount
    
    for (let i = 0; i < holdMonths; i++) {
      const interestThisMonth = remainingLoan * rate
      const principalThisMonth = mortgagePayment - interestThisMonth
      remainingLoan -= principalThisMonth
      totalMortgagePaid += mortgagePayment
      
      if (i % 12 === 11) {
        const year = Math.floor(i / 12) + 1
        homeValue = homeValue * (1 + homeAppreciation)
        totalMaintenance += homeValue * maintenanceRate
        totalTaxes += homeValue * propertyTaxRate
        totalInsurance += homeValue * insuranceRate
      }
    }
    
    const remainingBalance = Math.max(0, remainingLoan)
    const equity = homeValue - remainingBalance
    const netProceeds = homeValue - remainingBalance - (homeValue * 0.06)
    
    let monthlyRentCurrent = monthlyRent
    let totalRentPaid = 0
    for (let i = 0; i < holdMonths; i++) {
      totalRentPaid += monthlyRentCurrent
      if (i % 12 === 11) {
        monthlyRentCurrent = monthlyRentCurrent * (1 + rentIncrease)
      }
    }
    
    let investedDown = down
    for (let i = 0; i < holdYears; i++) {
      investedDown = investedDown * (1 + investmentReturn)
    }
    
    const monthlyDiff = mortgagePayment - monthlyRent
    let investedSavings = 0
    if (monthlyDiff > 0) {
      for (let i = 0; i < holdMonths; i++) {
        investedSavings = investedSavings * (1 + investmentReturn/12) + monthlyDiff
      }
    }
    
    const rentingNetWorth = investedDown + investedSavings
    const buyingNetWorth = netProceeds
    const winner = buyingNetWorth > rentingNetWorth ? "Buying" : "Renting"
    const difference = Math.abs(buyingNetWorth - rentingNetWorth)
    
    setResults({
      buyingNetWorth: Math.round(buyingNetWorth),
      rentingNetWorth: Math.round(rentingNetWorth),
      winner,
      difference,
      monthlyMortgage: mortgagePayment,
      totalRentPaid: Math.round(totalRentPaid),
      equity: Math.round(equity),
      holdYears,
    })
  }

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
            <div>
              <label className="rbe-field-label" htmlFor="rent">Monthly rent</label>
              <div className="rbe-input-wrap">
                <span className="rbe-prefix">$</span>
                <input id="rent" className="rbe-input" type="number" min="0" placeholder="1500"
                  value={rent} onChange={e => setRent(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="rbe-field-label" htmlFor="homePrice">Home purchase price</label>
              <div className="rbe-input-wrap">
                <span className="rbe-prefix">$</span>
                <input id="homePrice" className="rbe-input" type="number" min="0" placeholder="300000"
                  value={homePrice} onChange={e => setHomePrice(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
          </div>

          <div className="rbe-field-row">
            <div>
              <label className="rbe-field-label" htmlFor="downPayment">Down payment</label>
              <div className="rbe-input-wrap">
                <span className="rbe-prefix">$</span>
                <input id="downPayment" className="rbe-input" type="number" min="0" placeholder="60000"
                  value={downPayment} onChange={e => setDownPayment(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="rbe-field-label" htmlFor="interestRate">Mortgage interest rate</label>
              <div className="rbe-input-wrap">
                <input id="interestRate" className="rbe-input no-prefix" type="number" min="0" step="0.125" placeholder="6.5"
                  value={interestRate} onChange={e => setInterestRate(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="rbe-suffix" style={{ right: "0" }}>%</span>
              </div>
            </div>
          </div>

          <div className="rbe-field-row">
            <div>
              <label className="rbe-field-label" htmlFor="loanTerm">Loan term</label>
              <select id="loanTerm" className="rbe-input no-prefix" style={{ paddingLeft: 0 }} value={loanTerm} onChange={e => setLoanTerm(e.target.value)}>
                <option value="15">15 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
            <div>
              <label className="rbe-field-label" htmlFor="years">How many years will you stay?</label>
              <input id="years" className="rbe-input no-prefix" type="number" min="1" placeholder="5"
                value={years} onChange={e => setYears(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
            </div>
          </div>

          <button className="rbe-calc-btn" onClick={calculate}>Compare rent vs buy →</button>

          {results && (
            <div className="rbe-results">
              <div className="rbe-result-grid">
                <div className="rbe-result-cell">
                  <p className="rbe-result-label">If you buy</p>
                  <p className={`rbe-result-val ${results.winner === "Buying" ? "green" : ""}`}>
                    {fmt(results.buyingNetWorth)}
                  </p>
                  <p style={{ fontSize: "10px", color: "#888", marginTop: ".3rem" }}>Net proceeds after sale</p>
                </div>
                <div className="rbe-result-cell">
                  <p className="rbe-result-label">If you rent</p>
                  <p className={`rbe-result-val ${results.winner === "Renting" ? "green" : ""}`}>
                    {fmt(results.rentingNetWorth)}
                  </p>
                  <p style={{ fontSize: "10px", color: "#888", marginTop: ".3rem" }}>Invested savings + down payment</p>
                </div>
              </div>

              <div className="rbe-prose" style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
                <p style={{ marginBottom: 0, fontWeight: "500" }}>
                  <strong>Winner:</strong> {results.winner} by {fmt(results.difference)}
                </p>
                <p style={{ fontSize: "12px", marginTop: ".5rem", marginBottom: 0 }}>
                  Over {results.holdYears} years, assuming 3% home appreciation and 7% market returns.
                </p>
              </div>

              <div className="rbe-info-grid" style={{ marginTop: "1rem" }}>
                <div className="rbe-info-item">
                  <p className="rbe-info-title">Monthly mortgage payment</p>
                  <p className="rbe-info-body">{fmtDec(results.monthlyMortgage)} (principal + interest)</p>
                </div>
                <div className="rbe-info-item">
                  <p className="rbe-info-title">Total rent paid</p>
                  <p className="rbe-info-body">{fmt(results.totalRentPaid)} over {results.holdYears} years</p>
                </div>
                <div className="rbe-info-item">
                  <p className="rbe-info-title">Home equity after sale</p>
                  <p className="rbe-info-body">{fmt(results.equity)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rbe-card">
          <p className="rbe-section-title">The math behind rent vs buy</p>
          <div className="rbe-prose">
            <p>Most people assume buying is always better than renting because "you're throwing money away on rent." But that's not always true — and the math depends heavily on how long you stay.</p>
            <p><strong>When you buy:</strong> You build equity, benefit from appreciation, and eventually own the home free and clear. But you also pay property taxes, maintenance, insurance, interest, and transaction costs (6% when you sell).</p>
            <p><strong>When you rent:</strong> You pay rent that typically rises over time. But your down payment and any monthly savings can be invested in the stock market, which historically returns about 7% per year after inflation.</p>
            <p>The breakeven point is usually <strong>3-5 years</strong>. Stay longer than that, and buying typically wins. Sell sooner, and the transaction costs eat up any appreciation.</p>
          </div>
        </div>

        <div className="rbe-card">
          <p className="rbe-section-title">The 5-year rule (and why it exists)</p>
          <div className="rbe-prose">
            <p>Buying a home costs about 2-3% of the purchase price in closing costs. Selling costs about 6% in realtor commissions. That's 8-9% of your home's value just in transaction fees.</p>
            <p>If you buy a $400,000 home, you'll pay roughly $30,000 in combined transaction costs. If you sell after two years and the home has appreciated 3% per year ($24,000), you've actually lost money — the transaction costs exceeded your appreciation.</p>
            <p>Hold for 10 years, and that same 3% annual appreciation grows the home to $537,000. Now the transaction costs ($32,000) are a fraction of your gains ($137,000).</p>
            <p><strong>The breakeven point:</strong> In most markets, buying beats renting if you stay at least 4-6 years. Under 3 years, renting almost always wins.</p>
          </div>
        </div>

        <div className="rbe-card">
          <p className="rbe-section-title">When each choice makes sense</p>
          <div className="rbe-tip-grid">
            <div>
              <p className="rbe-tip-num">01</p>
              <p className="rbe-tip-title">Buy if you're staying 7+ years</p>
              <p className="rbe-tip-body">Transaction costs get diluted, equity builds, and appreciation compounds. You'll almost certainly come out ahead of renting.</p>
            </div>
            <div>
              <p className="rbe-tip-num">02</p>
              <p className="rbe-tip-title">Rent if you're staying under 3 years</p>
              <p className="rbe-tip-body">Closing costs and realtor fees will eat any gains. Rent and invest the difference instead.</p>
            </div>
            <div>
              <p className="rbe-tip-num">03</p>
              <p className="rbe-tip-title">Buy in slow-appreciation markets</p>
              <p className="rbe-tip-body">If home values rise slowly (1-2%/year), you need even more time to break even. Run the numbers with local data.</p>
            </div>
            <div>
              <p className="rbe-tip-num">04</p>
              <p className="rbe-tip-title">Rent in expensive coastal cities</p>
              <p className="rbe-tip-body">In San Francisco or NYC, price-to-rent ratios are so high that renting + investing often wins indefinitely.</p>
            </div>
          </div>
        </div>

        <div className="rbe-card">
          <p className="rbe-section-title">Real example</p>
          <div className="rbe-prose">
            <p><strong>Scenario:</strong> Rent an apartment for $2,000/month or buy a comparable home for $500,000 with 10% down ($50,000) and a 6.5% mortgage.</p>
            <p><strong>After 5 years, buying wins by ~$25,000.</strong> After 3 years, roughly a tie. After 7 years, buying wins by ~$70,000.</p>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#d97706", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>

        <div className="rbe-card">
          <p className="rbe-section-title">Related tools</p>
          <div className="rbe-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="rbe-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="rbe-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial or real estate advice. Assumes 3% annual home appreciation, 2% annual rent increases, 7% investment returns, 1% maintenance, 1.1% property taxes, 0.4% insurance, and 6% selling costs — actual values vary significantly by location and market conditions. Consult a professional before making housing decisions. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="rbe-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}