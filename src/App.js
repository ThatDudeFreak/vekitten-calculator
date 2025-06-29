import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, RefreshCw, ExternalLink, Zap, AlertTriangle, Lock, Unlock } from 'lucide-react';

const VeKittenCalculator = () => {
  const [mySize, setMySize] = useState('950000');
  const [allocations, setAllocations] = useState({});
  const [lockedAllocations, setLockedAllocations] = useState({}); // Track which pools are locked
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const lastDataUpdate = 'Jun 29, 2025 4:00 PM EST'; // Static date - update manually

  // Real pool data from KittenSwap voting interface - UPDATED
  const [pools, setPools] = useState([
    {
      id: 'hype-usdt0',
      name: 'HYPE/USD₮0',
      poolSize: 40320000,
      incentives: 483121.70
    },
    {
      id: 'hype-ubtc',
      name: 'HYPE/UBTC',
      poolSize: 11200000,
      incentives: 144438.02
    },
    {
      id: 'hype-usdhl',
      name: 'HYPE/USDHL',
      poolSize: 12120000,
      incentives: 88299.60
    },
    {
      id: 'hype-ueth',
      name: 'HYPE/UETH',
      poolSize: 5290000,
      incentives: 86170.38
    },
    {
      id: 'hype-purr',
      name: 'HYPE/PURR',
      poolSize: 2780000,
      incentives: 61398.78
    },
    {
      id: 'feusd-hype',
      name: 'feUSD/HYPE',
      poolSize: 843060,
      incentives: 59128.20
    },
    {
      id: 'hype-usdxl',
      name: 'HYPE/USDXL',
      poolSize: 2280000,
      incentives: 58157.35
    },
    {
      id: 'hype-usde',
      name: 'HYPE/USDe',
      poolSize: 582060,
      incentives: 43682.64
    },
    {
      id: 'liqd-hype',
      name: 'LIQD/HYPE',
      poolSize: 1710000,
      incentives: 35853.81
    },
    {
      id: 'usol-hype',
      name: 'USOL/HYPE',
      poolSize: 402200,
      incentives: 30084.22
    },
    {
      id: 'hype-kei',
      name: 'HYPE/KEI',
      poolSize: 370840,
      incentives: 27804.46
    },
    {
      id: 'lhype-usdxl',
      name: 'LHYPE/USDXL',
      poolSize: 289840,
      incentives: 24316.05
    },
    {
      id: 'usdt0-ueth',
      name: 'USD₮0/UETH',
      poolSize: 569670,
      incentives: 21829.40
    },
    {
      id: 'ubtc-ueth',
      name: 'UBTC/UETH',
      poolSize: 317580,
      incentives: 18463.29
    },
    {
      id: 'ubtc-usdt0',
      name: 'UBTC/USD₮0',
      poolSize: 684350,
      incentives: 15622.02
    },
    {
      id: 'hype-lhype',
      name: 'HYPE/LHYPE',
      poolSize: 2560000,
      incentives: 9480.36
    },
    {
      id: 'ufart-hype',
      name: 'UFART/HYPE',
      poolSize: 365150,
      incentives: 9224.74
    },
    {
      id: 'hype-hfun',
      name: 'HYPE/HFUN',
      poolSize: 151030,
      incentives: 9092.50
    },
    {
      id: 'usde-usdt0',
      name: 'USDe/USD₮0',
      poolSize: 137930,
      incentives: 7803.14
    },
    {
      id: 'usdhl-usdt0',
      name: 'USDHL/USD₮0',
      poolSize: 860980,
      incentives: 7322.62
    },
    {
      id: 'buddy-hype',
      name: 'BUDDY/HYPE',
      poolSize: 188310,
      incentives: 6699.63
    },
    {
      id: 'usde-ueth',
      name: 'USDe/UETH',
      poolSize: 226810,
      incentives: 6568.32
    },
    {
      id: 'hype-wsthype',
      name: 'HYPE/wstHYPE',
      poolSize: 139890,
      incentives: 5908.07
    },
    {
      id: 'usde-ubtc',
      name: 'USDe/UBTC',
      poolSize: 615080,
      incentives: 5786.61
    },
    {
      id: 'hype-xaut0',
      name: 'HYPE/XAUt0',
      poolSize: 253600,
      incentives: 5276.32
    },
    {
      id: 'hype-kitten',
      name: 'HYPE/KITTEN',
      poolSize: 2160000,
      incentives: 5322.64
    },
    {
      id: 'hype-paws',
      name: 'HYPE/PAWS',
      poolSize: 6950000,
      incentives: 5228.87
    },
    {
      id: 'hype-mhype',
      name: 'HYPE/mHYPE',
      poolSize: 561160,
      incentives: 4738.03
    },
    {
      id: 'feusd-usdt0',
      name: 'feUSD/USD₮0',
      poolSize: 319860,
      incentives: 4034.51
    },
    {
      id: 'usdt0-usdxl',
      name: 'USD₮0/USDXL',
      poolSize: 185310,
      incentives: 3949.69
    },
    {
      id: 'kei-usdt0',
      name: 'KEI/USD₮0',
      poolSize: 153800,
      incentives: 2590.89
    },
    {
      id: 'feusd-usdxl',
      name: 'feUSD/USDXL',
      poolSize: 51360,
      incentives: 1748.04
    },
    {
      id: 'jeff-hype',
      name: 'JEFF/HYPE',
      poolSize: 22930,
      incentives: 1623.29
    },
    {
      id: 'feusd-usde',
      name: 'feUSD/USDe',
      poolSize: 346380,
      incentives: 1597.05
    },
    {
      id: 'kei-usdxl',
      name: 'KEI/USDXL',
      poolSize: 27060,
      incentives: 1592.61
    },
    {
      id: 'loop-lhype',
      name: 'LOOP/LHYPE',
      poolSize: 93590,
      incentives: 1080.22
    },
    {
      id: 'usr-usdt0',
      name: 'USR/USD₮0',
      poolSize: 9750,
      incentives: 261.35
    },
    {
      id: 'dndx-hype',
      name: 'DNDX/HYPE',
      poolSize: 9560,
      incentives: 133.27
    },
    {
      id: 'whlp-usdhl',
      name: 'WHLP/USDHL',
      poolSize: 906800,
      incentives: 8.40
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

  const toggleLock = (poolId) => {
    const currentAllocation = parseFloat(allocations[poolId]) || 0;
    if (currentAllocation === 0) return; // Can't lock empty allocation
    
    setLockedAllocations(prev => ({
      ...prev,
      [poolId]: !prev[poolId]
    }));
  };

  const clearAllocations = () => {
    setAllocations({});
    setLockedAllocations({}); // Clear locks when clearing all
  };

  const clearUnlockedAllocations = () => {
    const newAllocations = {};
    Object.keys(allocations).forEach(poolId => {
      if (lockedAllocations[poolId]) {
        newAllocations[poolId] = allocations[poolId];
      }
    });
    setAllocations(newAllocations);
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

    // Start with current locked allocations
    const allocation = {};
    pools.forEach(pool => {
      allocation[pool.id] = lockedAllocations[pool.id] ? (parseFloat(allocations[pool.id]) || 0) : 0;
    });
    
    // Calculate remaining votes after accounting for locked allocations
    const lockedVotes = Object.keys(lockedAllocations).reduce((sum, poolId) => {
      return sum + (lockedAllocations[poolId] ? (parseFloat(allocations[poolId]) || 0) : 0);
    }, 0);
    
    let remainingVotes = totalVotes - lockedVotes;
    if (remainingVotes <= 0) return; // No votes left to optimize

    // Get pools that are not locked for optimization
    const optimizablePools = pools.filter(pool => !lockedAllocations[pool.id]);
    
    const batchSize = Math.max(1, Math.floor(remainingVotes / 1000)); // Optimize in batches for performance
    
    while (remainingVotes > 0) {
      let bestPool = null;
      let bestMarginalReturn = 0;
      
      // Calculate marginal return for each unlocked pool
      optimizablePools.forEach(pool => {
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
    
    // Clean up any rounding errors by adding to best unlocked pool
    const totalAllocated = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    if (totalAllocated < totalVotes && optimizablePools.length > 0) {
      const bestPool = optimizablePools.reduce((best, pool) => 
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 mb-4">
            <Calculator className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center">veKITTEN Vote Allocation Calculator</h1>
          </div>
          <p className="text-green-200 text-base md:text-lg px-4 mb-4">Allocate your votes across pools to maximize incentives</p>
          
          {/* Buy veKITTEN Button */}
          <div className="flex justify-center mb-4">
            <a 
              href="https://www.hyperwarp.fi/mx/kitten" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 backdrop-blur-lg border border-green-500/40 text-green-300 hover:text-green-200 px-4 md:px-6 py-3 rounded-xl transition-all duration-200 group"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Warp Logo SVG */}
                <circle cx="50" cy="50" r="48" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.7"/>
                <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5"/>
                <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.8"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm md:text-base">Buy more veKITTEN here</span>
                <span className="text-xs md:text-sm opacity-75 group-hover:opacity-100 transition-opacity">Hyperwarp Exchange</span>
              </div>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-blue-500/30">
            <div className="text-center">
              <div className="text-sm text-blue-300 font-semibold mb-1">% of Votes Cast</div>
              <div className="text-3xl font-bold text-blue-400">14.31%</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-sm text-green-300 font-semibold mb-1">Total Pools</div>
              <div className="text-3xl font-bold text-green-400">{pools.length}</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-sm text-purple-300 font-semibold mb-1">Active Pools</div>
              <div className="text-3xl font-bold text-purple-400">{pools.filter(p => p.incentives > 0).length}</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-sm text-orange-300 font-semibold mb-1">My Allocations</div>
              <div className="text-3xl font-bold text-orange-400">{Object.values(allocations).filter(v => v > 0).length}</div>
            </div>
          </div>
        </div>

        {/* Warning and Controls Combined Section */}
        <div className="bg-green-800/30 backdrop-blur-lg rounded-xl border border-green-600/40 mb-8">
          {/* Estimation Warning */}
          <div className="p-4 border-b border-green-600/30">
            <div className="flex items-center gap-3">
          
              <div>
                
                <div className="border border-red-500/50 rounded p-2 bg-red-500/10">
                  <p className="text-yellow-200 text-sm">
                    ⚠️ <strong>Estimates Only:</strong> These calculations are based on current data and can change significantly until the end of the epoch as more votes are cast.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <label className="text-white font-semibold text-base md:text-lg whitespace-nowrap">Total veKITTEN:</label>
                  <input
                    type="number"
                    value={mySize}
                    onChange={(e) => setMySize(e.target.value)}
                    className="bg-green-700/30 border border-green-500/50 rounded-lg px-3 md:px-4 py-2 md:py-2 text-white text-lg md:text-xl font-bold w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="950000"
                  />
                </div>
                <div className="text-white text-sm md:text-base">
                  <div className="text-green-300">Allocated: {allocatedVotes.toLocaleString()}</div>
                  <div className={`font-bold ${remainingVotes < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    Remaining: {remainingVotes.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <button
                  onClick={clearAllocations}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
                >
                  Clear All
                </button>
                <button
                  onClick={clearUnlockedAllocations}
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
                >
                  Clear Unlocked
                </button>
                <button
                  onClick={allocateTopThree}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
                >
                  Split Top 3
                </button>
                <button
                  onClick={optimizeAllocation}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-400 px-3 md:px-4 py-2 rounded-lg transition-colors font-semibold border border-yellow-500/30 text-sm md:text-base"
                >
                  🚀 OPTIMIZE
                </button>
                <button
                  onClick={simulateDataRefresh}
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 md:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm md:text-base"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {totalIncentives > 0 && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-green-500/30 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Total Weekly Incentives</h2>
                <div className="text-2xl md:text-4xl font-bold text-green-400">${totalIncentives.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-xs md:text-sm text-green-300 mt-2">
                  Data updated: {lastDataUpdate}
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-base md:text-lg text-green-300">Monthly: ${(totalIncentives * 4.33).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                <div className="text-base md:text-lg text-green-300">Yearly: ${(totalIncentives * 52).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
              </div>
            </div>
          </div>
        )}

        {/* Pool Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-white/5">
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-green-400 font-semibold text-sm md:text-base">Pool</th>
                  <th className="text-right py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">Total Votes</th>
                  <th className="text-center py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">My Votes</th>
                  <th className="text-center py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">Lock</th>
                  <th className="text-right py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">New Total</th>
                  <th className="text-right py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">% Votes</th>
                  <th className="text-right py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">Incentives</th>
                  <th className="text-right py-3 md:py-4 px-3 md:px-6 text-green-400 font-semibold text-sm md:text-base">My Incentive</th>
                  <th className="text-center py-3 md:py-4 px-2 md:px-4 text-green-400 font-semibold text-sm md:text-base">Max</th>
                </tr>
              </thead>
              <tbody>
                {calculatedPools
                  .sort((a, b) => (b.incentives / (b.poolSize + totalVotes)) - (a.incentives / (a.poolSize + totalVotes)))
                  .map((pool, index) => (
                  <tr key={pool.id} className={`border-b border-white/10 hover:bg-white/5 transition-colors ${pool.votesAllocated > 0 ? (lockedAllocations[pool.id] ? 'bg-blue-500/10 border-l-4 border-l-blue-500' : 'bg-green-500/10') : ''}`}>
                    <td className="py-3 md:py-4 px-3 md:px-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
                        <span className="text-white font-semibold text-sm md:text-base">{pool.name}</span>
                        <div className="flex items-center gap-2">
                          {index < 3 && <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-1 rounded w-fit">TOP ROI</span>}
                          {lockedAllocations[pool.id] && <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-1 rounded w-fit flex items-center gap-1"><Lock className="w-3 h-3" />LOCKED</span>}
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-3 md:py-4 px-2 md:px-4 text-white font-mono text-sm md:text-base">
                      {pool.poolSize.toLocaleString('en-US', {minimumFractionDigits: 0})}
                    </td>
                    <td className="text-center py-3 md:py-4 px-2 md:px-4">
                      <input
                        type="number"
                        value={allocations[pool.id] || ''}
                        onChange={(e) => handleAllocationChange(pool.id, e.target.value)}
                        disabled={lockedAllocations[pool.id]}
                        className={`border rounded px-1 md:px-2 py-1 text-center w-16 md:w-24 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-green-500 ${
                          lockedAllocations[pool.id] 
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 cursor-not-allowed' 
                            : 'bg-white/10 border-white/30 text-white'
                        }`}
                        placeholder="0"
                        min="0"
                        max={remainingVotes + (parseFloat(allocations[pool.id]) || 0)}
                      />
                    </td>
                    <td className="text-center py-3 md:py-4 px-2 md:px-4">
                      <button
                        onClick={() => toggleLock(pool.id)}
                        disabled={!allocations[pool.id] || parseFloat(allocations[pool.id]) === 0}
                        className={`p-2 rounded transition-colors text-sm ${
                          lockedAllocations[pool.id]
                            ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                            : allocations[pool.id] && parseFloat(allocations[pool.id]) > 0
                            ? 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-400'
                            : 'bg-gray-500/10 text-gray-600 cursor-not-allowed'
                        }`}
                        title={lockedAllocations[pool.id] ? "Unlock allocation" : "Lock allocation"}
                      >
                        {lockedAllocations[pool.id] ? <Lock className="w-3 h-3 md:w-4 md:h-4" /> : <Unlock className="w-3 h-3 md:w-4 md:h-4" />}
                      </button>
                    </td>
                    <td className="text-right py-3 md:py-4 px-2 md:px-4 text-white font-mono text-sm md:text-base">
                      {pool.newSize.toLocaleString('en-US', {minimumFractionDigits: 0})}
                    </td>
                    <td className="text-right py-3 md:py-4 px-2 md:px-4 text-green-400 font-mono font-bold text-sm md:text-base">
                      {pool.percentOfVotes.toFixed(1)}%
                    </td>
                    <td className="text-right py-3 md:py-4 px-2 md:px-4 text-white font-mono text-sm md:text-base">
                      ${pool.incentives.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </td>
                    <td className="text-right py-3 md:py-4 px-3 md:px-6 text-green-400 font-mono font-bold text-sm md:text-lg">
                      {pool.myIncentive > 0 ? pool.myIncentive.toLocaleString('en-US', {minimumFractionDigits: 2}) : '0.00'}
                    </td>
                    <td className="text-center py-3 md:py-4 px-2 md:px-4">
                      <button
                        onClick={() => concentrateInPool(pool.id)}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-2 py-1 rounded text-sm transition-colors"
                        title="Put all votes in this pool"
                      >
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategy Cards - All in one row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              🎯 <span>Concentration</span>
            </h3>
            <div className="space-y-1 text-xs md:text-sm text-green-200">
              <p><strong>Strategy:</strong> All votes → 1 pool</p>
              <p><strong>Best Single:</strong> Max dominance</p>
              <p><strong>Risk:</strong> Vulnerable to competition</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              ⚖️ <span>Diversification</span>
            </h3>
            <div className="space-y-1 text-xs md:text-sm text-green-200">
              <p><strong>Strategy:</strong> Split across top pools</p>
              <p><strong>Benefit:</strong> Lower risk</p>
              <p><strong>Trade-off:</strong> Lower max returns</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-yellow-500/30">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              🚀 <span>OPTIMIZED</span>
            </h3>
            <div className="space-y-1 text-xs md:text-sm text-yellow-200">
              <p><strong>Algorithm:</strong> Marginal return maximization</p>
              <p><strong>Lock Feature:</strong> Locks allocations, optimizes remaining votes</p>
              <p><strong>Result:</strong> Mathematically optimal allocation</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              📊 <span>Current Status</span>
            </h3>
            <div className="space-y-1 text-xs md:text-sm text-green-200">
              <p><strong>Allocated:</strong> {allocatedVotes.toLocaleString()} votes</p>
              <p><strong>Remaining:</strong> {remainingVotes.toLocaleString()} votes</p>
              <p><strong>Weekly Total:</strong> ${totalIncentives.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Live Data Notice */}
        <div className="mt-6 bg-blue-500/20 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-blue-500/30">
          <p className="text-xs md:text-sm text-blue-200 text-center">
            <strong>📊 Smart Allocation:</strong> Use 🚀 OPTIMIZE for mathematically optimal vote distribution across all {pools.length} pools that maximizes returns. 
            🔒 <strong>Lock Feature:</strong> Lock specific allocations with the lock button, then optimize remaining votes around your locked positions!
            Compare with manual strategies to see the difference!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VeKittenCalculator;
