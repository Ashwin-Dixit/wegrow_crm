import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ label, value, subValue, trend, trendLabel, icon: Icon, color = 'primary' }) {
  const colorMap = {
    primary:   { bg: 'bg-[#e9ddff]', icon: 'text-[#4f378a]', trend: 'text-[#4f378a]' },
    secondary: { bg: 'bg-[#e8def9]', icon: 'text-[#625b71]', trend: 'text-[#625b71]' },
    success:   { bg: 'bg-[#c2e7d0]', icon: 'text-[#00531b]', trend: 'text-[#00531b]' },
    warning:   { bg: 'bg-[#ffefd6]', icon: 'text-[#7a3a00]', trend: 'text-[#7a3a00]' },
    error:     { bg: 'bg-[#ffdad6]', icon: 'text-[#93000a]', trend: 'text-[#93000a]' },
  }

  const c = colorMap[color] ?? colorMap.primary

  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'text-[#00531b]' : trend === 'down' ? 'text-[#93000a]' : 'text-[#7a7582]'

  return (
    <div className="bg-[#f8f2fa] elevation-1 rounded-2xl p-6 flex flex-col gap-4 hover:elevation-2 transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-[#7a7582] uppercase tracking-[0.5px]">{label}</p>
        {Icon && (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${c.bg}`}>
            <Icon size={20} className={c.icon} />
          </div>
        )}
      </div>

      <div>
        <p className="text-[28px] font-semibold text-[#1d1b20] leading-none tracking-tight">
          {value}
        </p>
        {subValue && (
          <p className="text-[12px] text-[#7a7582] mt-1">{subValue}</p>
        )}
      </div>

      {trendLabel && (
        <div className={`flex items-center gap-1 text-[12px] font-medium ${trendColor}`}>
          <TrendIcon size={14} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
