const Spinner = ({ visual, grow }: { visual?: boolean; grow?: boolean }) => {
  const type = grow ? 'spinner-grow' : 'spinner-border';
  return (
    <div className='tw-flex tw-justify-center tw-items-center tw-h-screen'>
      <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-center'>
        <div className={`${type} text-primary`} role='status' />
        <span className={`${visual && 'visually-hidden'}`}>Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
