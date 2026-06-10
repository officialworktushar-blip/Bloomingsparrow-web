export default function Home() {
  return (
    <>
      <main className="hero-section">
        <h1 className="hero-title">Elevate Your Reality</h1>
        <p className="hero-subtitle">
          Experience the next generation of web design. Fast, beautiful, and completely dynamic.
        </p>
        <div className="cta-container">
          <a href="#" className="btn btn-primary">Get Started</a>
          <a href="#features" className="btn btn-secondary">Learn More</a>
        </div>
      </main>

      <section id="features" className="features">
        <div className="card">
          <div className="card-icon">✧</div>
          <h3>Premium Aesthetics</h3>
          <p>Carefully crafted design tokens, sleek dark modes, and dynamic micro-animations to wow your users.</p>
        </div>
        <div className="card">
          <div className="card-icon">⚡</div>
          <h3>Blazing Fast</h3>
          <p>Powered by Next.js and optimized for peak performance out of the box. Instant loads, fluid transitions.</p>
        </div>
        <div className="card">
          <div className="card-icon">∞</div>
          <h3>Infinite Possibilities</h3>
          <p>A solid foundation ready for your next big idea. Scale effortlessly without compromising on quality.</p>
        </div>
      </section>
    </>
  );
}
