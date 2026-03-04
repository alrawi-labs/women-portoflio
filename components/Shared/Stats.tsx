export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Soft gradient background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(221, 167, 165, 0.1), transparent 70%)"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Item 1 */}
          <div className="flex flex-col items-center justify-center text-center p-6 lg:p-8 rounded-[40px] border border-[rgba(221,167,165,0.15)] bg-gradient-to-b from-[#2c2433]/40 to-transparent backdrop-blur-md shadow-[0_8px_32px_rgba(221,167,165,0.03)] hover:shadow-[0_16px_48px_rgba(221,167,165,0.08)] hover:-translate-y-1 transition-all duration-500">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#b3817e] to-[#dda7a5] bg-clip-text text-transparent mb-3 font-serif">
              14
            </div>
            <div className="text-[var(--cream-dim)] text-sm tracking-widest uppercase font-medium">Years of Experience</div>
          </div>
          
          {/* Item 2 */}
          <div className="flex flex-col items-center justify-center text-center p-6 lg:p-8 rounded-[40px] border border-[rgba(221,167,165,0.15)] bg-gradient-to-b from-[#2c2433]/40 to-transparent backdrop-blur-md shadow-[0_8px_32px_rgba(221,167,165,0.03)] hover:shadow-[0_16px_48px_rgba(221,167,165,0.08)] hover:-translate-y-1 transition-all duration-500">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#b3817e] to-[#dda7a5] bg-clip-text text-transparent mb-3 font-serif">
              50+
            </div>
            <div className="text-[var(--cream-dim)] text-sm tracking-widest uppercase font-medium">Project Completed</div>
          </div>
          
          {/* Item 3 */}
          <div className="flex flex-col items-center justify-center text-center p-6 lg:p-8 rounded-[40px] border border-[rgba(221,167,165,0.15)] bg-gradient-to-b from-[#2c2433]/40 to-transparent backdrop-blur-md shadow-[0_8px_32px_rgba(221,167,165,0.03)] hover:shadow-[0_16px_48px_rgba(221,167,165,0.08)] hover:-translate-y-1 transition-all duration-500">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#b3817e] to-[#dda7a5] bg-clip-text text-transparent mb-3 font-serif">
              1.5K
            </div>
            <div className="text-[var(--cream-dim)] text-sm tracking-widest uppercase font-medium">Happy Clients</div>
          </div>
          
          {/* Item 4 */}
          <div className="flex flex-col items-center justify-center text-center p-6 lg:p-8 rounded-[40px] border border-[rgba(221,167,165,0.15)] bg-gradient-to-b from-[#2c2433]/40 to-transparent backdrop-blur-md shadow-[0_8px_32px_rgba(221,167,165,0.03)] hover:shadow-[0_16px_48px_rgba(221,167,165,0.08)] hover:-translate-y-1 transition-all duration-500">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#b3817e] to-[#dda7a5] bg-clip-text text-transparent mb-3 font-serif">
              14
            </div>
            <div className="text-[var(--cream-dim)] text-sm tracking-widest uppercase font-medium">Years of Experience</div>
          </div>

        </div>
      </div>
    </section>
  );
}