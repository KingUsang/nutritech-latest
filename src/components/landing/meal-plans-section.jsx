const meals = [
  {
    icon: '🥚',
    title: 'The Gate Breakfast',
    description: '2 Boiled Eggs + Bread + Banana',
    price: '₦250',
    priceColor: 'yellow',
    why: 'Eggs are the cheapest source of high-quality protein. Banana gives quick energy.',
    borderColor: 'orange',
    featured: false,
  },
  {
    icon: '🍛',
    title: 'Rice & Beans Combo',
    description: 'Rice + Beans + Fish Stew',
    price: '₦400',
    priceColor: 'green',
    why: 'Mixing beans and rice creates a complete protein. Keeps you full through 4pm lectures.',
    borderColor: 'green',
    featured: true,
  },
  {
    icon: '🍲',
    title: 'Brain Recovery',
    description: 'Titus Fish + Veggie Stew (Ugwu)',
    price: '₦350',
    priceColor: 'blue',
    why: 'Omega-3 in Titus fish is crucial for memory. Ugwu fights the dreaded "student fatigue."',
    borderColor: 'red',
    featured: false,
  },
];

/**
 * Meal Plans section showing realistic affordable meals
 */
export default function MealPlansSection() {
  return (
    <section id="plans" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-tech-primary">₦1,000/Day</span> Reality
          </h2>
          <p className="text-gray-400">
            Accessible meals you can buy at the gate, canteen, or cook quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meals.map((meal, index) => (
            <div
              key={index}
              className={`${
                meal.featured
                  ? 'glass-active transform scale-105 shadow-2xl relative'
                  : 'glass'
              } p-6 rounded-3xl hover:-translate-y-2 transition duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] group border-b-4 ${
                meal.borderColor === 'green'
                  ? 'border-tech-primary'
                  : meal.borderColor === 'orange'
                  ? 'border-orange-500'
                  : 'border-red-500'
              }`}
            >
              {meal.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tech-primary text-navy-900 text-xs font-bold px-4 py-1 rounded-full">
                  STUDENT FAVORITE
                </div>
              )}
              
              <div className="flex justify-between mb-4">
                <span className="text-3xl bg-white/5 p-2 rounded-xl">{meal.icon}</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full h-fit ${
                    meal.priceColor === 'yellow'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : meal.priceColor === 'green'
                      ? 'bg-green-500/20 text-tech-primary'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {meal.price}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{meal.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{meal.description}</p>
              
              <div className="bg-navy-900/50 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-gray-300">
                  <span className="text-tech-primary">Why:</span> {meal.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
