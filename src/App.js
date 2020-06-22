import React, {useContext} from 'react';

import Context from "./store/Context";

function App() {

  const {cafes} = useContext(Context);

  return (
    <div className="App">
      <h1>Cloud Cafe</h1>
      <div className="content">

        <form id="add-cafe-form">
          <input type="text" name="name" placeholder="Cafe Name" />
          <input type="text" name="city" placeholder="Cafe City" />
          <button>Add Cafe</button>
        </form>

      </div>
      
      
    </div>
  );
}

export default App;
