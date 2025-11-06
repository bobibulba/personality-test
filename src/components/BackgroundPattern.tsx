import React from 'react'

const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink via-yellow/30 to-cyan/40" />
      
      {/* Geometric shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-coral rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple rotate-45 opacity-50" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-lime rounded-full opacity-40" />
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-orange rotate-12 opacity-60" />
      <div className="absolute bottom-40 right-10 w-28 h-28 bg-magenta rounded-full opacity-50 animate-pulse" />
      
      {/* Zigzag patterns */}
      <svg className="absolute top-0 left-1/2 w-64 h-64 opacity-30" viewBox="0 0 100 100">
        <path d="M 0 50 L 25 25 L 50 50 L 75 25 L 100 50" stroke="#6B5B95" strokeWidth="4" fill="none" />
        <path d="M 0 70 L 25 45 L 50 70 L 75 45 L 100 70" stroke="#FF6F61" strokeWidth="4" fill="none" />
      </svg>
      
      {/* Dots pattern */}
      <div className="absolute bottom-0 right-0 grid grid-cols-8 gap-4 p-8 opacity-40">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-coral' : i % 3 === 1 ? 'bg-purple' : 'bg-lime'}`} />
        ))}
      </div>
      
      {/* Triangles */}
      <div className="absolute top-1/2 left-10 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-cyan opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-yellow opacity-60" />
    </div>
  )
}

export default BackgroundPattern
