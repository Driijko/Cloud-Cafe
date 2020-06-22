import React, {useContext} from 'react';

import Context from "./store/Context";

function App() {

  const {test} = useContext(Context);

  return (
    <div className="App">
      <div>{test}</div>
    </div>
  );
}

export default App;
