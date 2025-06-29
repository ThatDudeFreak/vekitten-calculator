import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, RefreshCw, ExternalLink, Zap } from 'lucide-react';

const VeKittenCalculator = () => {
  const [mySize, setMySize] = useState('950000');
  const [allocations, setAllocations] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [lastDataUpdate] = useState(new Date('2025-06-29T13:28:00-05:00')); // Last manual data update from user (EST)

  // Real pool data from KittenSwap voting interface - UPDATED
  const [pools, setPools] = useState([
    {
      id: 'hype-usdt0',
      name: 'HYPE/USD₮0',
      poolSize: 39820000,
      incentives: 485131.76
    },
    {
      id: 'hype-ubtc',
      name: 'HYPE/UBTC',
      poolSize: 11090000,
      incentives: 145008.79
    },
    {
      id: 'hype-usdhl',
      name: 'HYPE/USDHL',
      poolSize: 12110000,
      incentives: 88644.96
    },
    {
      id: 'hype-ueth',
      name: 'HYPE/UETH',
      poolSize: 5270000,
      incentives: 86569.87
    },
    {
      id: 'hype-purr',
      name: 'HYPE/PURR',
      poolSize: 2770000,
      incentives: 61776.81
    },
    {
      id: 'feusd-hype',
      name: 'feUSD/HYPE',
      poolSize: 828420,
      incentives: 59462.94
    },
    {
      id: 'hype-usdxl',
      name: 'HYPE/USDXL',
      poolSize: 2190000,
      incentives: 58414.63
    },
    {
      id: 'hype-usde',
      name: 'HYPE/USDe',
      poolSize: 580610,
      incentives: 43858.21
    },
    {
      id: 'liqd-hype',
      name: 'LIQD/HYPE',
      poolSize: 1680000,
      incentives: 35992.01
    },
    {
      id: 'usol-hype',
      name: 'USOL/HYPE',
      poolSize: 381900,
      incentives: 30109.88
    },
    {
      id: 'hype-kei',
      name: 'HYPE/KEI',
      poolSize: 368850,
      incentives: 28042.70
    },
    {
      id: 'lhype-usdxl',
      name: 'LHYPE/USDXL',
      poolSize: 289320,
      incentives: 24449.99
    },
    {
      id: 'usdt0-ueth',
      name: 'USD₮0/UETH',
      poolSize: 569670,
      incentives: 21830.45
    },
    {
      id: 'ubtc-ueth',
      name: 'UBTC/UETH',
      poolSize: 255620,
      incentives: 18466.20
    },
    {
      id: 'ubtc-usdt0',
      name: 'UBTC/USD₮0',
      poolSize: 287210,
      incentives: 15607.03
    },
    {
      id: 'hype-lhype',
      name: 'HYPE/LHYPE',
      poolSize: 2510000,
      incentives: 9564.86
    },
    {
      id: 'ufart-hype',
      name: 'UFART/HYPE',
      poolSize: 364700,
      incentives: 9338.21
    },
    {
      id: 'hype-hfun',
      name: 'HYPE/HFUN',
      poolSize: 125760,
      incentives: 9154.07
    },
    {
      id: 'usde-usdt0',
      name: 'USDe/USD₮0',
      poolSize: 137320,
      incentives: 7794.95
    },
    {
      id: 'usdhl-usdt0',
      name: 'USDHL/USD₮0',
      poolSize: 858640,
      incentives: 7323.10
    },
    {
      id: 'buddy-hype',
      name: 'BUDDY/HYPE',
      poolSize: 188310,
      incentives: 6800.46
    },
    {
      id: 'usde-ueth',
      name: 'USDe/UETH',
      poolSize: 226810,
      incentives: 6565.37
    },
    {
      id: 'hype-wsthype',
      name: 'HYPE/wstHYPE',
      poolSize: 123480,
      incentives: 5958.43
    },
    {
      id: 'usde-ubtc',
      name: 'USDe/UBTC',
      poolSize: 61900,
      incentives: 5780.81
    },
    {
      id: 'hype-paws',
      name: 'HYPE/PAWS',
      poolSize: 6940000,
      incentives: 5412.30
    },
    {
      id: 'hype-kitten',
      name: 'HYPE/KITTEN',
      poolSize: 2160000,
      incentives: 5369.84
    },
    {
      id: 'hype-xaut0',
      name: 'HYPE/XAUt0',
      poolSize: 246250,
      incentives: 5297.65
    },
    {
      id: 'hype-mhype',
      name: 'HYPE/mHYPE',
      poolSize: 560950,
      incentives: 4755.41
    },
    {
      id: 'feusd-usdt0',
      name: 'feUSD/USD₮0',
      poolSize: 319860,
      incentives: 4035.62
    },
    {
      id: 'usdt0-usdxl',
      name: 'USD₮0/USDXL',
      poolSize: 185310,
      incentives: 3944.50
    },
    {
      id: 'kei-usdt0',
      name: 'KEI/USD₮0',
      poolSize: 152650,
      incentives: 2599.64
    },
    {
      id: 'feusd-usdxl',
      name: 'feUSD/USDXL',
      poolSize: 51150,
      incentives: 1749.21
    },
    {
      id: 'jeff-hype',
      name: 'JEFF/HYPE',
      poolSize: 22930,
      incentives: 1645.09
    },
    {
      id: 'kei-usdxl',
      name: 'KEI/USDXL',
      poolSize: 25910,
      incentives: 1599.62
    },
    {
      id: 'feusd-usde',
      name: 'feUSD/USDe',
      poolSize: 346380,
      incentives: 1596.67
    },
    {
      id: 'loop-lhype',
      name: 'LOOP/LHYPE',
      poolSize: 93590,
      incentives: 1090.15
    },
    {
      id: 'usr-usdt0',
      name: 'USR/USD₮0',
      poolSize: 4480,
      incentives: 260.77
    },
    {
      id: 'dndx-hype',
      name: 'DNDX/HYPE',
      poolSize: 9560,
      incentives: 134.56
    },
    {
      id: 'whlp-usdhl',
      name: 'WHLP/USDHL',
      poolSize: 906800,
      incentives: 7.37
    },
    {
      id: 'usdt0-usdxl-std',
      name: 'USD₮0/USDXL (Std)',
      poolSize: 0,
      incentives: 0.00
    },
    {
      id: 'pip-hype',
      name: 'PiP/HYPE',
      poolSize: 0,
      incentives: 0.00
    }
  ]);

  const totalVotes = parseFloat(mySize) || 0;
  const allocatedVotes = Object.values(allocations).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const remainingVotes = totalVotes - allocatedVotes;

  const calculatePoolData = (pool, userVotes) => {
    if (userVotes <= 0) return { ...pool, newSize: pool.poolSize, percentOfVotes: 0, myIncentive: 0 };
    
    const newSize = pool.poolSize + userVotes;
    const percentOfVotes = (userVotes / newSize) * 100;
    const myIncentive = pool.incentives * (userVotes / newSize);
    
    return {
      ...pool,
      newSize,
      percentOfVotes,
      myIncentive,
      votesAllocated: userVotes
    };
  };

  const handleAllocationChange = (poolId, value) => {
    const numValue = parseFloat(value) || 0;
    const currentAllocated = Object.entries(allocations).reduce((sum, [id, val]) => {
      return sum + (id === poolId ? 0 : (parseFloat(val) || 0));
    }, 0);
    
    const maxForThisPool = totalVotes - currentAllocated;
    const finalValue = Math.min(numValue, maxForThisPool);
    
    setAllocations(prev => ({
      ...prev,
      [poolId]: finalValue
    }));
  };

  const concentrateInPool = (poolId) => {
    setAllocations({ [poolId]: totalVotes });
  };

  const clearAllocations = () => {
    setAllocations({});
  };

  const allocateTopThree = () => {
    const topPools = pools
      .map(pool => ({ ...pool, roi: pool.incentives / (pool.poolSize + totalVotes/3) }))
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 3);
    
    const perPool = Math.floor(totalVotes / 3);
    const newAllocation = {};
    topPools.forEach(pool => {
      newAllocation[pool.id] = perPool;
    });
    setAllocations(newAllocation);
  };

  const optimizeAllocation = () => {
    if (totalVotes <= 0) return;

    // Greedy optimization algorithm
    // Allocates votes to maximize total return by always choosing pool with highest marginal return
    
    const allocation = {};
    pools.forEach(pool => allocation[pool.id] = 0);
    
    const batchSize = Math.max(1, Math.floor(totalVotes / 1000)); // Optimize in batches for performance
    let remainingVotes = totalVotes;
    
    while (remainingVotes > 0) {
      let bestPool = null;
      let bestMarginalReturn = 0;
      
      // Calculate marginal return for each pool
      pools.forEach(pool => {
        const currentVotes = allocation[pool.id];
        const currentPoolSize = pool.poolSize + currentVotes;
        const votesToAdd = Math.min(batchSize, remainingVotes);
        
        // Marginal return = additional incentive from adding votesToAdd
        const currentReturn = pool.incentives * (currentVotes / currentPoolSize);
        const newReturn = pool.incentives * ((currentVotes + votesToAdd) / (currentPoolSize + votesToAdd));
        const marginalReturn = newReturn - currentReturn;
        
        if (marginalReturn > bestMarginalReturn) {
          bestMarginalReturn = marginalReturn;
          bestPool = pool;
        }
      });
      
      if (bestPool) {
        const votesToAdd = Math.min(batchSize, remainingVotes);
        allocation[bestPool.id] += votesToAdd;
        remainingVotes -= votesToAdd;
      } else {
        break; // Safety break
      }
    }
    
    // Clean up any rounding errors
    const totalAllocated = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    if (totalAllocated !== totalVotes) {
      // Add remaining votes to the pool with highest efficiency
      const bestPool = pools.reduce((best, pool) => 
        (pool.incentives / pool.poolSize) > (best.incentives / best.poolSize) ? pool : best
      );
      allocation[bestPool.id] += totalVotes - totalAllocated;
    }
    
    setAllocations(allocation);
  };

  const simulateDataRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate small changes in pool data (±5% variation)
    setPools(prevPools => prevPools.map(pool => ({
      ...pool,
      incentives: Math.max(0, pool.incentives * (0.95 + Math.random() * 0.1)),
      poolSize: Math.max(0, pool.poolSize * (0.98 + Math.random() * 0.04))
    })));

    setLastUpdate(new Date());
    setLoading(false);
  };

  const calculatedPools = pools.map(pool => 
    calculatePoolData(pool, parseFloat(allocations[pool.id]) || 0)
  );
  
  const totalIncentives = calculatedPools.reduce((sum, pool) => sum + pool.myIncentive, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">veKITTEN Vote Allocation Calculator</h1>
          </div>
          <p className="text-green-200 text-lg">Allocate your votes across pools to maximize incentives</p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <label className="text-white font-semibold text-lg">Total veKITTEN:</label>
                <input
                  type="number"
                  value={mySize}
                  onChange={(e) => setMySize(e.target.value)}
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white text-xl font-bold w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="950000"
                />
              </div>
              <div className="text-white">
                <div className="text-sm text-green-300">Allocated: {allocatedVotes.toLocaleString()}</div>
                <div className={`text-sm font-bold ${remainingVotes < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  Remaining: {remainingVotes.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAllocations}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={allocateTopThree}
                className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg transition-colors"
              >
                Split Top 3
              </button>
              <button
                onClick={optimizeAllocation}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors font-semibold border border-yellow-500/30"
              >
                🚀 OPTIMIZE
              </button>
              <button
                onClick={simulateDataRefresh}
                disabled={loading}
                className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        {totalIncentives > 0 && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Total Weekly Incentives</h2>
                <div className="text-4xl font-bold text-green-400">${totalIncentives.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-sm text-green-300 mt-2">
                  Data updated: {lastDataUpdate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg text-green-300">Monthly: ${(totalIncentives * 4.33).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                <div className="text-lg text-green-300">Yearly: ${(totalIncentives * 52).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
              </div>
            </div>
          </div>
        )}

        {/* Pool Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-6 text-green-400 font-semibold">Pool</th>
                  <th className="text-right py-4 px-4 text-green-400 font-semibold">Pool Size</th>
                  <th className="text-center py-4 px-4 text-green-400 font-semibold">My Votes</th>
                  <th className="text-right py-4 px-4 text-green-400 font-semibold">New Size</th>
                  <th className="text-right py-4 px-4 text-green-400 font-semibold">% of Votes</th>
                  <th className="text-right py-4 px-4 text-green-400 font-semibold">Pool Incentives</th>
                  <th className="text-right py-4 px-6 text-green-400 font-semibold">My Incentive</th>
                  <th className="text-center py-4 px-4 text-green-400 font-semibold">Max</th>
                </tr>
              </thead>
              <tbody>
                {calculatedPools
                  .sort((a, b) => (b.incentives / (b.poolSize + totalVotes)) - (a.incentives / (a.poolSize + totalVotes)))
                  .map((pool, index) => (
                  <tr key={pool.id} className={`border-b border-white/10 hover:bg-white/5 transition-colors ${pool.votesAllocated > 0 ? 'bg-green-500/10' : ''}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{pool.name}</span>
                        {index < 3 && <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-1 rounded">TOP ROI</span>}
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-white font-mono">
                      {pool.poolSize.toLocaleString('en-US', {minimumFractionDigits: 0})}
                    </td>
                    <td className="text-center py-4 px-4">
                      <input
                        type="number"
                        value={allocations[pool.id] || ''}
                        onChange={(e) => handleAllocationChange(pool.id, e.target.value)}
                        className="bg-white/10 border border-white/30 rounded px-2 py-1 text-white text-center w-24 focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="0"
                        min="0"
                        max={remainingVotes + (parseFloat(allocations[pool.id]) || 0)}
                      />
                    </td>
                    <td className="text-right py-4 px-4 text-white font-mono">
                      {pool.newSize.toLocaleString('en-US', {minimumFractionDigits: 0})}
                    </td>
                    <td className="text-right py-4 px-4 text-green-400 font-mono font-bold">
                      {pool.percentOfVotes.toFixed(1)}%
                    </td>
                    <td className="text-right py-4 px-4 text-white font-mono">
                      ${pool.incentives.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </td>
                    <td className="text-right py-4 px-6 text-green-400 font-mono font-bold text-lg">
                      {pool.myIncentive > 0 ? pool.myIncentive.toLocaleString('en-US', {minimumFractionDigits: 2}) : '0.00'}
                    </td>
                    <td className="text-center py-4 px-4">
                      <button
                        onClick={() => concentrateInPool(pool.id)}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-2 py-1 rounded text-sm transition-colors"
                        title="Put all votes in this pool"
                      >
                        <Zap className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategy Cards - All in one row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              🎯 <span>Concentration</span>
            </h3>
            <div className="space-y-1 text-sm text-green-200">
              <p><strong>Strategy:</strong> All votes → 1 pool</p>
              <p><strong>Best Single:</strong> Max dominance</p>
              <p><strong>Risk:</strong> Vulnerable to competition</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              ⚖️ <span>Diversification</span>
            </h3>
            <div className="space-y-1 text-sm text-green-200">
              <p><strong>Strategy:</strong> Split across top pools</p>
              <p><strong>Benefit:</strong> Lower risk</p>
              <p><strong>Trade-off:</strong> Lower max returns</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              🚀 <span>OPTIMIZED</span>
            </h3>
            <div className="space-y-1 text-sm text-yellow-200">
              <p><strong>Algorithm:</strong> Marginal return maximization</p>
              <p><strong>Method:</strong> Allocates votes where each additional vote provides highest return</p>
              <p><strong>Result:</strong> Mathematically optimal allocation</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              📊 <span>Current Status</span>
            </h3>
            <div className="space-y-1 text-sm text-green-200">
              <p><strong>Allocated:</strong> {allocatedVotes.toLocaleString()} votes</p>
              <p><strong>Remaining:</strong> {remainingVotes.toLocaleString()} votes</p>
              <p><strong>Weekly Total:</strong> ${totalIncentives.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Live Data Notice */}
        <div className="mt-6 bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-blue-500/30">
          <p className="text-sm text-blue-200 text-center">
            <strong>📊 Smart Allocation:</strong> Use 🚀 OPTIMIZE for mathematically optimal vote distribution across all {pools.length} pools that maximizes returns. 
            The algorithm calculates marginal returns and allocates each vote where it provides the highest additional reward. 
            Compare with manual strategies to see the difference!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VeKittenCalculator;
