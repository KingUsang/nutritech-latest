const problems = [
  {
    icon: '🧠',
    gradient: 'from-orange-500 to-pink-600',
    title: "Can't Focus?",
    description: "Processed carbs like puff-puff and white bread cause rapid blood sugar spikes and crashes, killing your concentration during lectures.",
    solution: 'Complex Carbs',
    color: 'orange',
  },
  {
    icon: '🔋',
    gradient: 'from-yellow-400 to-orange-500',
    title: 'Always Tired?',
    description: "Iron deficiency is common among Nigerian students. Without enough iron (from leafy greens like Ugwu), your brain gets less oxygen.",
    solution: 'Iron Rich Foods',
    color: 'yellow',
  },
  {
    icon: '🛡️',
    gradient: 'from-red-500 to-pink-600',
    title: 'Getting Sick?',
    description: "Exam stress weakens your immune system. If you aren't eating Vitamin C and Zinc, you will break down before finals.",
    solution: 'Immunity Boosters',
    color: 'red',
  },
];

/**
 * Problem section showing common student nutrition issues
 */
export default function ProblemSection() {
  return (
    <section id="problems" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Your Grades Are Suffering
          </h2>
          <p className="text-gray-400">
            It's not you. It's what you're fueling your brain with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl hover:bg-white/5 transition duration-300 group cursor-default relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r"
                style={{
                  backgroundImage: problem.color === 'orange' 
                    ? 'linear-gradient(90deg, #F59E0B, #EA580C)'
                    : problem.color === 'yellow'
                    ? 'linear-gradient(90deg, #00FF88, #059669)'
                    : 'linear-gradient(90deg, #EF4444, #B91C1C)'
                }}
              ></div>
              
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${problem.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition`}>
                {problem.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {problem.description}
              </p>
              
              <div className={`text-${problem.color}-400 text-xs font-bold uppercase tracking-wider`}>
                Solution: {problem.solution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
