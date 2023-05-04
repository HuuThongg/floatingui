import './App.css'
import { forwardRef, useRef } from 'react';
import BasisToolTip from './components/tooltip/BasisToolTip';
import EmojiPicker from './components/EmojiPicker';
import ListNavigation from './components/ListNavigation';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
function App() {
  return (
    <div>
      
      <h1>Floating-ui</h1>
      <BasisToolTip />
      <Form />
      <EmojiPicker/>
      {/* <ListNavigation/> */}
    </div>
  )
}

export default App
