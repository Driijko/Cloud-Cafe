import React, {useContext, useEffect, useState} from 'react';

import Context from "./store/Context";

import Cafe from "./components/Cafe";

function App() {
  const {cafes} = useContext(Context);

  const [cafeComponents, setCafeComponents] = useState(<div>LOADING DATA...</div>)

  useEffect(()=> {
    if (cafes) {
      setCafeComponents(cafes.map(cafe=> {
        return <Cafe cafeData={{name: cafe.name, city: cafe.city}} key={cafe.id} />
     }))
    }
  }, [cafes])

  return (
    <div className="App">
      <h1>Cloud Cafe</h1>
      <div className="content">

        <form id="add-cafe-form">
          <input type="text" name="name" placeholder="Cafe Name" />
          <input type="text" name="city" placeholder="Cafe City" />
          <button>Add Cafe</button>
        </form>

        <ul id="cafe-list">
          {cafeComponents}
        </ul>

      </div>
      
      
    </div>
  );
}

export default App;
