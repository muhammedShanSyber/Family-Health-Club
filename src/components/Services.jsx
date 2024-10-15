import PropTypes from 'prop-types'

function Services(props) {
  return (
    <>

      <div className="  top-[41px] absolute text-white text-2xl font-semibold   tracking-widest">{props.heading}</div>
      <div className="  top-[94px] absolute text-white text-xl font-semibold   tracking-widest">{props.subheading}</div>

    </>
  )
}
Services.PropTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

export default Services;