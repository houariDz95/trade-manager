"use client"
import React, { useEffect, useState } from "react"

export default function SmartTradeManagerPage() {
  const STORAGE_KEY = "smart_trade_manager_manual_v2"

  const defaults = {
    balance: 1000.0,
    payoutPercent: 92,
    manualTradeAmount: 1.8,
    desiredProfitPercent: 0.1,
    maxStakePercent: 30,
    sumLosses: 0.0,
    history: [],
    goalAmount: 30,
    goalSessions: 10,
    currentSession: 1,
  }

  const [balance, setBalance] = useState(defaults.balance)
  const [payoutPercent, setPayoutPercent] = useState(defaults.payoutPercent)
  const [manualTradeAmount, setManualTradeAmount] = useState(defaults.manualTradeAmount)
  const [desiredProfitPercent, setDesiredProfitPercent] = useState(defaults.desiredProfitPercent)
  const [maxStakePercent, setMaxStakePercent] = useState(defaults.maxStakePercent)
  const [sumLosses, setSumLosses] = useState(defaults.sumLosses)
  const [history, setHistory] = useState(defaults.history)
  const [goalAmount, setGoalAmount] = useState(defaults.goalAmount)
  const [goalSessions, setGoalSessions] = useState(defaults.goalSessions)
  const [currentSession, setCurrentSession] = useState(defaults.currentSession)

  const [nextStake, setNextStake] = useState(0)
  const [warning, setWarning] = useState("")

  function fmt(x) {
    return Number(Math.round(x * 100) / 100).toFixed(2)
  }

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        Object.keys(defaults).forEach(key => {
          if (parsed[key] !== undefined) {
            switch (typeof defaults[key]) {
              case "number":
                eval(`set${capitalize(key)}(Number(parsed[key]))`)
                break
              case "object":
                eval(`set${capitalize(key)}(parsed[key])`)
                break
              default:
                eval(`set${capitalize(key)}(parsed[key])`)
            }
          }
        })
      }
    } catch (e) {
      console.warn("load failed", e)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    const payload = {
      balance,
      payoutPercent,
      manualTradeAmount,
      desiredProfitPercent,
      maxStakePercent,
      sumLosses,
      history,
      goalAmount,
      goalSessions,
      currentSession
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [
    balance,
    payoutPercent,
    manualTradeAmount,
    desiredProfitPercent,
    maxStakePercent,
    sumLosses,
    history,
    goalAmount,
    goalSessions,
    currentSession
  ])

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function roundToCents(x) {
    return Math.round(x * 100) / 100
  }

  function computeNextStake({ _balance = balance, _sumLosses = sumLosses, _manual = manualTradeAmount } = {}) {
    setWarning("")
    const B = Number(_balance)
    const r = Number(payoutPercent) / 100
    if (!(B > 0) || !(r > 0)) return 0

    const desiredProfit = (Number(desiredProfitPercent) / 100) * B
    const cap = (Number(maxStakePercent) / 100) * B

    if (!(_sumLosses > 0.000001)) {
      const stake = Math.min(Number(_manual), cap)
      return roundToCents(Math.max(0.01, stake))
    }

    const required = (Number(_sumLosses) + desiredProfit) / r
    if (required > cap) {
      setWarning(`Required stake $${fmt(required)} exceeds cap $${fmt(cap)}.`)
    }

    const final = Math.max(required, Number(_manual))
    const limited = Math.min(final, cap)

    return roundToCents(Math.max(0.01, limited))
  }

  useEffect(() => {
    setNextStake(computeNextStake())
  }, [balance, payoutPercent, manualTradeAmount, desiredProfitPercent, maxStakePercent, sumLosses])

  function recordWin() {
    const stake = Number(nextStake)
    if (!(stake > 0)) return
    const r = Number(payoutPercent) / 100
    const profit = roundToCents(r * stake)
    setBalance(roundToCents(balance + profit))
    setSumLosses(0)
    setHistory(h => [{ type: "win", stake, profit, ts: Date.now() }, ...h].slice(0, 500))
  }

  function recordLoss() {
    const stake = Number(nextStake)
    if (!(stake > 0)) return
    setBalance(roundToCents(balance - stake))
    setSumLosses(roundToCents(sumLosses + stake))
    setHistory(h => [{ type: "loss", stake, profit: -stake, ts: Date.now() }, ...h].slice(0, 500))
  }

  function resetSession() {
    setHistory([])
    setSumLosses(0)
    setWarning("")
    setCurrentSession(currentSession + 1)
  }

  function resetAll() {
    Object.keys(defaults).forEach(key => {
      eval(`set${capitalize(key)}(defaults[key])`)
    })
    setWarning("")
  }

  // Stats
  const totalTrades = history.length
  const wins = history.filter(h => h.type === "win").length
  const losses = history.filter(h => h.type === "loss").length
  const totalProfit = history.reduce((acc, h) => acc + h.profit, 0)
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-start justify-center">
      <div className="max-w-5xl w-full bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-2">Smart Trade Manager</h1>
        <p className="text-sm text-gray-300 mb-4">Manage trades manually. Press Loss or Win after each trade.</p>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <label>
            <div className="text-xs text-gray-400">Balance ($)</div>
            <input type="number" step="0.01" value={balance} onChange={e => setBalance(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 text-white p-2" />
          </label>
          <label>
            <div className="text-xs text-gray-400">Payout %</div>
            <input type="number" step="0.1" value={payoutPercent} onChange={e => setPayoutPercent(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 text-white p-2" />
          </label>
          <label>
            <div className="text-xs text-gray-400">Manual Trade ($)</div>
            <input type="number" step="0.01" value={manualTradeAmount} onChange={e => setManualTradeAmount(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 text-white p-2" />
          </label>
          <label>
            <div className="text-xs text-gray-400">Desired Profit %</div>
            <input type="number" step="0.01" value={desiredProfitPercent} onChange={e => setDesiredProfitPercent(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 text-white p-2" />
          </label>
        </div>

        {/* Goal tracking */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <label>
            <div className="text-xs text-gray-400">Goal Profit ($)</div>
            <input type="number" step="0.01" value={goalAmount} onChange={e => setGoalAmount(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 text-white p-2" />
          </label>
          <label>
            <div className="text-xs text-gray-400">Goal Sessions</div>
            <input type="number" value={goalSessions} onChange={e => setGoalSessions(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-700 text-white p-2" />
          </label>
          <div className="p-3 border border-gray-700 rounded bg-gray-700">
            <div className="text-xs text-gray-400">Current Session</div>
            <div className="text-lg font-semibold">{currentSession} / {goalSessions}</div>
          </div>
        </div>

        {/* Stake Info */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 border border-gray-700 rounded bg-gray-700">
            <div className="text-xs text-gray-400">Accumulated Losses</div>
            <div className="text-lg font-semibold">${fmt(sumLosses)}</div>
          </div>
          <div className={`p-3 border rounded ${nextStake > (maxStakePercent / 100) * balance ? 'border-red-500 bg-red-800' : 'border-gray-700 bg-gray-700'}`}>
            <div className="text-xs text-gray-400">Next Stake</div>
            <div className="text-2xl font-semibold">${fmt(nextStake)}</div>
            <div className="text-xs text-gray-400 mt-1">Win → ${fmt(balance + nextStake * (payoutPercent / 100))}</div>
            <div className="text-xs text-gray-400">Loss → ${fmt(balance - nextStake)}</div>
          </div>
          <div className="p-3 border border-gray-700 rounded bg-gray-700">
            <div className="text-xs text-gray-400">Win Rate</div>
            <div className="text-lg font-semibold">{winRate}%</div>
            <div className="text-xs text-gray-400">P/L: ${fmt(totalProfit)}</div>
          </div>
        </div>

        {warning && <div className="mt-4 p-3 bg-yellow-900 text-yellow-300 rounded">{warning}</div>}

        {/* Controls */}
        <div className="mt-4 flex gap-3">
          <button onClick={recordWin} className="px-4 py-2 rounded bg-green-600">Win</button>
          <button onClick={recordLoss} className="px-4 py-2 rounded bg-red-600">Loss</button>
          <button onClick={() => setNextStake(computeNextStake())} className="px-4 py-2 rounded bg-blue-600">Recalc</button>
          <button onClick={resetSession} className="px-4 py-2 rounded bg-gray-600">Reset Session</button>
          <button onClick={resetAll} className="px-4 py-2 rounded bg-red-700">Reset All</button>
        </div>

        {/* History */}
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">History</h2>
          <div className="max-h-56 overflow-auto border border-gray-700 rounded">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-700">
                  <th className="p-2">When</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Stake</th>
                  <th className="p-2">Profit / Loss</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 && <tr><td className="p-2" colSpan={4}>No trades yet</td></tr>}
                {history.map((h, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="p-2">{new Date(h.ts).toLocaleString()}</td>
                    <td className="p-2">{h.type.toUpperCase()}</td>
                    <td className="p-2">${fmt(h.stake)}</td>
                    <td className={`p-2 ${h.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                      {h.type === 'win' ? ('+$' + fmt(h.profit)) : ('-$' + fmt(h.stake))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
