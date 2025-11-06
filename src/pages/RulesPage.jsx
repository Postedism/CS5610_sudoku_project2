// src/pages/RulesPage.jsx

function RulesPage() {
  return (
    <div className="page-container rules-page">
      <h2>Game rule</h2>
      <p>Target is easy:put number in whole grid</p>
      
      <section className="rules-section">
        <h3>Basic Rules</h3>
        <p>Fulfill Rule</p>
        <ul>
          <li>
            <strong>1. Row:</strong> Each row must contain the numbers 1 to 9 (or 1 to 6) with no repetition
          </li>
          <li>
            <strong>2. Column:</strong> Each column must contain the numbers 1 to 9 (or 1 to 6) with no repetition
          </li>
          <li>
            <strong>3. Subgrid:</strong> Each 3x3 (or 3x2) region must contain the numbers 1 to 9 (or 1 to 6) with no repetition
          </li>
        </ul>
        <p>
          There is some exist numbers unchangable, when all empty cell fill by correct number, game end.
        </p>
      </section>

      <section className="credits-section">
        <h3>Credits (staff)</h3>
        <p>This program completed by JunruiDuan。</p>
        <div className="credit-links">
          <a 
            href="https://github.com/Postedism" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/postedism" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="postedism@outlook.com">
            Email
          </a>
        </div>
      </section>
    </div>
  );
}

export default RulesPage;