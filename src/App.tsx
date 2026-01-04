import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 ShopEasy</h1>
        <div>Cart (0 items)</div>
      </header>
      
      <main className="main-content">
        <div>
          {/* Products section will go here */}
          <p>Products loading...</p>
        </div>
        <div>
          {/* Cart section will go here */}
          <p>Cart</p>
        </div>
      </main>
    </div>
  )
}

export default App
