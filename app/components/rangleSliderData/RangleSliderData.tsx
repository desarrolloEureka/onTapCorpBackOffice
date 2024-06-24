import { LabeledTwoThumbsProps } from '@/types/ralgleSliders';
import { useCallback, useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const Marks = ({
  step = 10,
  max = 100,
  rtl,
  marksHandler,
}: LabeledTwoThumbsProps) => {
  const STEP = step;
  const MIN = 0;
  const MAX = max;

  const [values, setValues] = useState<number[]>([50]);

  const markHandleCallback = useCallback(() => {
    marksHandler(values);
  }, [marksHandler, values]);

  useEffect(() => {
    markHandleCallback();
  }, [markHandleCallback]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(newValues) => {
          console.log('newValues', newValues);

          setValues(newValues);
        }}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '16px',
              width: '5px',
              backgroundColor: index * STEP < values[0] ? '#548BF4' : '#ccc',
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              className='rangeslider-thumb'
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#548BF4', '#ccc'],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-28px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#548BF4',
              }}
            >
              {values[index]}
            </div>
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC',
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Marks;
