import React, {useContext} from 'react';
import firebase from "./firebase";

import Context from "./store/Context";

function App() {

  const {cafes} = useContext(Context);

  return (
    <div className="App">
      <div>{cafes[0].id}</div>
      
    </div>
  );
}

export default App;
