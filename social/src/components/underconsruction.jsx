import EngineeringIcon from '@mui/icons-material/Engineering';

export default function underconsruction() {
  return (
    <div className="under-construction-container d-flex justify-content-center align-items-center flex-column my-5">
       <EngineeringIcon className='construction_icon' />
      <h1 className='text-center my-1'>Under Construction </h1>
      <p className='text-center my-3'>The mobile/tablet view is currently under construction.</p>
      <p className='text-center my-3'>Please use Desktop view</p>
    </div>
  )
}
