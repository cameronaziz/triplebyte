import { useEffect, useRef, useState, VFC } from 'react';
import runner from './runner';

type TestProps ={
  state: State
  index: number

}

export type State = 'idle' | 'running' | 'success' | 'failure';

const Test: VFC<TestProps> = (props) => {
  const { state } = props;
  const testRef = useRef(runner())
  const [result, setResult] = useState<State>('idle');

  useEffect(
    () => {
      if (state === 'running') {
        testRef.current().then((testResult) => {
          if (testResult) {
            setResult('success');
            return
          }
          setResult('failure');
        });
      }
    },
    [state],
  );


  const runTest = () => {
    testRef.current().then(() => {
      if (result) {
        setResult('success');
        return
      }
      setResult('failure');
    });
  }

  return (
    <div>
      {result}
    </div>
  );
};

export default Test;
